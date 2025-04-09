<script setup lang="ts">
import { defineProps } from "vue";
import backgroundImage from "@/assets/images/background-1.png";
import pintu from "@/assets/images/foottrail.png";

// Define props to accept text for the event
const props = defineProps({
  imageIcon: String,
  eventName: String,
  title: String,
  description: String,
  registerLink: String,
});

const imagePath = backgroundImage;
</script>

<template>
  <div
    class="preevent-container fade-in"
    :style="{ backgroundImage: `url('${imagePath}')` }"
  >
    <img
      :src="props.imageIcon"
      alt="Image Icon"
      class="image-icon"
      draggable="false"
    />
    <h1 class="title-text">
      <span class="event-name">{{ props.eventName }}</span
      >{{ props.title }}
    </h1>
    <p class="desc-text">
      {{ props.description }}
    </p>

    <router-link
      v-if="props.eventName !== 'PRE-EVENT 2'"
      class="register-btn"
      :to="`/register/${props.registerLink}`"
    >
      REGISTER NOW
    </router-link>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.preevent-container {
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(1.5) translateY(100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.image-icon {
  width: 300px; /* Default size */
  height: auto;
}

.event-name {
  font-size: 30px;
}

.title-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  color: white;
  font-size: 40px;
  margin-bottom: 10px;
}

.desc-text {
  color: white;
  font-size: 15px;
  max-width: 40%;
  text-align: center;
  font-family: "Inter", sans-serif;
  white-space: pre-line;
}

.register-btn {
  margin-top: 20px;
  color: white;
  background-color: red;
  padding: 1rem 1.4rem;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 800;
}

/* Responsive Styles */
@media screen and (max-width: 1024px) {
  .preevent-container {
    transform: scale(1.2) translateY(50px);
  }

  .image-icon {
    width: 250px;
  }

  h1 {
    font-size: 45px;
  }

  .desc-text {
    font-size: 14px;
    max-width: 60%;
  }

  .register-btn {
    padding: 0.8rem 1.2rem;
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .preevent-container {
    transform: scale(1) translateY(20px);
    padding: 10px;
  }

  .image-icon {
    width: 200px;
  }
  .event-name {
    font-size: 20px;
  }

  h1 {
    font-size: 35px;
  }

  .desc-text {
    font-size: 13px;
    max-width: 70%;
    margin-top: -10px;
  }

  .register-btn {
    padding: 0.7rem 1rem;
    font-size: 13px;
  }
}

@media screen and (max-width: 480px) {
  .image-icon {
    width: 150px;
  }
  .event-name {
    font-size: 20px;
  }

  h1 {
    font-size: 25px;
  }

  .desc-text {
    font-size: 12px;
    margin-top: 0;
    max-width: 80%;
  }

  .register-btn {
    padding: 0.6rem 0.9rem;
    font-size: 12px;
    margin: 0;
  }
}

.fade-in {
  animation: fadeIn 2.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
