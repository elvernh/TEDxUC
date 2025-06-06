<script lang="ts">
import { defineComponent } from 'vue';
import heroSection from "@/assets/images/background-1.png";
import SilhouetteOverlay from '@/components/SilhouetteOverlay.vue';

export default defineComponent({
  components: {
    SilhouetteOverlay
  },
  data() {
    return {
      imagePath: heroSection,
      scrollY: 0
    };
  },
  mounted() {
    // The v-parallax directive will handle parallax internally
  }
});
</script>

<template>
  <div 
    class="hero-container" 
    :style="{ backgroundImage: `url('${imagePath}')` }"
  >
    <div class="parallax-container">
      <div class="text-container">
        <h1>
          <span class="maze-text" v-parallax="0.15">Do you see the maze </span> 
        </h1>
        <h1 
          class="title" 
          v-parallax="0.2"
        >
          As a challenge to conquer or a journey to navigate?
        </h1>
        <h2 
          class="subtitle" 
          v-parallax="0.25"
        >
          Every step shapes who we become, every turn unlocks new potential. At
          TEDxUniversitasCiputraSurabaya, we believe that life itself is an
          infinite maze—one that isn't just about reaching the finish line, but
          about growing through every twist and turn. But where does the journey
          truly begin?
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  width: 100vw;
  min-height: 100vh;  /* Allows the container to expand if needed */
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  overflow: hidden; /* Keeps background image clipping if needed */
}

.parallax-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  max-width: 900px;
  text-align: center; 
  z-index: 2;
  padding: 0 20px;
}

.maze-text{
  font-family: "Panoptica Doesburg";
  font-weight: 400;
  font-size: 50px;
  color: white;
  will-change: transform;
}

.title {
  color: white;
  font-size: 80px;
  will-change: transform;
  margin-top: -20px;
  margin-bottom: 10px;
}

.subtitle {
  margin-top: -10px;
  color: white;
  font-size: 22px;
  font-weight: 400;
  will-change: transform;
  padding: 0 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .maze-text{
    font-size: 30px;
  }
  .title { font-size: 40px; }
  .subtitle { font-size: 16px; }
}

@media (max-width: 480px) {
  .maze-text{
    font-size: 25px;
  }
  .title { font-size: 30px; }
  .subtitle { font-size: 14px; }
}
</style>