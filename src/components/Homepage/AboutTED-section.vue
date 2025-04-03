<script lang="ts">
import { defineComponent, ref } from "vue";
import pintuClose from "@/assets/images/PINTU 1.png";
import pintuOpenDikit from "@/assets/images/PINTU 2.png";
import pintuOpen from "@/assets/images/PINTU 3.png";

export default defineComponent({
  setup() {
    const tedOpen = ref(false);
    const tedHover = ref(false);

    const tedxOpen = ref(false);
    const tedxHover = ref(false);

    const tedxucsOpen = ref(false);
    const tedxucsHover = ref(false);

    return {
      tedOpen,
      tedHover,
      tedxOpen,
      tedxHover,
      tedxucsOpen,
      tedxucsHover,
      pintuClose,
      pintuOpenDikit,
      pintuOpen,
    };
  },
});
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
            class="door-img"
          />
          <img
            v-else
            :src="pintuClose"
            @click="tedOpen = true"
            class="door-img"
          />
          <div class="door-content" v-if="tedOpen">
            It all started with a simple yet powerful mission: ideas worth
            spreading. TED (Technology, Entertainment, Design) began as a
            conference in 1984, bringing together visionaries to share
            groundbreaking ideas. Over time, it evolved into a global platform,
            hosting talks that challenge perspectives and ignite change in
            fields like science, business, education, and beyond.
          </div>
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
            class="door-img"
          />
          <img
            v-else
            :src="pintuClose"
            @click="tedxOpen = true"
            class="door-img"
          />
          <div class="door-content" v-if="tedxOpen">
            TED’s influence didn’t stop there. To bring its spirit of innovation
            to local communities, TEDx was born—independently organized events
            that foster dialogue, curiosity, and action. Through TEDx, people
            worldwide can experience the power of ideas in a setting that sparks
            connection and inspiration.
          </div>
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
            class="door-img"
          />
          <img
            v-else
            :src="pintuClose"
            @click="tedxucsOpen = true"
            class="door-img"
          />
          <div class="door-content" v-if="tedxucsOpen">
            TEDxUniversitasCiputraSurabaya is our way of bringing this movement
            to our community. Hosted by Universitas Ciputra Surabaya, we unite
            forward-thinkers, innovators, and changemakers to explore, discuss,
            and shape the future. With “The Infinite Maze" as this year’s theme,
            we invite you to navigate the twists and turns of knowledge,
            discovery, and endless possibilities.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  width: 100vw;
  height: 150vh;
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
}

.door-title {
  color: white;
  font-size: 40px;
  text-align: center;
  font-family: "Panoptica Doesburg";
  margin-bottom: 20px;
}

.doors-container {
  display: flex;
  gap: 150px;
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
  height: 500px;
}

.door-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

.door-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 20px;
  transform: translate(-160px, -150px);
  background: linear-gradient(rgba(255, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  border-radius: 10px;
  z-index: 2;
}

.door-img {
  width: 350px;
  height: 500px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .container {
    height: auto;
    padding: 20px 0;
  }

  h1 {
    font-size: 40px;
    margin-bottom: 20px;
    margin-top: 50px;
  }

  .door-title {
    font-size: 30px;
  }

  .doors-container {
    flex-direction: column;
    gap: 150px;
    transform: scale(0.8);
    
  }

  .door-image-container {
    width: 280px;
    height: 400px;
  }

  .door-content {
    font-size: 16px;
    padding: 15px;
    
  transform: translate(-150px, -70px);
  }
}
</style>
