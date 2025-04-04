<script setup lang="ts">
import { ref, onMounted } from "vue";

// Mock data
const totalRegistrations = ref(0);

// Fetch total registrations (simulated API call)
const fetchTotalRegistrations = async () => {
    // Simulated API response
    setTimeout(() => {
        totalRegistrations.value = 120; // Example: 120 registrations
    }, 1000);
};

// Export functions
const exportAttendance = () => alert("Exporting attendance list...");
const exportRegistrations = () => alert("Exporting registration data...");
const exportPayments = () => alert("Exporting payment data...");

// Fetch data on component mount
onMounted(fetchTotalRegistrations);
</script>

<template>
    <div class="dashboard-container">
        <div class="dashboard-box">
            <h2>Event Dashboard</h2>

            <!-- Total Registrations -->
            <p class="total-registrations">
                Total Registrations: <span>{{ totalRegistrations }}</span>
            </p>

            <!-- Export Buttons -->
            <div class="export-buttons">
                <button @click="exportAttendance">Export Attendance</button>
                <button @click="exportRegistrations">Export Registrations</button>
                <button @click="exportPayments">Export Payments</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
    padding: 20px;
    min-height: 100vh;
}

.dashboard-box {
    max-width: 400px;
    background: white;
    padding: 20px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
}

.total-registrations {
    font-size: 1.2em;
    font-weight: bold;
    margin: 20px 0;
}

.total-registrations span {
    color: #007bff;
}

.export-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    font-size: 1em;
}

button:hover {
    background-color: #0056b3;
}
</style>
