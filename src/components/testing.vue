<template>
  <parallax
    image-src="https://source.unsplash.com/1600x900/?forest"
    class="parallax"
  >
    <div class="content">
      <h1>Vue Parallax Library</h1>
    </div>
  </parallax>
</template>

<script>
import { Parallax } from "vue-parallax-js";

export default {
  components: {
    Parallax,
  },
};
</script>

<style scoped>
.parallax {
  height: 100vh;
}

.content {
  position: relative;
  text-align: center;
  color: white;
  font-size: 2rem;
  padding-top: 40vh;
}
</style>
