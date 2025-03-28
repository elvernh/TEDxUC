<script lang="ts">
import { ref } from "vue";
import bgImage from "@/assets/images/background-1.png";
import logo from "@/components/icons/logo-white.svg";

const fullName = ref("");
const email = ref("");
const phone = ref("");
const age = ref("");
const gender = ref("");
const foodAllergy = ref("");

const submitForm = () => {
  console.log("Nama Lengkap:", fullName.value);
  console.log("Email:", email.value);
  console.log("No. Telp:", phone.value);
  console.log("Usia:", age.value);
  console.log("Gender:", gender.value);
  console.log("Alergi Makanan:", foodAllergy.value);
};
</script>

<template>
  <div class="layout-container" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="form-wrapper">
      <div class="logo-container">
        <img class="logo" :src="logo" alt="logo" />
      </div>
      <h1 class="title">Ticket Order Form</h1>
      <form>
        <div class="form-norm">
          <div class="form-group">
            <label for="fullName">Nama Lengkap</label>
            <input v-model="fullName" class="form-input" type="text" required />
          </div>
          <div class="form-group">
            <label>No. Telp</label>
            <input v-model="phone" type="text" required class="form-input" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="form-input"
              placeholder="Email adress"
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

          <div class="form-group-alergi">
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
  background-image: url("/src/assets/images/background-1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
}

.logo-container img {
  max-width: 200px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.form-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
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
    font-size: 32px;
  }

  .form-row {
    flex-direction: column;
    gap: 20px;
  }

  .form-row .form-group {
    width: 100% !important;
  }
}
</style>