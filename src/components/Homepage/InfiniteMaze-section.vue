<script setup lang="ts">
import sideImage from "@/assets/images/x.png";

const sideImagePath = sideImage;
</script>

<template>
  <div class="layout-container">
    <div class="side-image">
      <img :src="sideImagePath" class="image" draggable="false" />
    </div>
    <div class="text-container">
      <h1 class="title">THE INFINITE MAZE</h1>
      <h2 class="subtitle">
        Life is a labyrinth with winding paths, filled with ups and downs. Every
        turn presents a new challenge, every step a new lesson. To navigate this
        maze, we must embrace the journey—gathering skills, unlocking potential,
        and seeking the way forward.
        <br />
        <br />
        At TEDxUniversitasCiputraSurabaya, we invite you to explore this
        intricate path. The Infinite Maze is not just about reaching the finish
        line; it’s about the process of discovery, resilience, and growth. Join
        us as we uncover the insights that shape our journey and
        illuminate the way ahead.
      </h2>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: black;
  padding: 50px 50px;
  box-sizing: border-box;
}

.layout-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px; /* Sesuaikan tinggi shadow */
  z-index: 1; /* Harus lebih rendah dari navbar */
}

.image {
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
}

.text-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 900px;
}

.title {
  color: white;
  font-size: min(100px, 8vw);
  font-size: 100px;
  margin-bottom: 15px;
  margin-top: 10px;
}

.subtitle {
  color: white;
  font-size: 28px;
  font-weight: 200;
  text-align-last: left;
  margin-top: 10px;
  text-align: justify;
}

@media (max-width: 1200px) {
  .layout-container {
    padding: 50px 50px;
  }
  .title {
    font-size: 80px;
  }
  .subtitle {
    font-size: 24px;
  }
}

@media (max-width: 992px) {
  .layout-container {
    padding: 50px 50px;
  }
  .title {
    font-size: 60px;
  }
  .subtitle {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
    padding: 50px 40px;
    gap: 30px;
  }
  .text-container {
    order: 1;
  }
  .side-image {
    order: 2;
  }
  .title {
    font-size: 60px;
    text-align: center;
  }
  .subtitle {
    font-size: 20px;
    text-align: left;
  }
}

@media (max-width: 590px) {
  .layout-container {
    padding: 40px 30px;
  }
  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .layout-container {
    padding: 30px 20px;
  }
  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 15px;
    text-align-last: center;
  }
}
</style>
