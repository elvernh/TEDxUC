<script setup lang="ts">
import Nav from "@/components/NavBar.vue";
import HeroSection from "@/components/Homepage/Hero-section.vue";
import AboutPage from "@/components/Homepage/AboutTED-section.vue";
import EventStarts from "@/components/Homepage/EventStarts-section.vue"
import InfiniteMaze from "@/components/Homepage/InfiniteMaze-section.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";

// Get the current route
const route = useRoute();

// Set up parallax effect for the entire page
const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="homepage-container fade-in">
    <HeroSection />
    <AboutPage />
    <EventStarts />
    <InfiniteMaze />
    <Footer />
  </div>
</template>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Allows page to expand */
  overflow-x: hidden;
  perspective: 1px;
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