<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

interface Event {
  _id: string;
  name: string;
  // ... other properties
}
import axios from "axios";
import bgImage from "@/assets/images/background-1.png";
import logo from "@/components/icons/logo-white.svg";

const router = useRouter();

const props = defineProps<{ eventName?: string }>();

// Form fields
const fullName = ref("");
const email = ref("");
const phone = ref("");
const age = ref("");
const gender = ref("");
const foodAllergy = ref("");

// State
const errorMessages = ref<string[]>([]);
const showErrorPopup = ref(false);
const isLoading = ref(false);
const countdown = ref(5);
const currentStep = ref<"form" | "payment" | "confirmation" | "success">(
  "form"
);

// Event details
const eventDetails = ref<any>(null);

// Payment selection
const selectedPayment = ref("");
const confirmedPayment = ref<string | null>(null);
const registrationId = ref<string | null>(null);
const paymentId = ref<string | null>(null);
const bcaVANumber = ref("");
const qrisCode = ref("");
const qrisImageCode = ref("");

// Payment status polling
const pollInterval = ref<number | null>(null);
let countdownTimer: number | null = null;

// Fungsi untuk memeriksa status pembayaran
const checkPaymentStatus = async () => {
  if (!registrationId.value) return;

  try {
    const response = await axios.get(
      `https://163.53.195.131:3000/api/payments/registration/${registrationId.value}`
    );

    if (response.data && response.data.data) {
      const paymentStatus = response.data.data.status;
      console.log("Current payment status:", paymentStatus);

      // Jika pembayaran berhasil, ubah ke halaman sukses
      if (paymentStatus === "success") {
        clearPolling();
        currentStep.value = "success";
        // Mulai countdown untuk redirect ke home page
        // startCountdown();
      }
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
  }
};

// Memulai polling untuk mengecek status pembayaran
const startPolling = () => {
  // Cek setiap 5 detik
  pollInterval.value = window.setInterval(checkPaymentStatus, 5000);
};

// Menghentikan polling
const clearPolling = () => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
    pollInterval.value = null;
  }
};

// Countdown untuk redirect ke home
const startCountdown = () => {
  countdown.value = 5;
  countdownTimer = window.setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownTimer!);
      router.push("/");
    }
  }, 1000);
};

function copyVANumber(){
      navigator.clipboard.writeText(bcaVANumber.value);
      alert("BCA VA Copied to Clipboard")
}

// 📤 Submit form
const submitForm = async () => {
  try {
    isLoading.value = true;

    if (!props.eventName) {
      console.error("❌ props.eventName is undefined!");
      errorMessages.value = ["Event name is required."];
      showErrorPopup.value = true;
      return;
    }

    const response = await axios.get("https://163.53.195.131:3000/api/events");
    const events = response.data.data;

    const selectedEvent = events.find(
      (e: any) =>
        e.name.trim().toLowerCase() === props.eventName!.trim().toLowerCase()
    );

    if (!selectedEvent) {
      console.error("❌ Event not found:", props.eventName);
      errorMessages.value = [`Event "${props.eventName}" not found.`];
      showErrorPopup.value = true;
      return;
    }

    const eventIdValue = selectedEvent._id;

    
    const formData = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      phoneNumber: phone.value.trim(),
      gender: gender.value,
      age: parseInt(age.value, 10),
      foodAllergy: foodAllergy.value?.trim() || "None",
      eventId: eventIdValue,
    };

    console.log("Sending form data: ", formData);

    const registrationResponse = await axios.post(
      "https://163.53.195.131:3000/api/registrations/",
      formData
    );

    if (registrationResponse.status === 201) {
      registrationId.value = registrationResponse.data.data._id; // ✅ Store registration ID
      console.log("Registration ID: ", registrationId.value);

      currentStep.value =
        props.eventName === "Pre-Event 3" || props.eventName === "Main Event"
          ? "payment"
          : "confirmation";
      console.log(props.eventName);
      if (props.eventName === "Pre-Event 1") {
        try {
          const paymentResponse = await axios.post(
            "https://163.53.195.131:3000/api/payments",
            {
              registrationId: registrationId.value,
              paymentMethod: "bca_va",
            }
          );
          console.log("Berhasil mengubah status payment menjadi paid");
        } catch (e) {
          console.log("Error: ", e);
          console.log("Gagal mengubah status payment menjadi paid");
        }
      }
    }
  } catch (error: any) {
    console.error("❌ Error during registration:", error);

    if (error.response && error.response.data) {
      if (Array.isArray(error.response.data.data)) {
        errorMessages.value = error.response.data.data.map(
          (errorDetail: any) => `${errorDetail.field}: ${errorDetail.message}`
        );
      } else {
        errorMessages.value = [
          error.response.data.message || "An error occurred",
        ];
      }
      showErrorPopup.value = true;
    }
  } finally {
    isLoading.value = false;
  }
};

const confirmPayment = async () => {
  try {
    if (!selectedPayment.value) {
      alert("Please select a payment method first.");
      return;
    }

    if (!registrationId.value) {
      console.error("❌ Error: Registration ID is missing!");
      alert("No registration found. Please complete registration first.");
      return;
    }

    console.log("Registration ID:", registrationId.value);

    const transactionData = {
      registrationId: registrationId.value,
      paymentMethod: selectedPayment.value,
    };

    confirmedPayment.value = selectedPayment.value;

    const transactionResponse = await axios.post(
      "https://163.53.195.131:3000/api/payments",
      transactionData
    );
    const responseData = transactionResponse.data;
    console.log(responseData);

    // Simpan paymentId untuk pengecekan status
    if (responseData.data && responseData.data.payment) {
      paymentId.value = responseData.data.payment._id;
    }

    if (responseData.data && responseData.data.paymentInstructions) {
      if (
        responseData.data.payment.paymentMethod === "bca_va" &&
        responseData.data.paymentInstructions.va_numbers &&
        responseData.data.paymentInstructions.va_numbers.length > 0
      ) {
        bcaVANumber.value =
          responseData.data.paymentInstructions.va_numbers[0].va_number;
        console.log("BCA VA Number:", bcaVANumber.value);
      } else if (responseData.data.payment.paymentMethod === "qris") {
        const qrAction = responseData.data.paymentInstructions.actions.find(
          (action: any) => action.name === "generate-qr-code"
        );

        if (qrAction) {
          qrisImageCode.value = qrAction.url;
          console.log("QRIS Image URL:", qrisImageCode.value);
        }

        // Jika ada qr_string
        if (responseData.data.paymentInstructions.qr_string) {
          qrisCode.value = responseData.data.paymentInstructions.qr_string;
        }
      }
    }

    console.log("✅ Payment confirmed:", transactionResponse.data);
  } catch (e) {
    console.error("❌ Error at submitting transaction: ", e);
  }
};

// onMounted(() => {
//   setTimeout(() => {
//     router.push('/');
//   }, 5000);
// });
</script>

<template>
  <div class="layout-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <div v-if="currentStep === 'form'" class="form-wrapper">
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
          <button type="submit" class="submit-button" :disabled="isLoading">
            NEXT
          </button>
        </div>
      </form>
    </div>

    <div v-else-if="currentStep === 'payment'" class="payment-wrapper">
      <h1 class="title">Payment</h1>

      <form @submit.prevent>
        <div style="color: white; margin-bottom: 10px"></div>

        <!-- Payment methods selection -->
        <div class="category" :class="{ centered: confirmedPayment }">
          <label
            v-if="!confirmedPayment || confirmedPayment === 'bca_va'"
            for="bca"
            class="payment-method bcaMethod"
            :class="{ active: selectedPayment === 'bca_va' }"
            @click="selectedPayment = 'bca_va'"
          >
            <div class="imgName">
              <div class="imgContainer"></div>
              <img src="/src/assets/images/bcaLogo.png" alt="bca" />
              <span class="Payment-name">BCA Virtual Account</span>
            </div>
          </label>

          <label
            v-if="!confirmedPayment || confirmedPayment === 'qris'"
            for="qris"
            class="payment-method qrisMethod"
            :class="{ active: selectedPayment === 'qris' }"
            @click="selectedPayment = 'qris'"
          >
            <div class="imgName">
              <div class="imgContainer"></div>
              <img src="/src/assets/images/qrisLogo.png" alt="qris" />
              <span class="Payment-name">QRIS</span>
            </div>
          </label>
        </div>

        <div class="submit-button-payment">
          <button
            type="button"
            @click="confirmPayment"
            class="payment-submit-button"
            v-if="!confirmedPayment"
          >
            Choose Payment Method
          </button>
        </div>

        <!-- Payment details section -->
        <div class="payment-details">
          <div v-show="confirmedPayment === 'bca_va'" class="bca-details">
            <h3>BCA Virtual Account Payment</h3>
            <div class="va-number">{{ bcaVANumber }}</div>
            <p class="payment-instructions">
              Silahkan transfer sesuai nominal yang tertera ke nomor Virtual
              Account di atas
            </p>
            <button @click="copyVANumber" class="copy-btn">Copy</button>
          </div>

          <div v-show="confirmedPayment === 'qris'" class="qris-details">
            <h3>QRIS Payment</h3>
            <p>Scan this QR code below</p>
            <div class="qrcode-placeholder">
              <img :src="qrisImageCode" alt="QRIS" class="qrcode-image" />
            </div>
            <a
              :href="qrisImageCode"
              download="qris-code.png"
              class="download-button"
            >
              Download QR Code
            </a>
          </div>
        </div>
      </form>
    </div>

    <div v-else-if="currentStep === 'success'" class="confirmation-wrapper">
      <h1 class="title">Payment Success!</h1>

      <div class="confirmation-details">
        <p>Thank you for your payment!</p>
        <p>Your e-ticket has been sent to your email.</p>
        <p class="ending">Please check your email for the QR code ticket.</p>
        <router-link to="/" class="download-button">Back to Home</router-link>
      </div>
    </div>

    <div v-else class="confirmation-wrapper">
      <h1 class="title">Order Confirmed!</h1>

      <div class="confirmation-details">
        <p>Thank you for your order!</p>
        <p class="ending">Your e-ticket will be sent to your email</p>
        <router-link to="/" class="download-button">Back to Home</router-link>
        <!-- <p class="countdown">Redirecting to home page in {{ countdown }} seconds...</p> -->
      </div>
    </div>
  </div>

  <div v-if="showErrorPopup" class="error-popup">
    <div class="popup-content">
      <h2>Validation Errors</h2>
      <ul>
        <li v-for="(message, index) in errorMessages" :key="index">
          {{ message }}
        </li>
      </ul>
      <button @click="showErrorPopup = false">Close</button>
    </div>
  </div>

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
  gap: 15px;
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
