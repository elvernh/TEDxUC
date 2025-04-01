<script setup lang="ts">
import preEventTemplate from "@/components/PreEvent-template.vue";
import door from "@/assets/images/doorWalk.png"

</script>
<template>
  <preEventTemplate
  :imageIcon="door"
    eventName="PRE-EVENT 3"
    title="Almost There!"
    description="You’ve journeyed this far, but the best is yet to come. Our final pre-event is your last chance to prepare before the main event. Are you ready for the big reveal?"
    registerLink="preevent3"
  />
</template>
