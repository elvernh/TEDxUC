<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "@/components/icons/logo-white.svg";

const isMobileMenuOpen = ref(false);
const router = useRouter();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const logout = () => {
  localStorage.removeItem("token");
  // Arahkan ke halaman login
  router.push("/login");
};
</script>

<template>
  <nav>
    <div class="nav-container">
      <div class="left-side">
        <router-link to="/admin/dashboard">
          <img class="logo" :src="logo" alt="logo" />
        </router-link>
      </div>
      <!-- Hamburger menu untuk tampilan mobile -->
      <div class="hamburger" @click="toggleMobileMenu">
        <div class="bar" :class="{ 'bar1': isMobileMenuOpen }"></div>
        <div class="bar" :class="{ 'bar2': isMobileMenuOpen }"></div>
        <div class="bar" :class="{ 'bar3': isMobileMenuOpen }"></div>
      </div>
      <div class="right-side" :class="{ open: isMobileMenuOpen }">
        <ul>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="create-event">Create Event</router-link></li>
          <li><router-link to="/qr-scanner">Scan QR</router-link></li>
          <li><router-link to="/Emailto">Email Registration</router-link></li>
          <li><router-link to="/makeqr">Create QR</router-link></li>
          <li><button class="logout-button" @click="logout">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.81) 13%, rgba(0, 0, 0, 0) 100%);
  position: fixed;
  font-weight: 900;
  font-size: 19px;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 3rem;
}

.left-side {
  z-index: 99;
}

.logo {
  height: 50px; /* Atur sesuai kebutuhan */
}

/* Menu Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 110;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
  transition: all 0.3s ease-in-out;
}

.bar1 {
  transform: rotate(45deg) translate(5px, 5px);
}

.bar2 {
  opacity: 0;
}

.bar3 {
  transform: rotate(-45deg) translate(5px, -5px);
}

.right-side ul {
  display: flex;
  list-style: none;
  gap: 3rem;
  padding: 0;
  margin: 0;
}

.right-side ul li {
  position: relative;
}

.right-side ul li a {
  text-decoration: none;
  color: white;
  transition: color 0.4s ease;
  cursor: pointer;
}

.right-side ul li a:hover {
  color: #eb0028;
}

/* Tombol Logout */
.logout-button {
  background-color: #EB0028;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #cf001f;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    margin: 1rem;
  }
  
  .hamburger {
    display: flex;
  }
  
  .right-side {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    text-align: center;
    padding: 5.5rem 0 2rem 0;
    flex-direction: column;
  }
  
  .right-side.open {
    display: flex;
  }
  
  .right-side ul {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
