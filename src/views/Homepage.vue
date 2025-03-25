<script setup lang="ts">
import Nav from "@/components/NavBar.vue";
import HeroSection from "@/components/homepage/Hero-section.vue";
import EventStarts from "@/components/homepage/EventStarts-section.vue"
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";

// Get the current route
const route = useRoute();
</script>

<template>
  <div class="homepage-container">
    <HeroSection />
    <EventStarts/>
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


</style>
