<script lang="ts">
import heroSection from "@/assets/images/background-1.png";
export default {
  data() {
    return {
      imagePath: heroSection,
    };
  },
};
</script>

<template>
  <div class="hero-container" :style="{ backgroundImage: `url('${imagePath}')` }">
    <div class="text-container">
      <h1 class="title">
        Do you see the maze as a challenge to conquer or a journey to navigate?
      </h1>
      <h2 class="subtitle">
        Every step shapes who we become, every turn unlocks new potential. At
        TEDxUniversitasCiputraSurabaya, we believe that life itself is an
        infinite maze—one that isn’t just about reaching the finish line, but
        about growing through every twist and turn. But where does the journey
        truly begin?
      </h2>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0 50px;
  box-sizing: border-box;
}

.hero-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px; /* Sesuaikan tinggi shadow */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, black 100%);
  z-index: 1; /* Harus lebih rendah dari navbar */
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  max-width: 900px;
  text-align: center; 
}

.title {
  color: white;
  font-size: 80px;
}

.subtitle{
  margin-top: -10px;
  color: white;
  font-size: 22px;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-container {
    padding: 0 20px;
  }
  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 0 10px;
  }
  .title {
    font-size: 30px;
  }
  .subtitle {
    font-size: 14px;
  }
}
</style>
