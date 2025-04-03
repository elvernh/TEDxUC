<script lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const countdown = ref(8);

    onMounted(() => {
      const timer = setInterval(() => {
        countdown.value--;

        if (countdown.value <= 0) {
          clearInterval(timer);
          router.push("/");
        }
      }, 1000);
    });

    return {
      countdown,
    };
  },
};
</script>

<template>
  <div class="layout-container">
    <div class="container">
      <img class="logo" src="/src/components/icons/logo-white.svg" alt="logo" />
      <h1 class="title">Order Confirmed!</h1>
    
      <div class="confirmation-details">
        <p>Thank you for your order!</p>
        <p>Your e-ticket will be sent to your email</p>
        <p>You will be redirected to the home page now</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; 
  color: white; 
  padding: 20px;
  position: relative;
  box-sizing: border-box;
}

.layout-container::before {
  content: none;
}

.logo {
  position: fixed;
  top: 2rem;
  left: 3rem;
  width: 177px;
  z-index: 100;
}

.title {
  color: white; 
  font-size: 70px;
  margin-bottom: 15px;
  text-align: center;
}

.container {
  width: 600px;
  border-radius: 8px;
  padding: 40px;
  background-color: rgba(20, 20, 20, 0.9); 
  z-index: 2;
}

.confirmation-details {
  background: rgba(0, 0, 0, 0.4); 
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;
  text-align: center; 
}

.confirmation-details p {
  margin-bottom: 10px;
  line-height: 1.6;
  color: white;
  font-size: 18px;
}


</style>