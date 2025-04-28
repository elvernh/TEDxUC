<template>
    <div class="gallery-item" @click="openGallery">
      <img :src="image.src" :alt="image.title">
      <div class="overlay">
        <h3>{{ image.title }}</h3>
        <p>{{ image.category }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GalleryItem',
    props: {
      image: {
        type: Object,
        required: true
      }
    },
    methods: {
      openGallery() {
        this.$emit('open-gallery', this.image)
      }
    }
  }
  </script>
  
  <style scoped>
  .gallery-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    height: 300px;
    border: 2px solid #2a2a2a;
    transition: border-color 0.3s ease;
  }
  
  .gallery-item:hover {
    border-color: #ff3333;
  }
  
  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .gallery-item:hover img {
    transform: scale(1.05);
  }
  
  .overlay {
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    transition: bottom 0.3s ease;
  }
  
  .gallery-item:hover .overlay {
    bottom: 0;
  }
  
  .overlay h3 {
    margin-bottom: 5px;
    font-size: 18px;
    color: #ff3333;
  }
  
  .overlay p {
    font-size: 14px;
    opacity: 0.8;
  }
  </style>