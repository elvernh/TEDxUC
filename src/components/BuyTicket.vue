<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import bgImage from "@/assets/images/background-1.png";

interface Event {
  _id: string;
  name: string;
}

const props = defineProps<{ eventName?: string }>();

const fullName = ref("");
const email = ref("");
const phone = ref("");
const age = ref("");
const gender = ref("");
const foodAllergy = ref("");

const registrationId = ref<string | null>(null);
const qrisImageCode = ref("");
const amount = ref<number | null>(null);

const errorMessages = ref<string[]>([]);
const showErrorPopup = ref(false);
const isLoading = ref(false);
const currentStep = ref<"form" | "qris" | "success">("form");

const pollInterval = ref<number | null>(null);

const checkPaymentStatus = async () => {
  if (!registrationId.value) return;
  try {
    const response = await axios.get(
      `https://dickyyyy.site/api/payments/registration/${registrationId.value}`
    );
    if (response.data?.data?.status === "success") {
      clearPolling();
      currentStep.value = "success";
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
  }
};

const startPolling = () => {
  pollInterval.value = window.setInterval(checkPaymentStatus, 5000);
};

const clearPolling = () => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
    pollInterval.value = null;
  }
};

const submitForm = async () => {
  try {
    isLoading.value = true;

    if (!props.eventName) {
      errorMessages.value = ["Event name is required."];
      showErrorPopup.value = true;
      return;
    }

    const { data } = await axios.get("https://dickyyyy.site/api/events");
    const selectedEvent = data.data.find(
      (e: Event) =>
        e.name.trim().toLowerCase() === props.eventName!.trim().toLowerCase()
    );

    if (!selectedEvent) {
      errorMessages.value = [`Event "${props.eventName}" not found.`];
      showErrorPopup.value = true;
      return;
    }

    const formData = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      phoneNumber: phone.value.trim(),
      gender: gender.value,
      age: parseInt(age.value),
      foodAllergy: foodAllergy.value?.trim() || "None",
      eventId: selectedEvent._id,
    };

    const regResponse = await axios.post(
      "https://dickyyyy.site/api/registrations/",
      formData
    );

    if (regResponse.status === 201) {
      registrationId.value = regResponse.data.data._id;

      // Auto-create QRIS payment
      const paymentResponse = await axios.post(
        "https://dickyyyy.site/api/payments",
        {
          registrationId: registrationId.value,
          paymentMethod: "qris",
        }
      );

      const paymentData = paymentResponse.data.data;
      console.log(paymentData)
      amount.value = paymentData.payment.totalAmount;

      const qrAction = paymentData.paymentInstructions.actions?.find(
        (action: any) => action.name === "generate-qr-code"
      );

      if (qrAction) {
        qrisImageCode.value = qrAction.url;
      }

      currentStep.value = "qris";
      startPolling();
    }
  } catch (error: any) {
    if (error.response?.data) {
      const responseData = error.response.data;
      errorMessages.value = Array.isArray(responseData.data)
        ? responseData.data.map((e: any) => `${e.field}: ${e.message}`)
        : [responseData.message];
      showErrorPopup.value = true;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="layout-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Step 1: Registration Form -->
    <div v-if="currentStep === 'form'" class="form-wrapper">
      <h1 class="title">Ticket Order Form</h1>
      <form @submit.prevent="submitForm">
        <div class="form-norm">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input v-model="fullName" class="form-input" required />
          </div>
          <div class="form-group">
            <label>No. Telp</label>
            <input v-model="phone" class="form-input" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" class="form-input" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group-usia">
            <label>Usia</label>
            <input v-model="age" type="number" class="form-input-short" required />
          </div>
          <div class="form-group-gender">
            <label>Gender</label>
            <select v-model="gender" class="form-input-short" required>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div v-if="props.eventName === 'Main Event'" class="form-group-alergi">
            <label>Alergi Makanan</label>
            <input v-model="foodAllergy" type="text" class="form-input-short" />
          </div>
        </div>

        <div class="form-submit">
          <button type="submit" class="submit-button" :disabled="isLoading">
            NEXT
          </button>
        </div>
      </form>
    </div>

    <!-- Step 2: QRIS -->
    <div v-else-if="currentStep === 'qris'" class="payment-wrapper">
      <h1 class="title">QRIS Payment</h1>
      <p class="payment-description">Scan this QR code to pay!</p>
      <img :src="qrisImageCode" alt="QRIS Code" class="qrcode-image" />
      <p class="price">Rp{{ amount?.toLocaleString("id-ID") }}</p>
      <a :href="qrisImageCode" download="qris-code.png" class="download-button">Download QR Code</a>
    </div>

    <!-- Step 3: Success -->
    <div v-else-if="currentStep === 'success'" class="confirmation-wrapper">
      <h1 class="title">Payment Success!</h1>
      <p>Thank you for your payment.</p>
      <router-link to="/" class="download-button">Back to Home</router-link>
    </div>
  </div>

  <!-- Error Popup -->
  <div v-if="showErrorPopup" class="error-popup">
    <div class="popup-content">
      <h2>Error</h2>
      <ul>
        <li v-for="(msg, i) in errorMessages" :key="i">{{ msg }}</li>
      </ul>
      <button @click="showErrorPopup = false">Close</button>
    </div>
  </div>

  <!-- Loading -->
  <div v-if="isLoading" class="loader">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
 .layout-container {
  width: 100vw;
  height: 180vh;
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

.form-wrapper {
  display: none;
}

.logo {
  position: fixed;
  top: 2rem;
  left: 3rem;
  width: 177px;
  z-index: 100;
}

.title {
  color: rgb(255, 255, 255);
  font-size: 70px;
  margin-bottom: 15px;
  text-align: center;
}

.form-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: transparent;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
}

.radio-hid {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

label {
  font-size: 30px;
  color: white;
  font-weight: normal;
}

.form-input,
.form-input-short {
  background: white;
  border: none;
  border-radius: 6px;
  padding: 15px;
  font-size: 20px;
  transition: all 0.3s ease;
}

.form-input-short {
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

.download-button {
  background-color: red;
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

.submit-button:hover {
  background-color: hsla(0, 0%, 34%, 0.699);
}

.payment-wrapper {
  display: flex;                /* Enable flexbox */
  flex-direction: column;       /* Align items in a column */
  justify-content: center;      /* Center items vertically */
  align-items: center;          /* Center items horizontally */
  width: 100%;
  max-width: 800px;
  padding: 40px;
  z-index: 1;
  text-align: center;           /* Center text inside */
}


.container {
  width: 600px;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 5px 12px -2px rgba(0, 0, 0, 0.1),
    0 18px 36px -6px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.category {
  margin-top: 10px;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}

.category.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}



.payment-method {
  position: relative;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.payment-method:hover {
  background: rgba(255, 255, 255, 0.2);
}

.payment-details {
  margin: 30px 0;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-height: 200px;
  color: white;
  transition: all 0.3s ease;
}

.payment-details h3 {
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  color: #fff;
}

.payment-description {
  font-size: 1.375rem;  /* Around 22px */
  font-weight: 600;     /* Semi-bold */
  text-align: center;   /* Center align the text */
}

.price {
  font-size: 2rem;      /* Around 32px */
  font-weight: 700;     /* Bold */
  color: #fff !important;          /* Dark color for readability */
  text-align: center;   /* Center align the text */
}


.qris-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
}

.qris-details p {
  margin-bottom: 10px;
  text-align: center;
}

.qrcode-placeholder {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 10px 0;
}

.submit-button-payment {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.payment-submit-button {
  padding: 14px 100px;
  font-size: 18px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3;
}

.Payment-name {
  font-size: 20px;
  margin-top: 10px;
}

.qrcode-image {
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 300px;
}

.qrcode-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.imgName {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.imgName span {
  position: absolute;
  font-weight: bold;
  margin-top: 80px;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15%;
  transform: translateY(-25px);
}

img {
  width: 400px;
  height: auto;
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.confirmation-wrapper {
  z-index: 9999;
}

.confirmation-details {
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;
  text-align: center;
}
.layout-container {
  width: 100vw;
  height: 180vh;
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

.form-wrapper {
  display: none;
}

.logo {
  position: fixed;
  top: 2rem;
  left: 3rem;
  width: 177px;
  z-index: 100;
}

.title {
  color: rgb(255, 255, 255);
  font-size: 70px;
  margin-bottom: 15px;
  text-align: center;
}

.form-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: transparent;
}
/* BuyTicket Styles */

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
}

.radio-hid {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

label {
  font-size: 30px;
  color: white;
  font-weight: normal;
}

.form-input,
.form-input-short {
  background: white;
  border: none;
  border-radius: 6px;
  padding: 15px;
  font-size: 20px;
  transition: all 0.3s ease;
}

.form-input-short {
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
.download-button {
  background-color: red;
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  /* margin-top: 40px; */
}

.submit-button:hover {
  background-color: hsla(0, 0%, 34%, 0.699);
}


/* PaymentMethod Styles */
.payment-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 40px;
  z-index: 1;
  justify-content: center;
  align-items: center;
}


.container {
  width: 600px;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 5px 12px -2px rgba(0, 0, 0, 0.1),
    0 18px 36px -6px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.container form input[type="radio"] {
  display: none;
  opacity: 0;
  width: 0;
  height: 0;
}

.category {
  margin-top: 10px;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}

.category.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-method {
  position: relative;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.payment-method.active {
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.payment-method:hover {
  background: rgba(255, 255, 255, 0.2);
}

.payment-method.bcaMethod.active,
.payment-method.qrisMethod.active {
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

#bca:checked ~ .category .bcaMethod,
#qris:checked ~ .category .qrisMethod {
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.payment-details {
  margin: 30px 0;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-height: 200px;
  color: white;
  transition: all 0.3s ease;
}

.payment-details h3 {
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  color: #fff;
}

.bca-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.qrcode-image {
  width: 200px;
  height: 200px;
}
.va-number {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 2px;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px 30px;
  border-radius: 6px;
  font-family: monospace;
}

.copy-btn {
  width: 100%;
  padding: 8px 12px;
  background-color: red; /* red-500 */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.copy-btn:hover {
  background-color: #f13434; /* red-400 */
}

.qris-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
}

.qris-details p {
  margin-bottom: 10px;
  text-align: center;
}

.qrcode-placeholder {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 10px 0;
}
.submit-button-payment {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.payment-submit-button {
  padding: 14px 100px;
  font-size: 18px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3;
}

.Payment-name {
  font-size: 20px;
  margin-top: 10px;
}
.qrcode-image {
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 300px;
}

.qrcode-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.imgName {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.imgName span {
  /* margin-left: 20px; */
  position: absolute;
  font-weight: bold;
  margin-top: 80px;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15%;
  transform: translateY(-25px);
}

img {
  width: 100px;
  height: auto;
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

/* ConfirmationPage Styles */

.confirmation-wrapper {
  z-index: 9999;
}
.confirmation-details {
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;
  text-align: center;
}

.confirmation-details p {
  margin-bottom: 10px;
  line-height: 1.6;
  color: white;
  font-size: 18px;
}

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

.loader {
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
.ending {
  margin-bottom: 40px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .form-wrapper,
  .container {
    padding: 30px 20px;
    width: 90%;
  }

  .title {
    margin-top: 90px;
    font-size: 40px;
    z-index: 999;
  }

  .form-row,
  .category {
    flex-direction: column;
    gap: 20px;
    grid-template-columns: 1fr;
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
}

@media (max-width: 590px) {
  .form-wrapper {
    padding: 30px 20px;
  }

  label {
    font-size: 20px;
  }
}
</style>
