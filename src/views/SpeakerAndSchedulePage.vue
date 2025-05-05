<template>
  <div class="speaker-schedule">
    <div class="header">
      <div class="tedx-logo"></div>
      <div class="title-container">
        <p class="title">SPEAKER<br />SCHEDULE</p>
        <div class="triangle-marker"></div>
      </div>
      <p class="subtitle">
        The voices that will shape The Infinite Maze are almost here. Who will
        take the stage? When will each session unfold? The answers are coming
        soon.
      </p>
    </div>

    <div class="date-display">11.05.2025</div>

    <div class="timeline">
      <div
        v-for="(speaker, index) in speakers"
        :key="index"
        class="speaker-item"
      >
        <div class="timeline-line"></div>
        <div class="speaker-circle" :class="{ active: index === activeIndex }">
          <div class="speaker-image">
            <img
              :src="speaker.image || '/api/placeholder/120/120'"
              :alt="`Photo of ${speaker.name}`"
            />
          </div>
        </div>
        <div class="speaker-time">
          {{ speaker.time
          }}<span class="time-format">{{ speaker.timeFormat }}</span>
        </div>
        <div class="content-wrapper">
          <div class="speaker-info">
            <h2 class="speaker-name">{{ speaker.name }}</h2>
            <p class="speaker-description">
              {{
                speaker.description ||
                "The voices that will shape The Infinite Maze are almost here. Who will take the stage? When will each session unfold? The answers are coming soon."
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wilson from "@/assets/pembicara/WILSON DAVID MULYA HUANG_SELF DEVELOPMENT.jpg";
import holly from "@/assets/pembicara/Holly Natasha_Entrepreneurship.jpg";
import evy from "@/assets/pembicara/EVELYN HUTANI_COMEDY.png";
import kukuh from "@/assets/pembicara/R Kukuh_Technology.png";
import maxi from "@/assets/pembicara/maxi.jpeg";
import mario from "@/assets/pembicara/Mario Oswin_Culinary.jpg";
import dany from "@/assets/pembicara/Danyannisa_Music.jpg";

export default {
  name: "SpeakerAndSchedulePage",
  data() {
    return {
      currentDate: new Date(2025, 3, 12), // April 12, 2025
      activeIndex: 0,
      speakers: [
      {
          name: "Wilson David Mulya H.",
          image: wilson, // Using placeholder images
          date: new Date(2025, 3, 12),
          time: "11:50-12:10",
          timeFormat: "PM",
          description: "Self Development - Passion is Overrated",
        },
        {
          name: "Holly Natasha",
          image: holly,
          date: new Date(2025, 3, 12),
          time: "12:10-12:30",
          timeFormat: "PM",
          description: "Entrepreneur - How To Build a Business Without Knowing What You're Doing",
        },
        {
          name: "Evelyn Hutani",
          image: evy,
          date: new Date(2025, 3, 12),
          time: "12:30-12:50",
          timeFormat: "PM",
          description: "Comedy - I Failed, I Fell, and Then I Laughed",
        },
        {
          name: "R. Kukuh Rahadiansyah",
          image: kukuh,
          date: new Date(2025, 3, 12),
          time: "14:27-14:45",
          timeFormat: "PM",
          description: "Technology - Survival Guide to AI Wonderland",
        },
        {
          name: "Maximilian John",
          image: maxi,
          date: new Date(2025, 3, 12),
          time: "14:40-15:00",
          timeFormat: "PM",
          description: "Photography - Urban Kaleidoscope: Patterns & Perspective",
        },
        {
          name: "Mario Oswin",
          image: mario,
          date: new Date(2025, 3, 12),
          time: "15:00-15:20",
          timeFormat: "PM",
          description: "Culinary - Culinary Journeys Food as a Map Through Cultural Labyrinths",
        },
        {
          name: "Danyannisa",
          image: dany,
          date: new Date(2025, 3, 12),
          time: "15:20-15:40",
          timeFormat: "PM",
          description: "Music - The Art of Song Construction: Navigating the Technical Maze of Music Creation",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
  mounted() {
  // Create the observer instance
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the fly-in class when the item is visible in the viewport
          entry.target.classList.add("fly-in");
        } else {
          // Remove the fly-in class when the item is not visible in the viewport
          entry.target.classList.remove("fly-in");
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the item is visible
    }
  );

  // Select and observe all speaker items
  const speakerItems = document.querySelectorAll(".speaker-item");
  speakerItems.forEach((item) => {
    observer.observe(item); // Start observing each speaker item
  });

  // Automatic cycling through speakers
  this.intervalId = setInterval(() => {
    this.activeIndex = (this.activeIndex + 1) % this.speakers.length;
  }, 3000);
},


  beforeUnmount() {
    clearInterval(this.intervalId); // Clear the interval when the component is destroyed
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.speaker-schedule {
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Add style for the navigation */
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 100px 0 0 0;
}

.tedx-logo {
  position: absolute;
  top: 0;
  left: 2rem;
  z-index: 10;
}

.navigation {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 1rem 2rem;
  margin-bottom: 4rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-left: 2rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-link.active {
  color: white;
  font-weight: bold;
  border-bottom: 2px solid white;
}

.time-format {
  font-size: 1.5rem;
  margin-left: 0.2rem;
  vertical-align: super;
  font-weight: normal;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  width: 100%;
}

.title-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
  background-color: #000000; /* Darker background */
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0 auto 2rem;
  max-width: 600px;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 5px;
  line-height: 1.1;
  position: relative;
  z-index: 1;
  color: #ddd;
  /* Create the stencil-like look */
  text-shadow: none;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
}

/* Red triangle marker positioned similar to image 2 */
.triangle-marker {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid #ff0000;
  position: absolute;
  left: 40%; /* Position more central */
  top: 40%; /* Position it vertically slightly above the center */
  transform: rotate(45deg); /* Rotate to match orientation */
  z-index: 10; /* Higher z-index to be above everything */
}

.subtitle {
  max-width: 600px;
  margin: 0 auto;
  color: #aaa;
  font-size: 1.2rem;
  line-height: 1.5;
}

.date-display {
  font-size: 1.8rem;
  letter-spacing: 8px;
  margin-bottom: 3rem;
  padding: 0.5rem 0;
  width: 80%;
  text-align: center;
  font-family: monospace;
  position: relative;
}

.date-display::before,
.date-display::after {
  content: "";
  position: absolute;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 25%;
  top: 50%;
}

.date-display::before {
  left: 0;
}

.date-display::after {
  right: 0;
}

/* Timeline container */
.timeline {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1200px;
}

/* Main vertical timeline line */
.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 8px;
  background-color: #ff0000;
  transform: translateX(-50%);
  z-index: 0;
}

.speaker-item {
  display: flex;
  width: 100%;
  margin-bottom: 30rem; /* Even more space between items */
  position: relative;
  align-items: center;
  min-height: 180px; /* Taller to allow more vertical spacing */
}

/* Individual vertical timeline segment for each speaker */
.timeline-line {
  position: relative; /* Changed to relative positioning */
  height: 500%; /* Use the height of the parent item */
  left: 50%;
  width: 4px;
  background-color: #ff0000;
  transform: translateX(-50%);
  z-index: 0;
}

.speaker-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: transparent;
  border: 3px solid white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 100px rgba(255, 255, 255, 0.7);
  overflow: hidden;
}

.speaker-circle.active {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.7);
}

.speaker-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 0.8rem;
}

.speaker-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: grayscale(100%);
}

.speaker-time {
  position: absolute;
  left: 80px;
  font-size: 4rem; /* Much larger font size for time as in image 2 */
  font-weight: bold;
  color: white;
  z-index: 3;
}

.content-wrapper {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  right: 0;
  padding-left: 70%;
}

.speaker-info {
  flex-grow: 1;
  padding: 0 1rem;
}

.speaker-name {
  font-size: 1.4rem; /* Larger font size as in image 3 */
  margin-bottom: 0.8rem;
  font-weight: bold;
}

.speaker-description {
  font-size: 1.5rem;
  color: #aaa;
  line-height: 1.4;
  text-align: right;
}

/* Fixed layout with time on left, content on right */
.speaker-item .speaker-time {
  left: 80px;
  margin-left: 0;
  text-align: left;
}

.speaker-item .content-wrapper {
  right: 80px;
  text-align: right;
  justify-content: flex-end;
}

/* Responsive styles */
@media (max-width: 992px) {
  .title {
    font-size: 3rem;
  }

  .tedx-logo {
    position: static;
    margin-bottom: 1rem;
  }

  .navigation {
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-link {
    margin: 0.5rem;
  }

  .speaker-time {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .speaker-time {
    font-size: 2rem;
  }

  .content-wrapper {
    width: 100%;
    position: relative;
    right: auto;
    margin-top: 180px;
    text-align: center;
    justify-content: center;
  }

  .speaker-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 6rem;
  }
}

@media (max-width: 576px) {
  .speaker-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
    position: relative;
  }

  .speaker-circle {
    position: static; /* Remove absolute positioning */
    margin-bottom: 1rem;
    width: 150px;
    height: 150px;
    left: auto;
    transform: none;
  }

  .speaker-time {
    position: static; /* Remove absolute positioning */
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: white;
  }

  .content-wrapper {
    position: static;
    width: 100%;
    padding: 0 1.5rem;
    text-align: center;
    margin-top: 0;
    margin-bottom: 100px;
  }

  .speaker-description {
    font-size: 1.2rem;
    text-align: center;
  }

  .speaker-name {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .time-format {
    font-size: 1rem;
  }
}

@keyframes fly-in {
  0% {
    transform: translateY(50%); /* Start from the left off-screen */
    opacity: 0;
  }
  100% {
    transform: translateY(0); /* End at its normal position */
    opacity: 1;
  }
}

.speaker-item {
  transition: transform 0.7s ease-out, opacity 0.7s ease-out;
  opacity: 0;
  transform: translateY(50%);
}

.speaker-item.fly-in {
  animation: fly-in 0.7s ease-out forwards;
  opacity: 1;
  transform: translateY(0);
}
</style>
