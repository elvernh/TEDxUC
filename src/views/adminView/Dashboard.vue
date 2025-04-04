
<template>
    <div class="dashboard-admin">
      <h1>Admin Dashboard</h1>
      
      <!-- Dashboard Statistics -->
      <section class="stats-section" v-if="stats">
        <h2>Statistics</h2>
        <p>Total Events: {{ stats.totalEvents }}</p>
        <p>Active Events: {{ stats.activeEvents }}</p>
        <p>Total Registrations: {{ stats.totalRegistrations }}</p>
        <p>Paid Registrations: {{ stats.paidRegistrations }}</p>
        <p>Pending Registrations: {{ stats.pendingRegistrations }}</p>
        <p>Total Revenue: {{ stats.totalRevenue }}</p>
        <p>Attended Count: {{ stats.attendedCount }}</p>
        <p>Attendance Rate: {{ stats.attendanceRate }}%</p>
        <div class="event-stats" v-if="stats.eventStats">
          <h3>Event Stats</h3>
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Type</th>
                <th>Date</th>
                <th>Registered</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in stats.eventStats" :key="event._id">
                <td>{{ event.name }}</td>
                <td>{{ event.type }}</td>
                <td>{{ new Date(event.date).toLocaleDateString() }}</td>
                <td>{{ event.registeredCount }}</td>
                <td>{{ event.paidRegistrations }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <!-- Registrations Table -->
      <section class="registrations-section">
        <h2>Registrations</h2>
        <table v-if="registrations.length">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Reg Number</th>
              <th>Status</th>
              <th>Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reg in registrations" :key="reg._id">
              <td>{{ reg.fullName }}</td>
              <td>{{ reg.email }}</td>
              <td>{{ reg.registrationNumber }}</td>
              <td>{{ reg.status }}</td>
              <td>{{ reg.attendanceStatus }}</td>
              <td>
                <button @click="updateRegistration(reg._id)">Edit</button>
                <button @click="deleteRegistration(reg._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No registrations found.</div>
        <!-- Pagination for registrations -->
        <div class="pagination" v-if="regPagination">
          <button :disabled="currentRegPage === 1" @click="fetchRegistrations(currentRegPage - 1)">Prev</button>
          <span>Page {{ currentRegPage }} of {{ regPagination.pages }}</span>
          <button :disabled="currentRegPage === regPagination.pages" @click="fetchRegistrations(currentRegPage + 1)">Next</button>
        </div>
      </section>
      
      <!-- Payments Table -->
      <section class="payments-section">
        <h2>Payments</h2>
        <table v-if="payments.length">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pay in payments" :key="pay._id">
              <td>{{ pay.registrationId.fullName }} ({{ pay.registrationId.registrationNumber }})</td>
              <td>{{ pay.paymentMethod }}</td>
              <td>{{ pay.amount }}</td>
              <td>{{ pay.status }}</td>
              <td>{{ new Date(pay.paymentDate).toLocaleString() }}</td>
              <td>
                <button @click="updatePaymentStatus(pay._id)">Update Status</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No payments found.</div>
        <!-- Pagination for payments -->
        <div class="pagination" v-if="payPagination">
          <button :disabled="currentPayPage === 1" @click="fetchPayments(currentPayPage - 1)">Prev</button>
          <span>Page {{ currentPayPage }} of {{ payPagination.pages }}</span>
          <button :disabled="currentPayPage === payPagination.pages" @click="fetchPayments(currentPayPage + 1)">Next</button>
        </div>
      </section>
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  const token = localStorage.getItem('token');
  
  const stats = ref<any>(null);
  const registrations = ref<any[]>([]);
  const regPagination = ref<any>(null);
  const payments = ref<any[]>([]);
  const payPagination = ref<any>(null);
  
  const currentRegPage = ref(1);
  const currentPayPage = ref(1);
  
  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      stats.value = res.data.data;
      console.log(stats.value)
    } catch (error) {
      console.error("Error fetching dashboard stats", error);
    }
  };
  
  // Fetch registrations with pagination
  const fetchRegistrations = async (page = 1) => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/registrations?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      registrations.value = res.data.data.registrations;
      regPagination.value = res.data.data.pagination;
      currentRegPage.value = page;
    } catch (error) {
      console.error("Error fetching registrations", error);
    }
  };
  
  // Update a registration
  const updateRegistration = async (id: string) => {
    const fullName = prompt("Enter updated full name:");
    const email = prompt("Enter updated email:");
    const status = prompt("Enter updated status (paid/pending/cancelled/expired):");
    const attendanceStatus = prompt("Enter updated attendance status (attended/not_attended):");
    if (!fullName || !email || !status || !attendanceStatus) {
      alert("All fields required.");
      return;
    }
    try {
      await axios.put(`${API_URL}/api/admin/registrations/${id}`, {
        fullName,
        email,
        status,
        attendanceStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Registration updated successfully.");
      fetchRegistrations(currentRegPage.value);
    } catch (error) {
      console.error("Error updating registration", error);
    }
  };
  
  // Delete a registration
  const deleteRegistration = async (id: string) => {
    if (!confirm("Are you sure to delete this registration?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Registration deleted successfully.");
      fetchRegistrations(currentRegPage.value);
    } catch (error) {
      console.error("Error deleting registration", error);
    }
  };
  
  // Fetch payments with pagination
  const fetchPayments = async (page = 1) => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/export/payments?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      payments.value = res.data.data.payments;
      payPagination.value = res.data.data.pagination;
      currentPayPage.value = page;
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };
  
  // Update payment status
  const updatePaymentStatus = async (id: string) => {
    const newStatus = prompt("Enter new payment status (e.g., success):");
    if (!newStatus) return;
    try {
      await axios.put(`${API_URL}/api/admin/payments/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Payment status updated successfully.");
      fetchPayments(currentPayPage.value);
    } catch (error) {
      console.error("Error updating payment status", error);
    }
  };
  
  onMounted(() => {
    fetchStats();
    fetchRegistrations();
    fetchPayments();
  });
  </script>
  
  <style scoped>
  .dashboard-admin {
    padding: 20px;
  }
  
  .stats-section, .registrations-section, .payments-section {
    margin-bottom: 40px;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
  }
  
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  button {
    padding: 6px 12px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  