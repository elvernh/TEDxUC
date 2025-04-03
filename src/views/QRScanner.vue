<template>
  <div class="scanner-container">
    <h1 class="white-text">QR Code Scanner</h1>
    
    <div v-if="hasCamera">
      <StreamBarcodeReader
        @decode="onDecode"
        @loaded="onLoaded"
      ></StreamBarcodeReader>
      
      <div v-if="scannedData" class="result-container">
        <p class="white-text">QR Data: {{ scannedData }}</p>
        <button @click="verifyAndMarkAttendance" class="verify-btn">
          Verify & Mark Attendance
        </button>
      </div>
    </div>
    
    <div v-else class="error-message white-text">
      <p>No camera found or permission denied.</p>
      <p>Please allow camera access to scan QR codes.</p>
    </div>
    
    <div v-if="statusMessage" class="status-message white-text">
      {{ statusMessage }}
    </div>
  </div>
  <h1>Generate QR Batch</h1>
    <input v-model="eventId" type="text" placeholder="Enter Event ID" />
    <button @click="generateQr">Generate QR Codes</button>
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

const generateQr = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const response1 = await axios.get("http://localhost:5001/api/events");
    const events = response1.data.data;
    console.log("Fetched Events:", events);

    // Find the event based on the provided event name (case-insensitive)
    const selectedEvent = events.find(e =>
      e.name.trim().toLowerCase() === eventName.value.trim().toLowerCase()
    );
    console.log("Selected Event:", selectedEvent);

    if (!selectedEvent) { 
      console.error("❌ Event not found:", eventName.value);
      return;
    }

    const eventIdValue = selectedEvent._id;
    console.log("Selected Event ID:", eventIdValue);

    const response = await axios.post(
      `${API_URL}/api/admin/export/generate-qr-batch`,
      { eventId: eventIdValue },
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

// Create API client with authorization header
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
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      return;
    }

    const apiClient = getAuthClient();
    
    const verifyResponse = await apiClient.post(
      '/api/registrations/verify-qr',
      { qrData: scannedData.value }
    );

    if (verifyResponse.data.status === 'success') {
      statusMessage.value = `${verifyResponse.data.message || 'Attendance marked successfully!'}`;
      
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
      setTimeout(() => {
        statusMessage.value = '';
      }, 5000);
    }
  }
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    statusMessage.value = 'Unauthorized! Redirecting to login.';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
    return;
  }
  
  const apiClient = getAuthClient();
  apiClient.get('/api/auth/me')
    .catch((error) => {
      if (error.response?.status === 401) {
        statusMessage.value = 'Session expired. Please login again.';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    });
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
</style>