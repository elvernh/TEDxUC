<script setup lang="ts">
import logo from "@/components/icons/logo-white.svg";
</script>

<template>
  <nav>
    <div class="container">
      <div class="left-side">
        <img :src="logo" alt="logo" />
      </div>
      <div class="right-side">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Buy Ticket</a>
          </li>
          <li>
            <a href="#">Gallery</a>
          </li>
          <li>
            <a href="#">Mini Game</a>
          </li>
          <li>
            <a href="#" class="login-button">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Full-width nav with background */
nav {
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.81) 13%, rgba(0, 0, 0, 0) 100%);
  position: fixed;
  font-weight: 900;
  font-size: 19px;
}


.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 2rem;
}

/* Right side list styling */
.right-side ul {
  display: flex;
  list-style: none;
  gap: 3rem;
  padding: 0;
  margin: 0;
}

/* Apply the same transition to all links, including the login button */
.right-side ul li a {
  text-decoration: none;
  color: white;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.right-side ul li a:hover {
  color: #EB0028;
}

/* Login button inherits the same animation */
.login-button {
  background-color: #EB0028;
  color: white;
  padding: 8px 50px;
  border-radius: 8px;
}
.login-button:hover {
  background-color: white;
  color: #EB0028;
}


</style>
