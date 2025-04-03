<script lang="ts" setup>
import { ref } from "vue";
import bgImage from "@/assets/images/background-1.png";
import logo from "@/components/icons/logo-white.svg";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const props = defineProps<{ eventName: string }>();

const fullName = ref("");
const email = ref("");
const phone = ref("");
const age = ref("");
const gender = ref("");
const foodAllergy = ref("");
const eventDetails = ref<any>(null); // To store event details

const errorMessages = ref<string[]>([]);
const showErrorPopup = ref(false);
const isLoading = ref(false);  // Add this line for the loading state

const submitForm = async () => {
  try {
    isLoading.value = true;  // Set loading state to true when submission starts
    
    // Fetch events
    const response = await axios.get("http://localhost:5001/api/events");
    const events = response.data.data;

    console.log("✅ Fetched Events:", events.map(e => e.name));

    // Ensure props.eventName is defined
    if (!props.eventName) {
      console.error("❌ props.eventName is undefined!");
      return;
    }

    console.log("🎯 Searching for:", props.eventName);

    // Find selected event (case-insensitive & trimmed)
    const selectedEvent = events.find(e =>
      e.name.trim().toLowerCase() === props.eventName.trim().toLowerCase()
    );

    if (!selectedEvent) {
      console.error("❌ Event not found:", props.eventName);
      return;
    }

    const eventIdValue = selectedEvent._id;

    // Construct form data
    const formData = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      phoneNumber: phone.value.trim(),
      gender: gender.value,
      age: parseInt(age.value, 10), // Ensure it's a number
      foodAllergy: foodAllergy.value?.trim() || "None",
      eventId: eventIdValue
    };

    console.log("🚀 Sending Form Data:", formData);

    // Make POST request
    const registrationResponse = await axios.post(
      "http://localhost:5001/api/registrations/",
      formData
    );

    // Check if registration was successful
    if (registrationResponse.status === 201) {
      console.log("✅ Registration successful:", registrationResponse.data);
      console.log("Registration data: ", registrationResponse.data.data._id)
      const currentPath = router.currentRoute.value.path;
      if (["/register/preevent3", "/register/mainevent"].includes(currentPath)) {
        router.push(`${currentPath}/transaction`);
      } else {
        router.push("/confirmation-page");
      }
    }
  } catch (error) {
    console.error("❌ Error during registration:", error);

    if (error.response && error.response.data) {
      console.error("❌ Server Response Status:", error.response.status);
      console.error("❌ Server Response Data:", error.response.data);

      // Check if there are validation errors in the 'data' array
      if (Array.isArray(error.response.data.data)) {
        // Collect error messages
        errorMessages.value = error.response.data.data.map(
          (errorDetail: any) => `${errorDetail.field}: ${errorDetail.message}`
        );
        showErrorPopup.value = true; // Show the popup when errors are found
      }
    }
  } finally {
    isLoading.value = false;  // Set loading state to false when done
  }
};
</script>

<template>
  <div class="layout-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="form-wrapper">
      <div class="logo-container">
        <img class="logo" :src="logo" alt="logo" />
      </div>
      <h1 class="title">Ticket Order Form</h1>
      <form @submit.prevent="submitForm">
        <div class="form-norm">
          <div class="form-group">
            <label for="fullName">Nama Lengkap</label>
            <input
              v-model="fullName"
              class="form-input"
              type="text"
              required
              placeholder="Nama"
            />
          </div>
          <div class="form-group">
            <label>No. Telp</label>
            <input
              v-model="phone"
              type="text"
              required
              class="form-input"
              placeholder="Nomor Telepon"
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="form-input"
              placeholder="Email address"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group-usia">
            <label>Usia</label>
            <input
              v-model="age"
              type="number"
              required
              class="form-input-short"
            />
          </div>

          <div class="form-group-gender">
            <label>Gender</label>
            <select v-model="gender" class="form-input-short">
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div
            v-if="props.eventName === 'Main Event'"
            class="form-group-alergi"
          >
            <label>Alergi Makanan</label>
            <input v-model="foodAllergy" type="text" class="form-input-short" />
          </div>
        </div>

        <div class="form-submit">
          <button type="submit" class="submit-button" :disabled="isLoading">NEXT</button>
        </div>
      </form>
    </div>

    <!-- Modal for Validation Errors -->
    <div v-if="showErrorPopup" class="error-popup">
      <div class="popup-content">
        <h2>Validation Errors</h2>
        <ul>
          <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
        </ul>
        <button @click="showErrorPopup = false">Close</button>
      </div>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="loader">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
}

.layout-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.logo {
  position: fixed;
  top: 2rem;
  left: 3rem;
  size: 200%;
  z-index: 100;
  pointer-events: none;
}

.form-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: transparent
}

.title {
  color: rgb(255, 255, 255);
  font-size: 70px;
  margin-bottom: 15px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
}

label {
  font-size: 30px;
  color: white;
  font-weight: normal;
}

.form-input {
  background: white;
  border: none;
  border-radius: 6px;
  padding: 15px;
  font-size: 20px;
  transition: all 0.3s ease;
}

.form-input-short {
  background: white;
  border: none;
  border-radius: 6px;
  padding: 15px;
  font-size: 20px;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.form-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.form-group-usia {
  flex: 0 0 100px;
}

.form-group-gender {
  flex: 0 0 170px;
}

.form-group-alergi {
  flex: 1;
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.submit-button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 15px 40px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: hsla(0, 0%, 34%, 0.699);
}

/* Error popup styles */
.error-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  color: black;
}

.popup-content h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.popup-content ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.popup-content li {
  margin-bottom: 10px;
  font-size: 18px;
}

.popup-content button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: hsla(0, 0%, 34%, 0.7);
}

/* Loader styles */
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Darken background when loader is visible */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@media (max-width: 768px) {
  .form-wrapper {
    padding: 30px 20px;
  }

  .title {
    margin-top: 90px;
    font-size: 40px;
  }

  .form-row {
    flex-direction: column;
    gap: 20px;
  }

  .form-row .form-group {
    width: 100%;
  }

  label {
    font-size: 22px;
  }

  .form-group-gender {
    flex: 0 0 170px;
    margin-top: -25px;
  }

  .form-group-alergi {
    flex: 1;
    margin-top: -90px;
  }

  .form-submit{
    margin-top: -100px;
  }
}

@media (max-width: 590px) {
  .form-wrapper {
    padding: 30px 20px;
  }

  .form-row {
    flex-direction: column;
    gap: 20px;
  }

  .form-row .form-group {
    width: 100%;
  }

  label {
    font-size: 20px;
  }

  .form-wrapper {
    width: 100%;
    padding: 40px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
  .form-submit{
    margin-top: -100px;
  }
}
</style>
