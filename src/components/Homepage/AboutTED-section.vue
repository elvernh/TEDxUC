<script lang="ts">
import { defineComponent } from "vue";
import pintuClose from "@/assets/images/PINTU 1.png";

export default defineComponent({
  setup() {
    return {
      pintuClose,
    };
  },
});
</script>

<template>
  <div class="about-container">
    <h1>Learn the Difference!</h1>
    <div class="doors-container">
      <div class="door">
        <h2 class="door-title">TED</h2>
        <img :src="pintuClose" alt="Closed Door" draggable="false"/>
      </div>
      <div class="door">
        <h2 class="door-title">TEDX</h2>
        <img :src="pintuClose" alt="Closed Door" draggable="false"/>
      </div>
      <div class="door">
        <h2 class="door-title">TEDXUCS</h2>
        <img :src="pintuClose" alt="Closed Door" draggable="false"/>
      </div>
    </div>
  </div>
</template>

<style>
.about-container {
  width: 100vw;
  height: 150vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}

h1 {
  color: white;
  font-size: 60px;
  text-align: center;
}

.door-title{
  color: white;
  font-size: 60px;
  text-align: center;
  font-family: "Panoptica Doesburg";
}

.doors-container {
  display: flex;
  gap: 20px;
}

.door {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.door img {
  width: 350px; /* Adjust as needed */
  height: auto;
}
</style>
