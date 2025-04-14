// QRScanner.vue
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
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
import axios from "axios";

const scannedData = ref(null);
const hasCamera = ref(true);
const statusMessage = ref("");
const API_URL = import.meta.env.VITE_API_URL || "https://dickyyyy.site";

const onDecode = (result) => {
  scannedData.value = result;
};

const onLoaded = () => {
  hasCamera.value = true;
  statusMessage.value = "Camera loaded successfully. Ready to scan.";
  setTimeout(() => {
    statusMessage.value = "";
  }, 3000);
};

const verifyAndMarkAttendance = async () => {
  try {
    statusMessage.value = "Verifying QR code...";
    const token = localStorage.getItem("token");
    if (!token) {
      statusMessage.value = "Unauthorized! Redirecting to login.";
      return;
    }
    const response = await axios.post(
      `${API_URL}/api/registrations/verify-qr`,
      { qrData: scannedData.value },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.data.registration.attendanceStatus === "attended") {
      statusMessage.value =  `Sudah di scan ${response.data.data.registration.fullName}`;
    } else {
      statusMessage.value = `Success! ${response.data.data.registration.fullName} checked in.`;
    }
  } catch (error) {
    statusMessage.value = "QR Code verification failed";
  }
};
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
.verify-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

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
</style>
