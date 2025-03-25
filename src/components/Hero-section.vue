<script lang="ts">
import heroSection from "@/assets/images/background-1.png";
export default {
    data(){
        return {
            imagePath: heroSection
        }
    }
}

</script>

<template>
  <div
    class="container"
    :style="{ backgroundImage: `url('${imagePath}')` }"
  >
  adasd
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/images/hero-section.png') no-repeat center center fixed;
}

</style>
