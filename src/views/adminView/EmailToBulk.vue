<template>
  <div class="bulk-email-container">
    <h1 class="white-text">Send Bulk Email</h1>
    <div class="event-select">
      <label for="email-event">Select Event:</label>
      <select id="email-event" v-model="emailEventId">
        <option disabled value="">-- Select an Event --</option>
        <option v-for="event in events" :key="event._id" :value="event._id">{{ event.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="subject">Subject:</label>
      <input v-model="emailSubject" id="subject" type="text" placeholder="Enter email subject" />
    </div>
    <div class="form-group">
      <label for="message">Message (HTML allowed):</label>
      <textarea v-model="emailMessage" id="message" placeholder="Enter your message"></textarea>
    </div>
    <div class="form-group">
      <label for="includeQR">
        <input type="checkbox" id="includeQR" v-model="includeQR" />
        Include QR Code
      </label>
    </div>
    <div class="form-group">
      <label for="status">Registration Status:</label>
      <select id="status" v-model="registrationStatus">
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="cancelled">Cancelled</option>
        <option value="expired">Expired</option>
      </select>
    </div>
    <button @click="sendBulkEmail">Send Bulk Email</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const events = ref([]);
const emailEventId = ref('');
const emailSubject = ref('');
const emailMessage = ref('');
const includeQR = ref(false);
const registrationStatus = ref('paid');

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

const sendBulkEmail = async () => {
  if (!emailEventId.value || !emailSubject.value || !emailMessage.value) {
    alert("All fields are required.");
    return;
  }
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      return;
    }
    await axios.post(`${API_URL}/api/admin/email/send-bulk`, {
      eventId: emailEventId.value,
      subject: emailSubject.value,
      message: emailMessage.value,
      includeQR: includeQR.value,
      status: registrationStatus.value
    }, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    alert("Bulk email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Error sending email");
  }
};

onMounted(fetchEvents);
</script>

<style scoped>
.bulk-email-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  text-align: center;
}
.white-text {
  color: white;
}
.event-select, .form-group {
  margin: 15px 0;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
