<template>
  <div>
    <!-- QR Code Scanner Section -->
    <div class="scanner-container">
      <h1 class="white-text">QR Code Scanner</h1>
      <div v-if="hasCamera">
        <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
        <div v-if="scannedData" class="result-container">
          <p class="white-text">QR Data: {{ scannedData }}</p>
          <button @click="verifyAndMarkAttendance" class="verify-btn">Verify & Mark Attendance</button>
        </div>
      </div>
      <div v-else class="error-message white-text">
        <p>No camera found or permission denied.</p>
        <p>Please allow camera access to scan QR codes.</p>
      </div>
      <div v-if="statusMessage" class="status-message white-text">{{ statusMessage }}</div>
    </div>

    <!-- Generate QR Batch Section -->
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

    <!-- Send Bulk Email Section -->
    <section class="section">
      <h1>Send Bulk Email</h1>
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
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { StreamBarcodeReader } from 'vue-barcode-reader';
import axios from 'axios';

// API base URL - use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const scannedData = ref(null);
const hasCamera = ref(true);
const statusMessage = ref('');
const router = useRouter();

// Events & event selection for both QR generation and email sending
const events = ref([]);
const selectedEventId = ref('');
const emailEventId = ref('');

// Email form fields
const emailSubject = ref('');
const emailMessage = ref('');
const includeQR = ref(false);
const registrationStatus = ref('paid');

// Barcode reader callbacks
const eventId = ref('');
const onDecode = (result) => {
  scannedData.value = result;
};

const onLoaded = () => {
  hasCamera.value = true;
  statusMessage.value = 'Camera loaded successfully. Ready to scan.';
  setTimeout(() => {
    statusMessage.value = '';
  }, 3000);
};

// Fetch events from the API on mount
const fetchEvents = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      statusMessage.value = 'You must be logged in!';
      router.push('/login');
      return;
    }
    const response = await axios.get(`${API_URL}/api/events`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // Assuming the API returns data in the format: { status, message, data: events }
    events.value = response.data.data;
    console.log("✅ Fetched Events:", events.value.map(e => e.name));
  } catch (error) {
    console.error("Error fetching events:", error.response?.data || error.message);
    statusMessage.value = "Error fetching events";
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
    const response = await axios.post(
      `${API_URL}/api/admin/export/generate-qr-batch`,
      { eventId: selectedEventId.value },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("QR Batch generated successfully:", response.data);
    alert("QR batch successfully generated!");
  } catch (error) {
    console.error("Error generating QR batch:", error.response?.data || error.message);
    alert(`Error: ${error.response?.data?.message || "Failed to generate QR batch"}`);
  }
};

const sendBulkEmail = async () => {
  if (!emailEventId.value) {
    alert("Please select an event for the bulk email.");
    return;
  }
  if (!emailSubject.value || !emailMessage.value) {
    alert("Subject and Message are required.");
    return;
  }
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      return;
    }
    const payload = {
      eventId: emailEventId.value,
      subject: emailSubject.value,
      message: emailMessage.value,
      includeQR: includeQR.value,
      status: registrationStatus.value
    };

    const response = await axios.post(
      `${API_URL}/api/admin/email/send-bulk`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Bulk Email sent successfully:", response.data);
    alert("Bulk email sent successfully!");
  } catch (error) {
    console.error("Error sending bulk email:", error.response?.data || error.message);
    alert(`Error: ${error.response?.data?.message || "Failed to send bulk email"}`);
  }
};

// Create API client with authorization header for other requests
const getAuthClient = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

const verifyAndMarkAttendance = async () => {
  try {
    statusMessage.value = 'Verifying QR code...';
    const token = localStorage.getItem('token');
    if (!token) {
      statusMessage.value = 'Unauthorized! Redirecting to login.';
      setTimeout(() => { router.push('/login'); }, 2000);
      return;
    }

    const apiClient = getAuthClient();
    const verifyResponse = await apiClient.post('/api/registrations/verify-qr', { qrData: scannedData.value });

    if (verifyResponse.data.status === 'success') {
      const regData = verifyResponse.data.data.registration;
      const eventData = verifyResponse.data.data.event;
      statusMessage.value = `Success! ${regData.fullName} checked in for ${eventData.name}`;
      setTimeout(() => {
        scannedData.value = null;
        statusMessage.value = 'Ready for next scan.';
      }, 3000);
    } else {
      statusMessage.value = 'QR Code verification failed';
      setTimeout(() => {
        statusMessage.value = '';
        scannedData.value = null;
      }, 3000);
    }
  } catch (error) {
    console.error('Error:', error);
    if (error.response?.status === 401) {
      statusMessage.value = 'Your session has expired. Redirecting to login...';
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }, 2000);
    } else {
      statusMessage.value = `Error: ${error.response?.data?.message || 'Failed to process QR code'}`;
      setTimeout(() => { statusMessage.value = ''; }, 5000);
    }
  }
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    statusMessage.value = 'Unauthorized! Redirecting to login.';
    setTimeout(() => { router.push('/login'); }, 2000);
    return;
  }
  const apiClient = getAuthClient();
  apiClient.get('/api/auth/me').catch((error) => {
    if (error.response?.status === 401) {
      statusMessage.value = 'Session expired. Please login again.';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setTimeout(() => { router.push('/login'); }, 2000);
    }
  });
  fetchEvents();
});
</script>

<style scoped>
.scanner-container {
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
}
.white-text {
  color: white;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
}
.result-container {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #45a049;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
}
.verify-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.verify-btn:hover {
  background-color: #45a049;
}
.error-message {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(255, 0, 0, 0.3);
  border-radius: 5px;
}
.status-message {
  margin-top: 15px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  font-weight: bold;
}
.section {
  margin: 40px 0;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
}
.event-select, .form-group {
  margin: 15px 0;
  text-align: center;
}
.event-select select, .form-group input, .form-group textarea, .form-group select {
  padding: 5px 10px;
  font-size: 16px;
  width: 80%;
  max-width: 400px;
}
.form-group textarea {
  height: 100px;
  resize: vertical;
}
</style>
