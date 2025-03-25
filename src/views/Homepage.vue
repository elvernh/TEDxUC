<script setup lang="ts">
import Nav from "@/components/NavBar.vue";
import HeroSection from "@/components/Hero-section.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";

// Get the current route
const route = useRoute();
</script>

<template>
  <div class="container">
    <!-- <HeroSection /> -->
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
