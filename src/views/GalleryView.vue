// src/views/GalleryView.vue
<template>
  <div class="gallery-view">
    <!-- Carousel Gallery -->
    <div class="carousel-container">
      <div class="carousel">
        <div 
          v-for="(image, index) in galleryImages" 
          :key="index" 
          class="carousel-slide"
          :class="{ active: index === activeIndex }"
          @click="openLightbox(image)"
        >
          <img :src="image.src" :alt="image.title">
          <div class="slide-info">
            <h3>{{ image.title }}</h3>
            <p>{{ image.category }}</p>
          </div>
        </div>
      </div>
      
      <div class="carousel-controls">
        <button class="control-btn prev" @click="prevSlide">&lt;</button>
        <div class="carousel-indicators">
          <span 
            v-for="(image, index) in galleryImages" 
            :key="index"
            class="indicator"
            :class="{ active: index === activeIndex }"
            @click="setActiveSlide(index)"
          ></span>
        </div>
        <button class="control-btn next" @click="nextSlide">&gt;</button>
      </div>
    </div>
    
    <div class="gallery-title">
      <h2>{{ activeCategory }}</h2>
      <p>Photography</p>
    </div>
    
    <!-- Lightbox Modal -->
    <div class="lightbox" v-if="lightboxActive" @click="closeLightbox">
      <button class="close-btn" @click.stop="closeLightbox">&times;</button>
      <div class="lightbox-content" @click.stop>
        <img :src="activeImage.src" :alt="activeImage.title">
        <div class="lightbox-details">
          <h3>{{ activeImage.title }}</h3>
          <p>{{ activeImage.category }}</p>
        </div>
      </div>
      <button class="nav-btn prev" @click.stop="prevImage">&lt;</button>
      <button class="nav-btn next" @click.stop="nextImage">&gt;</button>
    </div>
  </div>
</template>

<script>
import GalleryItem from '../components/GalleryItem.vue'
// Import your images here
 import prevenetday1_1 from '@/assets/pre-event_day1/DSC01991.jpg'
 import prevenetday1_2 from '@/assets/pre-event_day1/DSC01996.jpg'
  import prevenetday1_3 from '@/assets/pre-event_day1/DSC09944.jpg'
  import prevenetday2_1 from '@/assets/pre-event_day2/DSC00124.jpg'
  import prevenetday2_2 from '@/assets/pre-event_day2/DSC00126.jpg'
  import prevenetday2_3 from '@/assets/pre-event_day2/DSC00130.jpg'
  import prevenetday3_1 from '@/assets/pre-event_day3/Copy of DSC03070.jpg'
  import prevenetday3_2 from '@/assets/pre-event_day3/DSC02952.jpg'
  import prevenetday3_3 from '@/assets/pre-event_day3/DSC02964.jpg'


// Add more imports as needed

export default {
  name: 'GalleryView',
  components: {
    GalleryItem
  },
  data() {
    return {
      activeCategory: 'Nature',
      lightboxActive: false,
      activeImageIndex: 0,
      activeIndex: 0,
      autoplayInterval: null,
      galleryImages: [
        { 
          // Replace with your actual image paths
          src: prevenetday1_2, 
          title: 'Talkshow', 
          category: 'Pre-event day 1'
        },
        { 
          src: prevenetday1_3, 
          title: 'Foto Juri', 
          category: 'Pre-event day 1'
        },
        { 
          src: prevenetday1_1, 
          title: 'Sign up', 
          category: 'Pre-event day 1'
        },
        { 
          src: prevenetday2_1, 
          title: 'pre-event marketing part 1', 
          category: 'Pre-event day 2'
        },
        { 
          src: prevenetday2_2, 
          title: 'pre-event marketing part 2', 
          category: 'Pre-event day 2'
        },
        { 
          src: prevenetday2_3, 
          title: 'pre-event marketing part 3', 
          category: 'Pre-event day 2'
        },
        { 
          src: prevenetday3_1, 
          title: 'salam-E', 
          category: 'Pre-event day 3'
        },
        { 
          src: prevenetday3_3, 
          title: 'talkshow', 
          category: 'Pre-event day 3'
        },
        { 
          src: prevenetday3_2, 
          title: 'puzzle', 
          category: 'Pre-event day 3'
        },
      ]
    }
  },
  computed: {
    activeImage() {
      return this.galleryImages[this.activeImageIndex]
    }
  },
  methods: {
    // Carousel methods
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.galleryImages.length;
      this.resetAutoplay();
    },
    prevSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
      this.resetAutoplay();
    },
    setActiveSlide(index) {
      this.activeIndex = index;
      this.resetAutoplay();
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 3000); // Change image every 3 seconds
    },
    resetAutoplay() {
      clearInterval(this.autoplayInterval);
      this.startAutoplay();
    },
    
    // Lightbox methods
    openLightbox(image) {
      this.activeImageIndex = this.galleryImages.findIndex(img => img.src === image.src);
      this.lightboxActive = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
      clearInterval(this.autoplayInterval); // Pause autoplay when lightbox is open
    },
    closeLightbox() {
      this.lightboxActive = false;
      document.body.style.overflow = ''; // Restore scrolling
      this.startAutoplay(); // Resume autoplay when lightbox is closed
    },
    nextImage() {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.galleryImages.length;
    },
    prevImage() {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    }
  },
  mounted() {
    // Start autoplay
    this.startAutoplay();
    
    // Add keyboard navigation for lightbox
    window.addEventListener('keydown', (e) => {
      if (!this.lightboxActive) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === 'ArrowLeft') this.prevImage();
    });
  },
  beforeUnmount() {
    // Clean up
    clearInterval(this.autoplayInterval);
    window.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = ''; // Ensure scrolling is restored
  }
}
</script>

<style scoped>
.gallery-view {
  padding: 20px 0;
  background-color: #1a1a1a;
  min-height: 100vh;
  color: #f1f1f1;
}

/* Carousel Styles */
.carousel-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  padding-top: 60px;
}

.carousel {
  position: relative;
  height: 600px;
  margin: 0 auto;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.carousel-slide.active {
  opacity: 1;
  z-index: 1;
}

.carousel-slide img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.slide-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  text-align: center;
}

.slide-info h3 {
  margin-bottom: 5px;
  font-size: 18px;
  color: #ff3333;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.control-btn {
  background: rgba(255, 51, 51, 0.2);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  margin: 0 10px;
}

.control-btn:hover {
  background: rgba(255, 51, 51, 0.5);
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #666;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.indicator.active {
  background-color: #ff3333;
  transform: scale(1.2);
}

.gallery-title {
  text-align: center;
  margin: 50px 0;
}

.gallery-title h2 {
  font-size: 28px;
  margin-bottom: 5px;
  color: #ff3333;
}

.gallery-title p {
  color: #999;
  font-size: 16px;
}

/* Lightbox Styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  max-width: 80%;
  max-height: 80%;
  position: relative;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-details {
  color: white;
  text-align: center;
  margin-top: 20px;
}

.lightbox-details h3 {
  color: #ff3333;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 51, 51, 0.2);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.nav-btn:hover {
  background: rgba(255, 51, 51, 0.5);
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

@media (max-width: 768px) {
  .carousel {
    height: 400px;
  }
  
  .lightbox-content {
    max-width: 95%;
  }
  
  .nav-btn, .control-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>