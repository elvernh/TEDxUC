<script setup lang="ts"></script>

<template>
  <div class="page-container fade-in">
    <div class="content-container">
      <div class="text-content">
        <p class="line line-1">
          The voices that will shape 
        </p>
        <p class="line line-2">
          <span class="highlight-text">The Infinite Maze</span> are almost here. 
        </p>
        <p class="line line-3">
          Who will take the stage? 
        </p>
        <p class="line line-4">
          When will each session unfold? 
        </p>
        <p class="line line-5">
          The answers are <span class="highlight-text">coming soon</span>.
        </p>
        <img class="maze-image-1" src="@/assets/images/maze 1.png" alt="maze" draggable="false">
        <img class="maze-image-2" src="@/assets/images/maze 1.png" alt="maze" draggable="false">
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.highlight-text {
  color: red;
  font-style: italic;
  font-weight: 800;
}

.content-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.text-content {
  max-width: 100%;
}

.text-content p {
  margin: 0;
  line-height: 1.3;
  color: white;
  font-family: "Inter", serif;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInText 1s forwards;
}

.line-1 {
  animation-delay: 2.5s; /* Starts after page fade-in */
}

.line-2 {
  animation-delay: 3.5s; /* Starts after page fade-in */
}

.line-3 {
  animation-delay: 4.5s; /* Starts after page fade-in */
}

.line-4 {
  animation-delay: 5.5s; /* Starts after page fade-in */
}

.line-5 {
  animation-delay: 6.5s; /* Starts after page fade-in */
}

@keyframes fadeInText {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

p {
  font-size: 6rem;
  text-align: center;
  z-index: 999;
}

.line {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 0.2rem;
}

.bold {
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.question {
  font-size: 1.3rem;
  font-style: italic;
  display: block;
  margin: 0.4rem 0;
}

.answer {
  font-size: 1.4rem;
  font-weight: 600;
  display: block;
  margin-top: 0.8rem;
}

/* Styling for the images */
.maze-image-1 {
  position: absolute;
  top: -80px;
  left: -25%;
  width: 60vw; /* Set width as percentage of the viewport width */
  height: auto;
  opacity: 35%;
}

.maze-image-2 {
  position: absolute;
  bottom: -200px;
  right: -25%;
  width: 60vw; /* Set width as percentage of the viewport width */
  height: auto;
  opacity: 35%;
}

@media (max-width: 768px) {
  .line {
    font-size: 2rem; /* Adjusted for smaller screens */
  }

  .maze-image-1{
    width: 100vw; /* Larger images on smaller screens */
    left: -50%; /* Adjust positioning */
    right: -50%;
  }
  .maze-image-2 {
    width: 100vw; /* Larger images on smaller screens */
    right: -50%;
  }
}

@media (max-width: 480px) {
  .line {
    font-size: 1.5rem; /* Adjust text size for smaller devices */
  }

  .maze-image-1,
  .maze-image-2 {
    width: 100vw; /* Even larger images on small devices */
    left: -60%; /* Adjust positioning further */
    right: -60%;
  }
}

/* Fade-in animation for the entire page */
.fade-in {
  animation: fadeInPage 2.5s ease-out;
}

@keyframes fadeInPage {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
