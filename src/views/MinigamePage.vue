<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import pacmanRightImage from "@/assets/images/pacmanRightImage.png";
import pacmanLeftImage from "@/assets/images/pacmanLeftImage.png";
import pacmanUpImage from "@/assets/images/pacmanUpImage.png";
import pacmanDownImage from "@/assets/images/pacmanDownImage.png";

import vip1Right from "@/assets/images/vip1/vip1-right.png";
import vip1Left from "@/assets/images/vip1/vip1-left.png";
import vip1Up from "@/assets/images/vip1/vip1-up.png";
import vip1Down from "@/assets/images/vip1/vip1-down.png";

import vip2Right from "@/assets/images/vip2/right.png";
import vip2Left from "@/assets/images/vip2/left.png";
import vip2Up from "@/assets/images/vip2/up.png";
import vip2Down from "@/assets/images/vip2/down.png";

import vip3Right from "@/assets/images/vip3/right.png";
import vip3Left from "@/assets/images/vip3/left.png";
import vip3Up from "@/assets/images/vip3/up.png";
import vip3Down from "@/assets/images/vip3/down.png";

import mibRight from "@/assets/images/mib/right.png";
import mibLeft from "@/assets/images/mib/left.png";
import mibUp from "@/assets/images/mib/up.png";
import mibDown from "@/assets/images/mib/down.png";

const GRID_SIZE = 15;
const CELL_SIZE = 800 / GRID_SIZE;
const BASE_SPEED = 250;
const GAME_SIZE = { width: 800, height: 800 };
const CHARACTER_SIZE = CELL_SIZE * 0.8;
const MAX_HIGH_SCORES = 5;
const GHOST_SPEED_INCREASE = 1;

const SPRITE_FRAMES = 4; // 4 frames per direction
const FRAME_WIDTH = 48; // Each frame is 480px wide
const FRAME_HEIGHT = 48; // Height of each frame in the sprite sheet
const ANIMATION_SPEED = 150;

const currentFrame = ref(0);
const lastFrameChange = ref(0);

const gridPosition = ref({ x: 7, y: 9 });
const nextDirection = ref<Direction>("none");
const isMoving = ref(false);
const level = ref(1);

type Position = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right" | "none";

type GhostCharacter = "vip1" | "vip2" | "vip3" | "mib";

type Ghost = {
  position: Position;
  gridPosition: Position;
  character: GhostCharacter;
  speed: number;
  direction: Direction;
  nextDirection: Direction;
  isMoving: boolean;
  currentFrame: number;
  lastFrameChange: number;
  sprites: {
    right: string;
    left: string;
    up: string;
    down: string;
  };
};

const position = ref<Position>({ x: 200, y: 200 });
const direction = ref<Direction>("none");
const score = ref(0);
const gameStarted = ref(false);
const gameOver = ref(false);
const ghosts = ref<Ghost[]>([]);
const showGame = ref(false);

const updateAnimation = (timestamp: number) => {
  const isMobile = window.innerWidth <= 768;

  if (
    !isMobile &&
    gameStarted.value &&
    !gameOver.value &&
    direction.value !== "none"
  ) {
    if (timestamp - lastFrameChange.value > ANIMATION_SPEED) {
      currentFrame.value = (currentFrame.value + 1) % SPRITE_FRAMES;
      lastFrameChange.value = timestamp;
    }
  } else {
    currentFrame.value = 0;
  }
  requestAnimationFrame(updateAnimation);
};

const getSpritePosition = () => {
  return `-${currentFrame.value * FRAME_WIDTH}px 0px`;
};

const COLLISION_PADDING = 5;
let lastTime = 0;
// Game layout (0 = empty, 1 = wall, 2 = food, 3 = power pellet, 4 = ghost lair)
const gameLayout = ref([
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2,
  2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2,
  2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 4, 4, 4, 1, 1, 2, 1, 1,
  1, 0, 0, 0, 2, 2, 2, 4, 4, 4, 2, 0, 2, 0, 0, 0, 1, 1, 1, 2, 1, 2, 4, 4, 4, 2,
  1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2,
  1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
]);

let animationId: number | null = null;
const instructionText = computed(() => {
  return "Use the arrow keys to move and avoid the ghosts!";
});

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
    updateAnimation(timestamp); // Add animation update
  }

  animationId = requestAnimationFrame(gameLoop);
};

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
  if (direction.value !== "none") {
    lastValidDirection.value = direction.value;
  }
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
      character: "vip1",
      speed: baseSpeed,
      direction: "left",
      nextDirection: "none",
      isMoving: false,
      currentFrame: 0,
      lastFrameChange: 0,
      sprites: {
        right: vip1Right,
        left: vip1Left,
        up: vip1Up,
        down: vip1Down,
      },
    },
    {
      position: {
        x: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
        y: 8 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
      },
      gridPosition: { x: 7, y: 8 },
      character: "vip2",
      speed: baseSpeed,
      direction: "up",
      nextDirection: "none",
      isMoving: false,
      currentFrame: 0,
      lastFrameChange: 0,
      sprites: {
        right: vip2Right,
        left: vip2Left,
        up: vip2Up,
        down: vip2Down,
      },
    },
    {
      position: {
        x: 6 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
        y: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
      },
      gridPosition: { x: 6, y: 7 },
      character: "vip3",
      speed: baseSpeed,
      direction: "right",
      nextDirection: "none",
      isMoving: false,
      currentFrame: 0,
      lastFrameChange: 0,
      sprites: {
        right: vip3Right,
        left: vip3Left,
        up: vip3Up,
        down: vip3Down,
      },
    },
    {
      position: {
        x: 8 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
        y: 7 * CELL_SIZE + (CELL_SIZE - CHARACTER_SIZE) / 2,
      },
      gridPosition: { x: 8, y: 7 },
      character: "mib",
      speed: baseSpeed * 1.3,
      direction: "down",
      nextDirection: "none",
      isMoving: false,
      currentFrame: 0,
      lastFrameChange: 0,
      sprites: {
        right: mibRight,
        left: mibLeft,
        up: mibUp,
        down: mibDown,
      },
    },
  ];
};
const getGhostSprite = (ghost: Ghost) => {
  switch (ghost.direction) {
    case "right":
      return ghost.sprites.right;
    case "left":
      return ghost.sprites.left;
    case "up":
      return ghost.sprites.up;
    case "down":
      return ghost.sprites.down;
    default:
      return ghost.sprites.right;
  }
};

const getGhostSpritePosition = (ghost: Ghost) => {
  return `-${ghost.currentFrame * FRAME_WIDTH}px 0px`;
};

const lastValidDirection = ref<Direction>("right");

const currentSpriteImage = computed(() => {
  const displayDirection =
    direction.value !== "none" ? direction.value : lastValidDirection.value;

  switch (displayDirection) {
    case "right":
      return pacmanRightImage;
    case "left":
      return pacmanLeftImage;
    case "up":
      return pacmanUpImage;
    case "down":
      return pacmanDownImage;
    default:
      return pacmanRightImage;
  }
});

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
      nextLevel();
    }
  }
};
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

const nextLevel = () => {
  level.value++;

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
  lastTime = 0;
};

const gameScale = computed(() => {
  const gameArea = document.querySelector(".game-area");
  if (!gameArea) return 1;
  return gameArea.clientWidth / 800;
});
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
    <div class="game-area">
      <button
        @click="startGame"
        class="start-game"
        v-if="!gameStarted || gameOver"
      >
        {{ gameOver ? "Play Again" : "Start Game" }}
      </button>
      <div class="instructions" v-if="!gameStarted && !gameOver">
        {{ instructionText }}
      </div>
      <div class="grid" v-if="showGame">
        <div
          v-for="(cell, index) in gameLayout"
          :key="index"
          :class="{
            wall: cell === 1,
            food: cell === 2,
            'ghost-lair': cell === 4,
          }"
        ></div>
      </div>

      <div class="score" v-if="gameStarted && !gameOver">
        Score: {{ score }}
      </div>
      <div
        class="character"
        v-if="showGame"
        :style="{
          left: `calc(${(position.x / 800) * 100}%`,
          top: `calc(${(position.y / 800) * 100}%`,
          width: `calc(${(CHARACTER_SIZE / 800) * 100}%`,
          height: `calc(${(CHARACTER_SIZE / 800) * 100}%`,
          backgroundImage: `url(${currentSpriteImage})`,
          backgroundPosition: getSpritePosition(),
          backgroundSize: `${
            ((FRAME_WIDTH * SPRITE_FRAMES) / CHARACTER_SIZE) * 100
          }% ${(FRAME_HEIGHT / CHARACTER_SIZE) * 100}%`,
        }"
      ></div>

      <template v-if="showGame">
        <div
          v-for="(ghost, index) in ghosts"
          :key="index"
          class="ghost"
          :style="{
            left: `calc(${(ghost.position.x / 800) * 100}%`,
            top: `calc(${(ghost.position.y / 800) * 100}%`,
            width: `calc(${(CHARACTER_SIZE / 800) * 100}%`,
            height: `calc(${(CHARACTER_SIZE / 800) * 100}%`,
            backgroundImage: `url(${getGhostSprite(ghost)})`,
            backgroundPosition: getGhostSpritePosition(ghost),
            backgroundSize: `${
              ((FRAME_WIDTH * SPRITE_FRAMES) / CHARACTER_SIZE) * 100
            }% ${(FRAME_HEIGHT / CHARACTER_SIZE) * 100}%`,
          }"
        ></div>
      </template>

      <div class="controls" v-if="showGame">
        <button @click="direction = 'up'">Up</button>
        <div>
          <button @click="direction = 'left'">Left</button>
          <button @click="direction = 'down'">Down</button>
          <button @click="direction = 'right'">Right</button>
        </div>
      </div>
      <div class="overlay" v-if="gameOver"></div>
    </div>
  </div>
</template>

<style scoped>
:root,
body {
  overflow: hidden;
  height: 100%;
  position: fixed;
  width: 100%;
}
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: rgb(255, 255, 255);
  padding: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}

.game-area {
  position: relative;
  width: 800px;
  height: 800px;
  background-color: #151515;
  border: 2px solid #1e1e1e;
  margin-top: 70px;
}
.instructions {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(255, 255, 255);
  font-size: 30px;
  text-align: center;
  z-index: 200;
  width: 80%;
  max-width: 400px;
  font-weight: bold;
}

.grid {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);
  width: 100%;
  height: 100%;
}

.wall {
  background-color: #ececec;
  border-radius: 3px;
  margin: 1px;
}

.food {
  width: 4px;
  height: 4px;
  position: relative;
  left: 40%;
  top: 40%;
  transform: translate(-50%, -50%);
  box-shadow:
    /* Row 1 */ 4px 0px 0 0 white, 8px 0px 0 0 white,
    /* Row 2 */ 0px 4px 0 0 white, 4px 4px 0 0 white, 8px 4px 0 0 white,
    12px 4px 0 0 white, /* Row 3 */ 0px 8px 0 0 white, 4px 8px 0 0 white,
    8px 8px 0 0 white, 12px 8px 0 0 white, /* Row 4 */ 4px 12px 0 0 white,
    8px 12px 0 0 white;
  image-rendering: pixelated;
}

.food::after {
  content: "";
  width: 6px;
  height: 6px;
  background-color: #fff;
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
  background-repeat: no-repeat;
  image-rendering: pixelated;
  z-index: 100;
  transition: background-position 0.1s ease, transform 0.2s ease;
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
  font-size: 50px;
  margin-top: 20px;
  align-items: center;
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
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 105;
}

@media (max-height: 1000px) {
  .game-area {
    transform: scale(0.8);
    margin-top: 30px;
  }

  .score {
    margin-top: 20px;
    align-items: center;
  }
  .controls {
    top: 550px;
  }
}

@media (max-height: 900px) {
  .game-area {
    transform: scale(0.7);
    margin-top: 30px;
  }

  .score {
    font-size: 40px;
    margin-top: 20px;
    align-items: center;
  }

  .controls {
    top: 550px;
  }
}

@media (max-height: 800px) {
  .game-area {
    transform: scale(0.6);

    aspect-ratio: 1 / 1;
  }

  .score {
    font-size: 40px;
    margin-top: 20px;
    align-items: center;
  }

  .controls {
    top: 300px;
  }

  .controls button {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
}

@media (max-height: 720px) {
  .game-area {
    transform: scale(0.55);
    aspect-ratio: 1 / 1;
  }

  .score {
    font-size: 35px;
    margin-top: 30px;
    align-items: center;
  }
  .controls {
    top: 300px;
  }

  .controls button {
    width: 80px;
    height: 80px;
    touch-action: manipulation;
  }
}

@media (max-height: 600px) {
  .game-area {
    transform: scale(0.4);
  }

  .controls {
    top: 350px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
    width: 100%;
    justify-content: flex-start;
  }

  .game-area {
    width: 100%;
    max-width: 100vmin;
    height: 100vmin;
    margin: 110px auto;
    position: relative;
  }
  .instructions {
    font-size: 16px;
    top: 70%;
  }
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 400;
    margin: 0px auto;
    width: 90%;
    max-width: 400px;
    gap: 15px;
  }

  .controls > div {
    display: flex;
    gap: 15px;
  }

  .controls button {
    width: 100px;
    height: 100px;
    font-size: 24px;
    background-color: rgba(51, 51, 51, 0.8);
    color: white;
    border: 2px solid #666;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0px;
    flex: 0 0 auto;
  }

  .controls button:active {
    background-color: rgba(255, 0, 0, 0.7);
    transform: scale(0.95);
  }

  .score {
    font-size: 24px;
    position: fixed;
    text-align: center;
    padding: 5px;
    z-index: 100;
  }

  .start-game {
    font-size: 25px;
    padding: 12px 24px;
    white-space: nowrap;
  }
}
</style>
