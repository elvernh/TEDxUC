<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import mazeSection from "@/assets/images/mazeSection.png";

// Set the target date (YYYY-MM-DDTHH:MM:SS format)
const targetDate = new Date("2025-05-11T00:00:00").getTime();
const days = ref("00");
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");

let timer: number | undefined;

const updateTimer = () => {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    days.value = "00";
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
    clearInterval(timer);
    return;
  }

  days.value = String(Math.floor(timeLeft / (1000 * 60 * 60 * 24))).padStart(
    2,
    "0"
  );
  hours.value = String(
    Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");
  minutes.value = String(
    Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  seconds.value = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );
};

onMounted(() => {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div
    class="maze-container"
    :style="{ backgroundImage: `url('${mazeSection}')` }"
  >
    <div class="time-container">
      <h1>EVENT STARTS IN</h1>
      <div class="timer">
        <div class="time-box" v-for="(value, label) in { days, hours, minutes, seconds }" :key="label">
          <div class="time">{{ value }}</div>
          <div class="label">{{ label.charAt(0).toUpperCase() + label.slice(1) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.maze-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  position: relative;
}
.maze-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px; /* Sesuaikan tinggi shadow */
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, black 100%);
  z-index: 1; /* Harus lebih rendah dari navbar */
}

.maze-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px; /* Sesuaikan tinggi shadow */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000 100%);
  pointer-events: none; /* Supaya tidak mengganggu interaksi */
}

.time-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
}

.timer {
  display: flex;
  gap: 10px;
  padding: 0 10px;
  border-radius: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.time-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time {
  background: linear-gradient(to bottom, #eb0028 23%, #1b1b1b 100%);
  border-radius: 12px;
  padding: 20px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  min-width: 100px;
  font-family: "Axia Stencil";
  font-size: 100px;
  font-weight: 900;
  color: white;
}
.time-container h1 {
  margin-bottom: 10px;
}
.label {
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
  color: white;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .time-container {
    font-size: 24px;
  }

  .timer {
    max-width: 80%;
    gap: 5px;
  }

  .time {
    font-size: 48px;
    /* padding: 15px 20px; */
    min-width: 60px;
  }

  .label {
    font-size: 18px;
  }
}
</style>
