<script setup lang="ts">
import Homepage from "@/views/Homepage.vue";
import Nav from "@/components/NavBar.vue";
import footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>

  <Nav v-if="route.path !== '/login'" />
  <router-view></router-view>
  <Footer/>
</template>
