<script setup lang="ts">
import Homepage from "@/views/Homepage.vue";
import Nav from "@/components/NavBar.vue";
import footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <Nav v-if="route.path !== '/login' && route.path !== '/buy-ticket' && route.path !== '/payment-method' && route.path !== '/confirmation-page'"/>>
  <router-view />
  <Footer v-if="route.path !== '/login' && route.path !== '/buy-ticket' && route.path !== '/payment-method' && route.path !== '/confirmation-page'"/>
  <BuyTicket v-if=" ['/login', '/buy-ticket'].includes(route.path)" ></BuyTicket>"
</template>
