<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="text-group">
          <span class="badge badge-green">Descubre Pudahuel</span>
          <h1>Explora el Corazón del Aeropuerto y su Naturaleza</h1>
          <p>
            Desde lagunas cristalinas hasta la mejor gastronomía local. Pudahuel
            te espera con experiencias únicas en cada rincón.
          </p>
          <div class="actions">
            <router-link to="/atractivos" class="btn-primary"
              >Ver Atractivos</router-link
            >
            <router-link to="/comida" class="btn-outline"
              >Gastronomía</router-link
            >
          </div>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="number">15+</span>
            <span class="label">Parques</span>
          </div>
          <div class="stat-item">
            <span class="number">8.5k</span>
            <span class="label">Visitantes</span>
          </div>
          <div class="stat-item">
            <span class="number">50+</span>
            <span class="label">Restaurantes</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section container">
      <div class="section-title">
        <h2>Mapa Interactivo</h2>
        <p>
          Encuentra tus lugares favoritos y planifica tu ruta por la comuna de
          Pudahuel.
        </p>
      </div>
      <Map :places="allPlaces" />
    </section>

    <!-- Highlights Section -->
    <section class="highlights container">
      <div class="section-title">
        <h2>Lo más Destacado</h2>
        <p>
          Una selección de los sitios que no te puedes perder en tu próxima
          visita.
        </p>
      </div>
      <div class="places-grid">
        <PlaceCard
          v-for="place in featuredPlaces"
          :key="place.id"
          :place="place"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { attractions, food } from "../data/places";
import Map from "../components/Map.vue";
import PlaceCard from "../components/PlaceCard.vue";

const allPlaces = computed(() => [...attractions, ...food]);
const featuredPlaces = computed(() => [
  ...attractions.slice(0, 2),
  ...food.slice(0, 2),
]);
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.home {
  padding-bottom: 5rem;
}

.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  background-image: url("https://images.unsplash.com/photo-1542475141-9bfba331c2c3?q=80&w=2000&auto=format&fit=crop");
  background-size: cover;
  background-position: center;
  color: white;
  margin-bottom: 5rem;

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba($dark, 0.9),
      rgba($dark, 0.4),
      transparent
    );
  }
}

.hero-content {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
}

.text-group {
  max-width: 650px;

  h1 {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1.1;
    margin: 1.5rem 0;
  }

  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  .actions {
    display: flex;
    gap: 1rem;
  }
}

.btn-outline {
  padding: 0.75rem 1.5rem;
  border-radius: $radius;
  border: 2px solid white;
  color: white;
  font-weight: 600;
  &:hover {
    background: white;
    color: $dark;
  }
}

.hero-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .stat-item {
    @include glass-effect;
    padding: 1.5rem;
    border-radius: $radius;
    text-align: center;
    width: 200px;
    margin-left: auto;

    .number {
      display: block;
      font-size: 2.5rem;
      font-weight: 800;
      color: $primary;
    }

    .label {
      font-size: 0.9rem;
      font-weight: 500;
      color: white;
    }
  }
}

.map-section {
  margin-bottom: 6rem;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .text-group {
    max-width: 100%;
    h1 {
      font-size: 3rem;
    }
    .actions {
      justify-content: center;
    }
  }
  .hero-stats {
    flex-direction: row;
    justify-content: center;
    .stat-item {
      margin: 0;
      width: 140px;
    }
  }
}
</style>
