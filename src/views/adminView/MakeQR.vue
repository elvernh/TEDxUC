<template>
    <section class="section">
      <h1>Generate QR Batch</h1>
      <div class="event-select">
        <label for="event">Select Event:</label>
        <select id="event" v-model="selectedEventId">
          <option disabled value="">-- Select an Event --</option>
          <option v-for="event in events" :key="event._id" :value="event._id">{{ event.name }}</option>
        </select>
      </div>
      <button @click="generateQr">Generate QR Codes</button>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  const events = ref([]);
  const selectedEventId = ref('');
  
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in!");
        return;
      }
      const response = await axios.get(`${API_URL}/api/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      events.value = response.data.data;
    } catch (error) {
      console.error("Error fetching events:", error.response?.data || error.message);
      alert("Error fetching events");
    }
  };
  
  const generateQr = async () => {
    if (!selectedEventId.value) {
      alert("Please select an event.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in!");
        return;
      }
      await axios.post(
        `${API_URL}/api/admin/export/generate-qr-batch`,
        { eventId: selectedEventId.value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("QR batch successfully generated!");
    } catch (error) {
      console.error("Error generating QR batch:", error.response?.data || error.message);
      alert("Failed to generate QR batch");
    }
  };
  
  onMounted(fetchEvents);
  </script>
  
  <style scoped>
  .section {
    margin: 40px 0;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
  }
  .event-select {
    margin: 15px 0;
    text-align: center;
  }
  .event-select select {
    padding: 5px 10px;
    font-size: 16px;
    width: 80%;
    max-width: 400px;
  }
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #45a049;
  }
  </style>
  