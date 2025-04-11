<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logoContainer">
        <img :src="tedxLogo" alt="TEDx Logo" class="logo" draggable="false" />
      </div>
      <h1 class="login-title">Login</h1>
      <p class="login-subtitle">Hi, you need to Login to Enter!</p>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
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
            <span class="eye-icon" @click="togglePassword">
              <img
                :src="showPassword ? eyeOff : eye"
                alt="Toggle Password Visibility"
                draggable="false"
              />
            </span>
          </div>
        </div>
        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from 'axios';
import tedxLogo from "@/components/icons/logo-black.png";
import eyeOff from "@/components/icons/eye-off.svg";
import eye from "@/components/icons/eye.svg";
import { useRouter } from "vue-router";

const API_URL = import.meta.env.VITE_API_URL || 'dickyyyy.site';

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/qr-scanner"); 
  }
});

const login = async () => {
  errorMessage.value = "";
  isLoading.value = true;
  
  try {
    // Add debug logging
    console.log(`Attempting to login with email: ${email.value}`);
    console.log(`API URL: ${API_URL}/api/auth/login`);
    
    // Set specific headers for the request
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: email.value,
      password: password.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('Login response:', response.data);
    
    // Extract data from the response
    const responseData = response.data;
    
    // Check if the response format matches our expected structure
    if (responseData.status === 'success' && responseData.data) {
      const { token, user } = responseData.data;
      
      console.log('Login successful, user:', user.name);
      
      // Store user data and token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Redirect to QR scanner
      router.push("/qr-scanner");
    } else {
      // Handle unexpected response format
      console.error('Unexpected response format:', responseData);
      errorMessage.value = "Login failed. Unexpected server response.";
    }
  } catch (error: any) {
    console.error("Login error details:", error);
    
    // Extract error message from response if available
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
      
      if (error.response.status === 401) {
        errorMessage.value = "Invalid email or password. Please try again.";
      } else if (error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value = `Server error (${error.response.status}). Please try again later.`;
      }
    } else if (error.request) {
      // Request was made but no response received
      console.log('No response received:', error.request);
      errorMessage.value = "Unable to connect to the server. Please check your internet connection.";
    } else {
      // Something else caused the error
      errorMessage.value = "Login failed. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
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
  width: 90px;
  margin-bottom: 1rem;
}

.logoContainer {
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
  margin-left: -40px;
  size: 10px;
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

.login-button:hover:not(:disabled) {
  background: #eb0028;
}

.login-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
}

.forgot-password {
  color: #eb0028;
  text-decoration: none;
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}
</style>