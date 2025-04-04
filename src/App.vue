<script setup lang="ts">
import Homepage from "@/views/Homepage.vue";
import Nav from "@/components/NavBar.vue";
import AdminNav from "@/components/NavBarAdmin.vue";
import footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isLoggedIn = computed(() => !!localStorage.getItem("token"));
</script>

<template>
<component :is="isLoggedIn ? AdminNav : Nav" 
    v-if="!['/login', '/buy-ticket', '/payment-method', '/confirmation-page'].includes(route.path)" />
  <router-view />
  <Footer v-if="route.path !== '/login' && route.path !== '/buy-ticket' && route.path !== '/payment-method' && route.path !== '/confirmation-page'"/>
  <BuyTicket v-if=" ['/login', '/buy-ticket'].includes(route.path)" ></BuyTicket>"
</template>
