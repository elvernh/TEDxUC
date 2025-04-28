<script setup lang="ts">
import logo from "@/components/icons/logo-white.svg";
import { ref } from "vue";

const isEventDropdownVisible = ref(false);
const isMobileMenuOpen = ref(false);
const isMobileEventDropdownVisible = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (!isMobileMenuOpen.value) {
    isMobileEventDropdownVisible.value = false;
  }
};

const closeMobileDropdown = () => {
  isMobileEventDropdownVisible.value = false;
};

const navigationPath = [
  { name: "Home", path: "/" },
  {
    name: "Event",
    dropdown: [
      { name: "Pre Event 1", path: "/event/preevent1" },
      { name: "Pre Event 2", path: "/event/preevent2" },
      { name: "Pre Event 3", path: "/event/preevent3" },
      { name: "Main Event", path: "/event/mainevent" },
    ],
  },
  { name: "Mini Game", path: "/mini-game" },
  { name: "Speaker & Schedule", path: "/speaker-schedule" },
  { name: "Gallery", path: "/gallery" },
];
</script>

<template>
  <nav>
    <div class="nav-container">
      <div class="left-side">
        <router-link to="/">
          <img class="logo" :src="logo" alt="logo" />
        </router-link>
      </div>
      <div class="hamburger" @click="toggleMobileMenu">
        <div class="bar" :class="{ bar1: isMobileMenuOpen }"></div>
        <div class="bar" :class="{ bar2: isMobileMenuOpen }"></div>
        <div class="bar" :class="{ bar3: isMobileMenuOpen }"></div>
      </div>
      <div class="right-side" :class="{ open: isMobileMenuOpen }">
        <ul>
          <li
            v-for="(item, index) in navigationPath"
            :key="index"
            @mouseover="
              item.name === 'Event' && (isEventDropdownVisible = true)
            "
            @mouseleave="
              item.name === 'Event' && (isEventDropdownVisible = false)
            "
          >
            <span
              v-if="item.name === 'Event'"
              class="clickable"
              @click="
                isMobileEventDropdownVisible = !isMobileEventDropdownVisible
              "
            >
              {{ item.name }}
              <span
                class="chevron"
                :class="{
                  'chevron-up':
                    isEventDropdownVisible || isMobileEventDropdownVisible,
                  'chevron-down':
                    !isEventDropdownVisible && !isMobileEventDropdownVisible,
                }"
                >▼</span
              >
            </span>
            <router-link v-else :to="item.path as string">
              {{ item.name }}
            </router-link>
            <ul
              v-if="
                (item.name === 'Event' &&
                  !isMobileMenuOpen &&
                  isEventDropdownVisible) ||
                (isMobileMenuOpen && isMobileEventDropdownVisible)
              "
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
.left-side {
  z-index: 99;
}

.hamburger {
  display: none;
  cursor: pointer;
  width: 30px;
  height: 25px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  z-index: 99;
}

.bar {
  background-color: white;
  height: 4px;
  width: 100%;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.bar1 {
  transform: rotate(45deg) translate(8px, 8px);
}

.bar2 {
  opacity: 0;
}

.bar3 {
  transform: rotate(-45deg) translate(8px, -8px);
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
  padding: 10px;
}

.right-side ul li a,
.clickable {
  text-decoration: none;
  color: white;
  transition: color 0.4s ease;
  cursor: pointer;
}

.right-side ul li a:hover,
.clickable:hover {
  color: #eb0028;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  min-width: 150px;
  background: rgba(0, 0, 0, 0.9);
  list-style: none;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 200;
  border-top: 20px solid transparent;
  border-bottom: 25px solid transparent;
  gap: 0;
  margin-top: 5px;
}

.dropdown-menu li {
  padding: 0px 20px;
}

.dropdown-menu li a {
  display: block;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  line-height: 0.3;
}

.dropdown-menu li a:hover {
  color: #eb0028;
}

.chevron {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.chevron-up {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .nav-container {
    margin: 1rem;
  }

  .hamburger {
    display: flex;
  }

  .bar {
    background-color: white;
    height: 4px;
    width: 100%;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .bar1 {
    transform: rotate(45deg) translate(8px, 8px);
  }

  .bar2 {
    opacity: 0;
  }

  .bar3 {
    transform: rotate(-45deg) translate(8px, -8px);
  }

  .right-side {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    text-align: center;
    padding: 5.5rem 0 2rem 0;
    transition: all 0.3s ease;
    flex-direction: column;
  }

  .right-side.open {
    display: flex;
  }

  .right-side ul {
    flex-direction: column;
    gap: 1rem;
  }

  .dropdown-menu {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
    background: rgba(0, 0, 0, 0.9);
    list-style: none;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 200;
    margin: 0.3rem auto 0;
    box-shadow: none;
    border: none;

    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    gap: 0;
  }

  .dropdown-menu li {
    padding: 0.1rem 0;
  }

  .dropdown-menu li a {
    line-height: 1.5;
  }
}
</style>
