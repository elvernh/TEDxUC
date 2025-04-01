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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { StreamBarcodeReader } from 'vue-barcode-reader';
import axios from 'axios';

const scannedData = ref(null);
const hasCamera = ref(true);
const statusMessage = ref('');
const router = useRouter();

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

    const verifyResponse = await axios.post(
      'http://localhost:5000/api/verify-qr',
      { qrData: scannedData.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (verifyResponse.data.valid) {
      statusMessage.value = 'QR code valid. Marking attendance...';
      
      const markResponse = await axios.put(
        `http://localhost:5000/api/registrations/${verifyResponse.data.id}/attend`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      statusMessage.value = markResponse.data.message || 'Attendance marked successfully!';
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
    statusMessage.value = `Error: ${error.response?.data?.message || 'Failed to process QR code'}`;
    setTimeout(() => {
      statusMessage.value = '';
    }, 5000);
  }
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    statusMessage.value = 'Unauthorized! Redirecting to login.';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }
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