<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import pacmanImage from "@/assets/images/pacmanChara.png";

const GRID_SIZE = 15;
const CELL_SIZE = 800 / GRID_SIZE;
const BASE_SPEED = 250;
const GAME_SIZE = { width: 800, height: 800 };
const CHARACTER_SIZE = CELL_SIZE * 0.8;
const MAX_HIGH_SCORES = 5;
const GHOST_SPEED_INCREASE = 1; 

const gridPosition = ref({ x: 7, y: 9 });
const nextDirection = ref<Direction>("none");
const isMoving = ref(false);
const level = ref(1); 

type Position = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right" | "none";
type Ghost = {
  position: Position;
  gridPosition: Position;
  color: string;
  speed: number;
  direction: Direction;
  nextDirection: Direction;
  isMoving: boolean;
};

const position = ref<Position>({ x: 200, y: 200 });
const direction = ref<Direction>("none");
const score = ref(0);
const gameStarted = ref(false);
const gameOver = ref(false);
const ghosts = ref<Ghost[]>([]);
const showGame = ref(false);
// const powerPelletActive = ref(false);

const COLLISION_PADDING = 5;
let lastTime = 0;
// Game layout (0 = empty, 1 = wall, 2 = food, 3 = power pellet, 4 = ghost lair)
const gameLayout = ref([
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1,
  1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1,
  1, 1, 1, 2, 1, 1, 4, 4, 4, 1, 1, 2, 1, 1, 1,
  0, 0, 0, 2, 2, 2, 4, 4, 4, 2, 0, 2, 0, 0, 0,
  1, 1, 1, 2, 1, 2, 4, 4, 4, 2, 1, 2, 1, 1, 1,
  1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1,
  1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1,
  1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]);

let animationId: number | null = null;

const canMove = (gridX: number, gridY: number): boolean => {
  if (
    (gridY === 7 || gridY === 8 || gridY === 9) &&
    (gridX < 0 || gridX >= GRID_SIZE)
  ) {
    return true;
  }

  return (
    gridX >= 0 &&
    gridX < GRID_SIZE &&
    gridY >= 0 &&
    gridY < GRID_SIZE &&
    gameLayout.value[gridY * GRID_SIZE + gridX] !== 1
  );
};

const canGhostMove = (gridX: number, gridY: number): boolean => {
  if (gridX < 0 || gridX >= GRID_SIZE || gridY < 0 || gridY >= GRID_SIZE) {
    return false;
  }

  if ((gridY === 7 || gridY === 8) && (gridX <= 2 || gridX >= 12)) {
    return false;
  }

  return gameLayout.value[gridY * GRID_SIZE + gridX] !== 1;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!gameStarted.value || gameOver.value) return;

  switch (event.key) {
    case "ArrowUp":
      direction.value = "up";
      break;
    case "ArrowDown":
      direction.value = "down";
      break;
    case "ArrowLeft":
      direction.value = "left";
      break;
    case "ArrowRight":
      direction.value = "right";
      break;
  }
};

const movePacman = (deltaTime: number) => {
  if (direction.value === "none" && nextDirection.value === "none") return;
  if (!isMoving.value) {
    const canChangeDirection = canMove(
      gridPosition.value.x +
        (nextDirection.value === "right"
          ? 1
          : nextDirection.value === "left"
          ? -1
          : 0),
      gridPosition.value.y +
        (nextDirection.value === "down"
          ? 1
          : nextDirection.value === "up"
          ? -1
          : 0)
    );

    if (canChangeDirection && nextDirection.value !== "none") {
      direction.value = nextDirection.value;
    }
  }

  // If we have a direction, move in that direction
  if (direction.value !== "none") {
    isMoving.value = true;

    // Calculate target position in pixels
    let targetX =
      gridPosition.value.x * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2;
    let targetY =
      gridPosition.value.y * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2;

    // Move toward target
    const dx = targetX - position.value.x;
    const dy = targetY - position.value.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate speed based on delta time
    const frameSpeed = BASE_SPEED * (deltaTime / 1000);

    if (distance < frameSpeed) {
      position.value = { x: targetX, y: targetY };
      isMoving.value = false;

      const nextX =
        gridPosition.value.x +
        (direction.value === "right" ? 1 : direction.value === "left" ? -1 : 0);
      const nextY =
        gridPosition.value.y +
        (direction.value === "down" ? 1 : direction.value === "up" ? -1 : 0);

      if (canMove(nextX, nextY)) {
        gridPosition.value = { x: nextX, y: nextY };
      } else {
        direction.value = "none";
      }
    } else {
      position.value = {
        x: position.value.x + (dx / distance) * frameSpeed,
        y: position.value.y + (dy / distance) * frameSpeed,
      };
    }
  }

  // Tunnel
  if (gridPosition.value.x < 0) {
    gridPosition.value.x = GRID_SIZE - 1;
    position.value.x =
      (GRID_SIZE - 1) * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2;
  } else if (gridPosition.value.x >= GRID_SIZE) {
    gridPosition.value.x = 0;
    position.value.x = (CELL_SIZE - CHARACTER_SIZE) / 2;
  }

  checkFoodCollision();
};

const initGhosts = () => {
  const baseSpeed = 2 + (level.value - 1) * GHOST_SPEED_INCREASE;
  ghosts.value = [
    {
      position: {
        x: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
        y: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
      },
      gridPosition: { x: 7, y: 7 },
      color: "red",
      speed: baseSpeed,
      direction: "left",
      nextDirection: "none",
      isMoving: false,
    },
    {
      position: {
        x: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
        y: 8 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
      },
      gridPosition: { x: 7, y: 8 },
      color: "red",
      speed: baseSpeed,
      direction: "up",
      nextDirection: "none",
      isMoving: false,
    },
    {
      position: {
        x: 6 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
        y: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
      },
      gridPosition: { x: 6, y: 7 },
      color: "red",
      speed: baseSpeed,
      direction: "right",
      nextDirection: "none",
      isMoving: false,
    },
    {
      position: {
        x: 8 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
        y: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
      },
      gridPosition: { x: 8, y: 7 },
      color: "red",
      speed: baseSpeed,
      direction: "down",
      nextDirection: "none",
      isMoving: false,
    },
  ];
};

const getValidDirections = (ghost: Ghost): Direction[] => {
  const { x, y } = ghost.gridPosition;
  const validDirections: Direction[] = [];

  // Don't allow immediate reverse direction (prevents zigzagging)
  const oppositeOf: Record<Direction, Direction> = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
    none: "none",
  };

  const oppositeDirection = oppositeOf[ghost.direction];

  // Check all four directions
  if (ghost.direction !== "down" && canGhostMove(x, y - 1))
    validDirections.push("up");
  if (ghost.direction !== "up" && canGhostMove(x, y + 1))
    validDirections.push("down");
  if (ghost.direction !== "right" && canGhostMove(x - 1, y))
    validDirections.push("left");
  if (ghost.direction !== "left" && canGhostMove(x + 1, y))
    validDirections.push("right");

  // If no valid directions, allow turning around
  if (validDirections.length === 0 && ghost.direction !== "none") {
    const reverseX =
      x +
      (oppositeDirection === "right"
        ? 1
        : oppositeDirection === "left"
        ? -1
        : 0);
    const reverseY =
      y +
      (oppositeDirection === "down" ? 1 : oppositeDirection === "up" ? -1 : 0);

    if (canGhostMove(reverseX, reverseY)) {
      return [oppositeDirection];
    }
  }

  return validDirections.length > 0 ? validDirections : ["none"];
};


const moveGhosts = (deltaTime: number) => {
  ghosts.value.forEach((ghost) => {
    // Similar to how Pacman moves
    if (!ghost.isMoving) {
      // Choose a new direction if needed
      if (ghost.direction === "none" || Math.random() < 0.05) {
        const validDirections = getValidDirections(ghost);

        if (validDirections.length > 0) {
          // Fixed typing issue - use explicit directions
          const randomIndex = Math.floor(
            Math.random() * validDirections.length
          );

          // Simple solution: Use if-else to assign specific Direction values
          const newDir = validDirections[randomIndex];
          if (newDir === "up") ghost.direction = "up";
          else if (newDir === "down") ghost.direction = "down";
          else if (newDir === "left") ghost.direction = "left";
          else if (newDir === "right") ghost.direction = "right";
          else ghost.direction = "none";
        }
      }
    }

    if (ghost.direction !== "none") {
      ghost.isMoving = true;

      // Calculate target position in pixels
      let targetX =
        ghost.gridPosition.x * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2;
      let targetY =
        ghost.gridPosition.y * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2;

      // Move toward target
      const dx = targetX - ghost.position.x;
      const dy = targetY - ghost.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ghost.speed) {
        ghost.position = { x: targetX, y: targetY };
        ghost.isMoving = false;

        const nextX =
          ghost.gridPosition.x +
          (ghost.direction === "right"
            ? 1
            : ghost.direction === "left"
            ? -1
            : 0);
        const nextY =
          ghost.gridPosition.y +
          (ghost.direction === "down" ? 1 : ghost.direction === "up" ? -1 : 0);

        if (canGhostMove(nextX, nextY)) {
          ghost.gridPosition = { x: nextX, y: nextY };
        } else {
          // If we can't move in this direction, choose a new one
          const validDirections = getValidDirections(ghost);

          if (validDirections.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * validDirections.length
            );
            const newDir = validDirections[randomIndex];

            // Use explicit assignments to fix type issues
            if (newDir === "up") ghost.direction = "up";
            else if (newDir === "down") ghost.direction = "down";
            else if (newDir === "left") ghost.direction = "left";
            else if (newDir === "right") ghost.direction = "right";
            else ghost.direction = "none";
          } else {
            ghost.direction = "none";
          }
        }
      } else {
        ghost.position = {
          x: ghost.position.x + (dx / distance) * ghost.speed,
          y: ghost.position.y + (dy / distance) * ghost.speed,
        };
      }
    }
  });
};



const checkFoodCollision = () => {
  const centerX = position.value.x + CHARACTER_SIZE / 2;
  const centerY = position.value.y + CHARACTER_SIZE / 2;

  const gridX = Math.floor(centerX / CELL_SIZE);
  const gridY = Math.floor(centerY / CELL_SIZE);
  const index = gridY * GRID_SIZE + gridX;

  if (
    index >= 0 &&
    index < gameLayout.value.length &&
    gameLayout.value[index] === 2
  ) {
    score.value += 10;
    gameLayout.value[index] = 0;

    // Check if all food is eaten
    if (!gameLayout.value.includes(2)) {
      nextLevel(); // Advance to next level instead of ending game
    }
  }
};
// Check collision with ghosts
const checkGhostCollision = () => {
  const characterCenterX = position.value.x + CHARACTER_SIZE / 2;
  const characterCenterY = position.value.y + CHARACTER_SIZE / 2;

  ghosts.value.forEach((ghost) => {
    const ghostCenterX = ghost.position.x + CHARACTER_SIZE / 2;
    const ghostCenterY = ghost.position.y + CHARACTER_SIZE / 2;

    const distance = Math.sqrt(
      Math.pow(characterCenterX - ghostCenterX, 2) +
        Math.pow(characterCenterY - ghostCenterY, 2)
    );

    if (distance < CHARACTER_SIZE) {
      gameOver.value = true;
    }
  });
};

const gameLoop = (timestamp: number) => {
  if (lastTime === 0) {
    lastTime = timestamp;
  }
  
  // Calculate delta time in milliseconds
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  
  if (gameStarted.value && !gameOver.value) {
    movePacman(deltaTime);
    moveGhosts(deltaTime);
    checkGhostCollision(); 
  }
  
  animationId = requestAnimationFrame(gameLoop);
};

const nextLevel = () => {
  level.value++; // Increment level
  
  // Reset pacman position
  gridPosition.value = { x: 7, y: 13 };
  position.value = {
    x: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
    y: 13 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
  };
  
  // Reset direction
  direction.value = "none";
  nextDirection.value = "none";
  isMoving.value = false;
  
  // Reset the level layout
  gameLayout.value = [...originalLayout];
  
  // Reinitialize ghosts with increased speed
  initGhosts();

};

const startGame = () => {
  showGame.value = true;
  gridPosition.value = { x: 7, y: 13 };
  position.value = {
    x: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
    y: 13 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
  };
  direction.value = "none";
  nextDirection.value = "none";
  score.value = 0;
  gameOver.value = false;
  gameStarted.value = true;
  isMoving.value = false;
  gameLayout.value = [...originalLayout];
  initGhosts();
  lastTime = 0; // Reset the last time when starting a new game
};

// Initialize original layout for resetting
const originalLayout = [...gameLayout.value];

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  animationId = requestAnimationFrame(gameLoop);
  initGhosts();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  if (animationId) cancelAnimationFrame(animationId);
});
</script>

<template>
  <div class="container">
    <br /><br /><br />
    <div class="score">Score: {{ score }}</div>
    <div class="game-area">
      <button
        @click="startGame"
        class="start-game"
        v-if="!gameStarted || gameOver"
      >
        {{ gameOver ? "Play Again" : "Start Game" }}
      </button>

      <div class="grid" v-if="showGame">
        <div
          v-for="(cell, index) in gameLayout"
          :key="index"
          :class="{
            wall: cell === 1,
            food: cell === 2,
            // 'power-pellet': cell === 3,
            'ghost-lair': cell === 4,
          }"
        ></div>
      </div>

      <div
        class="character"
        v-if="showGame"
        :style="{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundImage: `url(${pacmanImage})`,
          width: `${CHARACTER_SIZE}px`,
          height: `${CHARACTER_SIZE}px`,
        }"
      ></div>

      <template v-if="showGame">
        <div
          v-for="(ghost, index) in ghosts"
          :key="index"
          class="ghost"
          :style="{
            left: `${ghost.position.x}px`,
            top: `${ghost.position.y}px`,
            backgroundColor: ghost.color,
            width: `${CHARACTER_SIZE}px`,
            height: `${CHARACTER_SIZE}px`,
            // backgroundColor: powerPelletActive ? 'left' : ghost.color,
            // opacity: powerPelletActive ? 0.6 : 1
          }"
        ></div>
      </template>

      <div class="controls" v-if="showGame">
        <button @click="nextDirection = 'up'">up</button>
        <div>
          <button @click="direction = 'left'">left</button>
          <button @click="direction = 'down'">down</button>
          <button @click="direction = 'right'">right</button>
        </div>
      </div>
      <div class="overlay" v-if="gameOver"></div>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: rgb(255, 255, 255);
  
}

.game-area {
  position: relative;
  width: 800px;
  height: 800px;
  background-color: #000000;
  border: 2px solid #1e1e1e;
}

.grid {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);
  width: 100%;
  height: 100%;
}

.wall {
  background-color: #ffffff;
  border-radius: 3px;
  margin: 1px;
}

.food {
  display: flex;
  justify-content: center;
  align-items: center;
}

.food::after {
  content: "";
  width: 6px;
  height: 6px;
  background-color: #fff;
  border-radius: 50%;
}

.power-pellet {
  display: flex;
  justify-content: center;
  align-items: center;
}

.power-pellet::after {
  content: "";
  width: 12px;
  height: 12px;
  background-color: rgb(255, 0, 0);
  border-radius: 50%;
}

.character {
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 101;
}

.ghost {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  z-index: 1;
}

.ghost::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  bottom: -5px;
  background-color: inherit;
}

.start-game {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 80px;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 30px;
  font-weight: bold;
  z-index: 200;
  cursor: pointer;
}

.score {
  font-size: 30px;
  margin-top: 10%;
  margin-bottom: 15px;
}
.controls {
  display: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(15px);
  z-index: 105;
  

}@media (max-width: 768px) {
  .container {
    padding: 10px;
    width: 100%;
    justify-content: flex-start;
  }
  
  .game-area {
    width: 100%;
    max-width: 100vmin;
    height: 100vmin;
    margin: 20px auto;
    position: relative;
  }
  
  .grid {
    /* No need to scale - we'll adjust the game area size instead */
  }
  
  .character, .ghost {
    /* These will maintain their pixel sizes but within the scaled game area */
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 400;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 15px 0;
    border-radius: 15px;
    margin: 0 auto;
    width: 90%;
    max-width: 400px;
  }
  
  .controls > div {
    display: flex;
    gap: 15px;
    margin-top: 10px;
  }
  
  .controls button {
    width: 70px;
    height: 70px;
    font-size: 24px;
    background-color: rgba(51, 51, 51, 0.8);
    color: white;
    border: 2px solid #666;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .controls button:active {
    background-color: rgba(255, 0, 0, 0.7);
    transform: scale(0.95);
  }
  
  .score {
    font-size: 24px;
    margin: 10px 0;
    position: fixed;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px;
    z-index: 100;
  }
  
  .start-game {
    font-size: 18px;
    padding: 12px 24px;
    white-space: nowrap;
  }

}
</style>
