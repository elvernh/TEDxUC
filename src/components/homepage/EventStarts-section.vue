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
        <div class="time-box">
          <div class="time">{{ days }}</div>
          <div class="label">Days</div>
        </div>
        <div class="time-box">
          <div class="time">{{ hours }}</div>
          <div class="label">Hours</div>
        </div>
        <div class="time-box">
          <div class="time">{{ minutes }}</div>
          <div class="label">Minutes</div>
        </div>
        <div class="time-box">
          <div class="time">{{ seconds }}</div>
          <div class="label">Seconds</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container */
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
  padding: 0 50px;
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

.time-container h1 {
  margin-bottom: 10px;
}


.time-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
}

/* Timer Container */
.timer {
  display: flex;
  gap: 10px;
  padding: 0 10px;
  border-radius: 12px;
}

/* Each Time Box */
/* Each Time Box */
.time-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Time Number */
.time {
  background: linear-gradient(to bottom, #eb0028 23%, #1b1b1b 100%);
  border-radius: 12px;
  padding: 20px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Shadow only here */
  min-width: 100px;
  font-family: "Axia Stencil";
  font-size: 100px;
  font-weight: 900;
  color: white;
}


/* Label */
.label {
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
  color: white;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .timer {
    flex-direction: column;
  }

  .time {
    font-size: 48px;
    padding: 20px 30px;
    min-width: 80px;
  }

  .label {
    font-size: 18px;
  }
}
</style>
