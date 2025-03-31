<template>
    <div class="scanner-container">
      <h1>QR Code Scanner</h1>
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
      <div v-if="scannedData">
        <p>QR Data: {{ scannedData }}</p>
        <button @click="verifyAndMarkAttendance">Verify & Mark Attendance</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import Footer from "@/components/Footer.vue";
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { QrcodeStream } from 'vue-qrcode-reader';
  
  const scannedData = ref(null);
  const router = useRouter();
  
  const onDecode = (decodedString) => {
    scannedData.value = decodedString;
  };
  
  const onInit = async (promise) => {
    try {
      await promise;
    } catch (error) {
      console.error('Error initializing QR scanner:', error);
    }
  };
  
  const verifyAndMarkAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized! Redirecting to login.');
        router.push('/login');
        return;
      }
  
  
      const verifyResponse = await axios.post(
        'http://localhost:5000/api/verify-qr',
        { qrData: scannedData.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (verifyResponse.data.valid) {
   
        const markResponse = await axios.put(
          `http://localhost:5000/api/registrations/${verifyResponse.data.id}/attend`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        alert(markResponse.data.message || 'Attendance marked successfully');
      } else {
        alert('QR Code verification failed');
      }
  
      scannedData.value = null;
    } catch (error) {
      alert('Error verifying QR or marking attendance');
    }
  };
  
  onMounted(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized! Redirecting to login.');
      router.push('/login');
    }
  });
  </script>


  
 