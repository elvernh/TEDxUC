<template>
  <div class="bulk-email-container">
    <h1 class="title">Send Bulk Email</h1>

    <div class="form-group">
      <label for="email-event">Select Event:</label>
      <select id="email-event" v-model="emailEventId">
        <option disabled value="">-- Select an Event --</option>
        <option v-for="event in events" :key="event._id" :value="event._id">
          {{ event.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="subject">Subject:</label>
      <input
        id="subject"
        v-model="emailSubject"
        type="text"
        placeholder="Enter email subject"
      />
    </div>

    <div class="form-group">
      <label for="message">Message (HTML allowed):</label>
      <textarea
        id="message"
        v-model="emailMessage"
        placeholder="Enter your message"
        rows="6"
      ></textarea>
    </div>

    <div class="form-group checkbox">
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
    const res = await axios.get(`${API_URL}/api/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    events.value = res.data.data;
  } catch (err) {
    console.error("Error fetching events:", err.response?.data || err.message);
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

    await axios.post(
      `${API_URL}/api/admin/email/send-bulk`,
      {
        eventId: emailEventId.value,
        subject: emailSubject.value,
        message: emailMessage.value,
        includeQR: includeQR.value,
        status: registrationStatus.value,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Bulk email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
    alert("Error sending email");
  }
};

onMounted(fetchEvents);
</script>

<style scoped>
.bulk-email-container {
  padding: 30px;
  max-width: 600px;
  margin: 50px auto;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 12px;
  text-align: left;
  color: white;
  font-family: 'Inter', sans-serif;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
}

input[type="text"],
textarea,
select {
  padding: 10px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  background-color: #f5f5f5;
  color: #333;
}

input[type="text"]::placeholder,
textarea::placeholder {
  color: #999;
}

.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #45a049;
}
</style>
