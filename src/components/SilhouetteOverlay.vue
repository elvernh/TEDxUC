<template>
  <div class="silhouette-overlay"></div>
</template>

<script lang="ts">
export default {
  name: 'SilhouetteOverlay'
}
</script>

<style scoped>
.silhouette-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(
    to bottom, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.6) 70%, 
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
  z-index: 1;
}
</style>