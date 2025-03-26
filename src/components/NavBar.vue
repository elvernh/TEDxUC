<script setup lang="ts">
import logo from "@/components/icons/logo-white.svg";
import { ref } from "vue";

const isEventDropdownVisible = ref(false);

const navigationPath = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Event",
    dropdown: [
      { name: "Pre Event 1", path: "/event/preevent1" },
      { name: "Pre Event 2", path: "/event/preevent2" },
      { name: "Pre Event 3", path: "/event/preevent3" },
      { name: "Main Event", path: "/event/mainevent" },
    ],
  },
  {
    name: "Mini Game",
    path: "/mini-game",
  },
  {
    name: "Speaker & Schedule",
    path: "/speaker-schedule",
  },
  {
    name: "Login",
    path: "/login",
  },
];
</script>

<template>
  <nav>
    <div class="nav-container">
      <div class="left-side">
        <img class="logo" :src="logo" alt="logo" />
      </div>
      <div class="right-side">
        <ul>
          <li
            v-for="(item, index) in navigationPath"
            :key="index"
            @mouseover="
              item.name === 'Event' && (isEventDropdownVisible = true)
            "
            @mouseleave="isEventDropdownVisible = false"
          >
            <span v-if="item.name === 'Event'" class="non-clickable">
              {{ item.name }}
              <span
                class="chevron"
                :class="{ 'chevron-up': isEventDropdownVisible }"
                >▼</span
              >
            </span>

            <router-link
              v-else
              :to="item.path"
              :class="{ 'login-button': item.name === 'Login' }"
            >
              {{ item.name }}
            </router-link>
            <ul
              v-if="item.name === 'Event' && isEventDropdownVisible"
              class="dropdown-menu"
            >
              <li v-for="(subItem, subIndex) in item.dropdown" :key="subIndex">
                <router-link :to="subItem.path">{{ subItem.name }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.81) 13%,
    rgba(0, 0, 0, 0) 100%
  );
  position: fixed;
  font-weight: 900;
  font-size: 19px;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 3rem;
}
.right-side ul {
  display: flex;
  list-style: none;
  gap: 3rem;
  padding: 0;
  margin: 0;
}
.right-side ul li {
  position: relative;
}
.right-side ul li a,
.right-side ul li .login-button,
.non-clickable {
  text-decoration: none;
  color: white;
  transition: background-color 0.4s ease, color 0.4s ease;
}
.right-side ul li a:hover,
.non-clickable:hover {
  color: #eb0028;
}
.non-clickable {
  cursor: default;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.chevron {
  font-size: 0.8em;
  transition: transform 0.3s ease;
}

.chevron-up {
  transform: rotate(180deg);
}

.login-button {
  background-color: #eb0028;
  color: white;
  padding: 8px 50px;
  border-radius: 8px;
}
.login-button:hover {
  background-color: white;
  color: #eb0028;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: start;
  left: 0;
  min-width: 150px;
  background: rgba(0, 0, 0, 0.9);
  list-style: none;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 200;
  padding: 0.5rem 0
}

.dropdown-menu ul {
  margin: 0;
  padding: 0;
}

/* Reduce gap between each list item */
.dropdown-menu li {
  padding: 0.3rem 1rem; /* Adjust padding */
  margin: 0;
  line-height: 1; /* Lesser line height */
}

.dropdown-menu li a {
  display: block;
  padding: 0;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}
.dropdown-menu li a:hover {
  color: #eb0028;
}


/* Mobile Responsiveness */
@media (max-width: 768px) {
  nav {
    font-size: 14px;
  }

  .logo {
    width: 120px;
  }

  .nav-container {
    margin: 1rem;
  }

  .right-side ul {
    gap: 1rem;
  }

  .login-button {
    padding: 6px 20px;
    border-radius: 6px;
  }
}
</style>
