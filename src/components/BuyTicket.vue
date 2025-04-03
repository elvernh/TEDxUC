<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import bgImage from "@/assets/images/background-1.png";
import logo from "@/components/icons/logo-white.svg";

const router = useRouter();

const isLoading = ref(false);
const showErrorPopup = ref(false);
const errorMessages = ref<string[]>([]);

const props = defineProps<{ eventName: string }>();
const fullName = ref("");
const email = ref("");
const phone = ref("");
const age = ref("");
const gender = ref("");
const foodAllergy = ref("");
const eventDetails = ref<any>(null);

const selectedPayment = ref("");

const countdown = ref(8);

const currentStep = ref<"form" | "payment" | "confirmation">("form");

const submitForm = async () => {
  try {
    isLoading.value = true;

    const response = await axios.get("http://localhost:5000/api/events");
    const events = response.data.data;

    if (!props.eventName) {
      console.error("❌ props.eventName is undefined!");
      return;
    }

    const selectedEvent = events.find(
      (e) =>
        e.name.trim().toLowerCase() === props.eventName.trim().toLowerCase()
    );

    if (!selectedEvent) {
      console.error("❌ Event not found:", props.eventName);
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

    const registrationResponse = await axios.post(
      "http://localhost:5000/api/registrations/",
      formData
    );

    if (registrationResponse.status === 201) {
      const currentPath = router.currentRoute.value.path;
      if (["preevent3", "mainevent"].includes(props.eventName.toLowerCase())) {
        currentStep.value = "payment";
      } else {
        currentStep.value = "confirmation";
      }
    }
  } catch (error) {
    console.error("❌ Error during registration:", error);

    if (error.response && error.response.data) {
      if (Array.isArray(error.response.data.data)) {
        errorMessages.value = error.response.data.data.map(
          (errorDetail: any) => `${errorDetail.field}: ${errorDetail.message}`
        );
        showErrorPopup.value = true;
      }
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (router.currentRoute.value.path === "/confirmation-page") {
    const timer = setInterval(() => {
      countdown.value--;

      if (countdown.value <= 0) {
        clearInterval(timer);
        router.push("/");
      }
    }, 1000);
  }
});
</script>

<template>
  <div class="layout-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="logo-container">
      <img class="logo" :src="logo" alt="logo" />
    </div>

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
          <input
            type="radio"
            name="payment"
            id="bca"
            v-model="selectedPayment"
            value="bca"
          />
          <input
            type="radio"
            name="payment"
            id="qris"
            v-model="selectedPayment"
            value="qris"
          />

          <div class="category">
            <label for="bca" class="payment-method bcaMethod">
              <div class="imgName">
                <div class="imgContainer"></div>
                <img src="/src/assets/images/bcaLogo.png" alt="bca" />
                <span class="name">BCA Virtual Account</span>
              </div>
            </label>

            <label for="qris" class="payment-method qrisMethod">
              <div class="imgName">
                <div class="imgContainer"></div>
                <img src="/src/assets/images/qrisLogo.png" alt="qris" />
                <span class="name">QRIS</span>
              </div>
            </label>
          </div>

          <div class="payment-details">
            <div v-if="selectedPayment === 'bca'" class="bca-details">
              <h3>BCA Virtual Account Payment</h3>
              <div class="va-number">1111111111</div>
            </div>

            <div v-if="selectedPayment === 'qris'" class="qris-details">
              <h3>QRIS Payment</h3>
              <p>Scan this QR code below</p>
              <div class="qrcode-placeholder">qr</div>
            </div>
          </div>
        </form>
      </div>
    

    <div v-else class="confirmation-wrapper">
        <h1 class="title">Order Confirmed!</h1>

        <div class="confirmation-details">
          <p>Thank you for your order!</p>
          <p>Your e-ticket will be sent to your email</p>
          <p>You will be redirected to the home page now</p>
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
  width: 177px;
  z-index: 100;
}

.title {
  color: rgb(255, 255, 255);
  font-size: 70px;
  margin-bottom: 15px;
  text-align: center;
}

/* BuyTicket Styles */
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

/* PaymentMethod Styles */
.container {
  width: 600px;
  border-radius: 8px;
  padding: 40px;
  z-index: 2;
}

.category {
  margin-top: 10px;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}

.payment-method {
  position: relative;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-method:hover {
  background: rgba(255, 255, 255, 0.2);
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

.bca-details,
.qris-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
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
  top: 35%;
  transform: translateY(-35%);
}

/* ConfirmationPage Styles */
.confirmation-details {
  background: rgba(0, 0, 0, 0.4);
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

/* Common Components Styles */
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

  .form-submit {
    margin-top: -100px;
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
