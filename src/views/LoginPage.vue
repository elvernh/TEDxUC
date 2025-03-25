<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logoContainer">
        <img :src="tedxLogo" alt="TEDx Logo" class="logo" draggable="false"/>
      </div>
      <h1 class="login-title">Login</h1>
      <p class="login-subtitle">Hi, you need to Login to Enter!</p>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email <span>*</span></label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password <span>*</span></label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="Enter your Password"
              required
            />
            <span class="eye-icon" @click="togglePassword">{{
              showPassword ? "🙈" : "👁️"
            }}</span>
          </div>
        </div>
        <button type="submit" class="login-button">Login</button>
        <a href="#" class="forgot-password">Forgot Password?</a>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import tedxLogo from "@/components/icons/logo-white.svg";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const login = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  // Add authentication logic here
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: url("/src/assets/bg-texture.png") no-repeat center center fixed; */
  background-size: cover;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 350px;
  width: 100%;
  text-align: center;
  position: relative;
}

.logo {
  width: 60px;
  margin-bottom: 1rem;
}

.logoContainer{
    display: flex;
    align-items: self-start;
}

.login-title {
  font-size: 3rem;
  margin: 0.5rem 0;
}

.login-subtitle {
  margin: 0.5rem 0 2rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

label span {
  color: red;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.password-input {
  display: flex;
  align-items: center;
}

.eye-icon {
  margin-left: -30px;
  cursor: pointer;
}


.login-button {
  background: #d47c7c;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background 0.2s;
}

.login-button:hover {
  background: #eb0028;
}

.forgot-password {
  color: #eb0028;
  text-decoration: none;
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
