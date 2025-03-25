<script setup lang="ts">
import logo from "@/components/icons/logo-white.svg";
import { useRouter } from "vue-router";
const router = useRouter();

const navigationPath = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Buy Ticket",
    path: "/buy-ticket",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
  {
    name: "Mini Game",
    path: "/mini-game",
  },
  {
    name: "Login",
    path: "/login",
  },
];

// const navigationPath = router.getRoutes()
//   .filter((route) => route.name) 
//   .map((route) => ({
//     name: route.name,
//     path: route.path,
//   }));
// pake ini pas udah ada router2 jadi
</script>

<template>
  <nav>
    <div class="nav-container">
      <div class="left-side">
        <img class="logo" :src="logo" alt="logo" />
      </div>
      <div class="right-side">
        <ul>
          <li v-for="(item, index) in navigationPath" :key="index">
            <router-link :to="item.path" :class="{ 'login-button': item.name === 'Login' }">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Same CSS as before */
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
.right-side ul {
  display: flex;
  list-style: none;
  gap: 3rem;
  padding: 0;
  margin: 0;
}
.right-side ul li a, .right-side ul li .login-button {
  text-decoration: none;
  color: white;
  transition: background-color 0.4s ease, color 0.4s ease;
}
.right-side ul li a:hover {
  color: #eb0028;
}
.login-button {
  background-color: #eb0028;
  color: white;
  padding: 8px 50px;
  border-radius: 8px;
}
.login-button:hover {
  background-color: white;
  color: #eb0028;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  nav {
    font-size: 14px;
  }

  .logo{
    width: 120px;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
  }

  .right-side ul {
    display: flex;
    gap: 1rem;
  }

  .login-button {
    padding: 6px 20px;
    border-radius: 6px;
  }
}


</style>
