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

const submitForm = async () => {
  console.log("Nama Lengkap:", fullName.value);
  console.log("Email:", email.value);
  console.log("No. Telp:", phone.value);
  console.log("Usia:", age.value);
  console.log("Gender:", gender.value);
  console.log("Alergi Makanan:", foodAllergy.value);

  const formData = {
    fullName: fullName.value,
    email: email.value,
    phoneNumber: phone.value,
    gender: gender.value,
    age: age.value,
    foodAllergy: "abra",
    eventId: "67ed433f1c5603fcb0d2d014",
  };
  console.log(formData);

  try {
    // Make POST request to backend
    const response = await axios.post(
      "http://localhost:5001/api/registrations/", // URL of your Express.js backend
      formData
    );

    if (response.status === 201) {
      console.log("Registration successful", response.data);
      const currentPath = router.currentRoute.value.path;

      if (
        currentPath === "/register/preevent3" ||
        currentPath === "/register/mainevent"
      ) {
        router.push(`${currentPath}/transaction`);
      } else {
        router.push("/confirmation-page"); // ✅ Fixed route
      }
      // Optionally, redirect user to another page or show a success message
    }
  } catch (error) {
    console.error("Error during registration:");
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
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
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
          <button type="submit" class="submit-button">NEXT</button>
        </div>
      </form>
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
}
</style>
