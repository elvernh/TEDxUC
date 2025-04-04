<script setup lang="ts">
import { ref } from "vue";

// Reactive variables
const qrInput = ref("");
const qrCodeUrl = ref("");

// Function to generate QR Code
const generateQRCode = () => {
    if (!qrInput.value.trim()) {
        qrCodeUrl.value = "";
        return;
    }

    qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrInput.value)}`;
};
</script>

<template>
    <div class="makeqr-container">
        <div class="makeqr-box">
            <h2>Generate QR Code</h2>

            <!-- Input field for QR Code -->
            <label for="qrInput">Enter Text/URL:</label>
            <input v-model="qrInput" type="text" id="qrInput" placeholder="Enter text or URL">

            <!-- Button to generate QR -->
            <button @click="generateQRCode">Generate QR</button>

            <!-- QR Code Display -->
            <div class="qr-code" v-if="qrCodeUrl">
                <img :src="qrCodeUrl" alt="QR Code">
            </div>
            <p v-else style="color: red;">Please enter text or URL.</p>
        </div>
    </div>
</template>

<style scoped>
/* Unique class for this page */
.makeqr-container {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
    padding: 20px;
    min-height: 100vh;
}

.makeqr-box {
    max-width: 400px;
    background: white;
    padding: 20px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.makeqr-box h2 {
    color: #333;
}

.makeqr-box input, 
.makeqr-box button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.makeqr-box button {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.makeqr-box button:hover {
    background-color: #0056b3;
}

.qr-code {
    margin-top: 20px;
}
</style>
