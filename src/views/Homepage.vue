<script setup lang="ts">
import Nav from "@/components/NavBar.vue";
import HeroSection from "@/components/homepage/Hero-section.vue";
import AboutPage from "@/components/homepage/AboutTED-section.vue";
import EventStarts from "@/components/homepage/EventStarts-section.vue"
import InfiniteMaze from "@/components/homepage/InfiniteMaze-section.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";

// Get the current route
const route = useRoute();
</script>

<template>
  <div class="homepage-container fade-in">
    <HeroSection />
    <AboutPage />
    <EventStarts/>
    <InfiniteMaze/>
    <Footer/>
  </div>

</template>

<style scoped>
.homepage-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
