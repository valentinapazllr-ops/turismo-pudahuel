<template>
  <header class="main-header" :class="{ scrolled: isScrolled }">
    <div class="container nav-content">
      <router-link to="/" class="logo">
        <MapPinIcon class="icon" />
        <span>Pudahuel<span>Turismo</span></span>
      </router-link>
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/atractivos">Explorar</router-link></li>
          <li><router-link to="/comida">Servicios</router-link></li>
        </ul>
      </nav>
      <div class="nav-right">
        <router-link to="/atractivos" class="btn-cta">Empezar Ruta</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { MapPinIcon } from "lucide-vue-next";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: $transition-base;

  &.scrolled {
    padding: 0.75rem 0;
    @include glass-effect;
    box-shadow: $shadow;
  }
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: $primary;

  span span {
    color: $dark;
  }

  .icon {
    width: 2rem;
    height: 2rem;
  }
}

nav ul {
  display: flex;
  gap: 2.5rem;

  a {
    font-weight: 600;
    color: $gray;
    font-size: 0.95rem;

    &:hover,
    &.router-link-active {
      color: $primary;
    }
  }
}

.btn-cta {
  background-color: $primary;
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: $radius;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: $shadow;
  border: 1px solid rgba(white, 0.2);

  &:hover {
    background-color: $primary-dark;
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  nav,
  .nav-right {
    display: none;
  }
}
</style>
