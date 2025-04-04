<script setup lang="ts">
import { ref } from "vue";
import pintuClose from "@/assets/images/PINTU 1.png";
import pintuOpenDikit from "@/assets/images/PINTU 2.png";
import pintuOpen from "@/assets/images/PINTU 3.png";

const tedOpen = ref(false);
const tedHover = ref(false);

const tedxOpen = ref(false);
const tedxHover = ref(false);

const tedxucsOpen = ref(false);
const tedxucsHover = ref(false);
</script>

<template>
  <div class="container">
    <h1>Learn the Difference!</h1>
    <div class="doors-container">
      <div
        class="door"
        @mouseenter="tedHover = true"
        @mouseleave="tedHover = false"
      >
        <h2 class="door-title">TED</h2>
        <div class="door-image-container">
          <img
            v-if="tedOpen"
            :src="pintuOpen"
            @click="tedOpen = false"
            class="door-img"
          />
          <img
            v-else-if="tedHover"
            :src="pintuOpenDikit"
            @click="tedOpen = true"
            class="door-img door-bounce"
          />
          <img
            v-else
            :src="pintuClose"
            @click="tedOpen = true"
            class="door-img"
          />
          <transition name="pop-up">
            <div v-if="tedOpen" class="door-content">
              <div class="content-inner">
                <p>It all started with a simple yet powerful mission: ideas worth spreading.</p>
                <p>TED (Technology, Entertainment, Design) began as a conference in 1984, bringing together visionaries to share groundbreaking ideas.</p>
                <p>Over time, it evolved into a global platform, hosting talks that challenge perspectives and ignite change in fields like science, business, education, and beyond.</p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div
        class="door"
        @mouseenter="tedxHover = true"
        @mouseleave="tedxHover = false"
      >
        <h2 class="door-title">TEDX</h2>
        <div class="door-image-container">
          <img
            v-if="tedxOpen"
            :src="pintuOpen"
            @click="tedxOpen = false"
            class="door-img"
          />
          <img
            v-else-if="tedxHover"
            :src="pintuOpenDikit"
            @click="tedxOpen = true"
            class="door-img door-bounce"
          />
          <img
            v-else
            :src="pintuClose"
            @click="tedxOpen = true"
            class="door-img"
          />
          <transition name="pop-up">
            <div v-if="tedxOpen" class="door-content">
              <div class="content-inner">
                <p>TED's influence didn't stop there.</p>
                <p>To bring its spirit of innovation to local communities, TEDx was born—independently organized events that foster dialogue, curiosity, and action.</p>
                <p>Through TEDx, people worldwide can experience the power of ideas in a setting that sparks connection and inspiration.</p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div
        class="door"
        @mouseenter="tedxucsHover = true"
        @mouseleave="tedxucsHover = false"
      >
        <h2 class="door-title">TEDXUCS</h2>
        <div class="door-image-container">
          <img
            v-if="tedxucsOpen"
            :src="pintuOpen"
            @click="tedxucsOpen = false"
            class="door-img"
          />
          <img
            v-else-if="tedxucsHover"
            :src="pintuOpenDikit"
            @click="tedxucsOpen = true"
            class="door-img door-bounce"
          />
          <img
            v-else
            :src="pintuClose"
            @click="tedxucsOpen = true"
            class="door-img"
          />
          <transition name="pop-up">
            <div v-if="tedxucsOpen" class="door-content">
              <div class="content-inner">
                <p>TEDxUniversitasCiputraSurabaya is our way of bringing this movement to our community.</p>
                <p>Hosted by Universitas Ciputra Surabaya, we unite forward-thinkers, innovators, and changemakers to explore, discuss, and shape the future.</p>
                <p>With "The Infinite Maze" as this year's theme, we invite you to navigate the twists and turns of knowledge, discovery, and endless possibilities.</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 130vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
}

h1 {
  color: white;
  font-size: 60px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.door-title {
  color: white;
  font-size: 40px;
  text-align: center;
  font-family: "Panoptica Doesburg";
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.doors-container {
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.door {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.door-image-container {
  position: relative;
  width: 350px;
  height: auto;
}

.door-img {
  position: relative;
  width: 350px;
  height: auto;
  display: block;
}

.pop-up-enter-active {
  animation: popIn 0.4s;
}

.pop-up-leave-active {
  animation: popOut 0.3s;
}

@keyframes popIn {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes popOut {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
}

.door-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 18px;
  align-content: center;
  padding: 20px;
  border-radius: 8px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  border: 1px solid rgb(255, 0, 0);
  width: 280px;
  height: 300px;
  backdrop-filter: blur(5px);
}

.content-inner {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.content-inner p {
  margin: 0;
  text-align: center;
}

.door-img {
  width: 350px;
  height: 500px;
  object-fit: contain;
}

@media (max-width: 800px) {
  .container {
    height: auto;
    padding: 20px 0;
  }

  h1 {
    font-size: 36px;
    margin-bottom: -100px;
    margin-top: 150px;
  }

  .door {
    margin-top: -30px;
  }

  .door-title {
    font-size: 32px;
    margin-bottom: 30px;
  }

  .doors-container {
    flex-direction: column;
    transform: scale(0.8);
    gap: 60px;
  }

  p{
    font-size: 18px;
  }
  .door-image-container {
    width: 350px;
  }

  .door-content {
    font-size: 16px;
    padding: 20px;
    width: 280px;
    max-height: 350px;
  }
}
</style>
