<script setup lang="ts"></script>

<template>
  <div class="error-container fade-in">
    <div class="error-content">
      <p class="error-line error-1">
        Oops! Something went wrong.
      </p>
      <p class="error-line error-2">
        The page you’re looking for <span class="highlight-text">does not exist</span>.
      </p>
      <p class="error-line error-3">
        Let’s get you back on track.
      </p>
      <p class="error-line error-4">
        <router-link to="/" class="error-link">Go to Homepage</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a;
  text-align: center;
}

.error-content {
  max-width: 80%;
}

.error-line {
  color: white;
  font-family: "Inter", sans-serif;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInText 1s forwards;
}

.error-1 {
  animation-delay: 1s;
  font-size: 2rem;
  font-weight: bold;
}

.error-2 {
  animation-delay: 2s;
  font-size: 1.5rem;
}

.error-3 {
  animation-delay: 3s;
  font-size: 1.3rem;
  font-style: italic;
}

.error-4 {
  animation-delay: 4s;
  font-size: 1.2rem;
}

.error-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 10px 20px;
  color: white;
  background: red;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
}
.highlight-text{
    color: red;
    font-weight: 600;
}

.error-link:hover {
  background: darkred;
}

/* Fade-in animation */
@keyframes fadeInText {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInPage 2s ease-out;
}

@keyframes fadeInPage {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
