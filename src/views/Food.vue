<template>
  <div class="food-page">
    <div class="page-header container">
      <div class="header-text">
        <span class="badge badge-blue">Donde Quedarse y Comer</span>
        <h1>Servicios en Pudahuel</h1>
        <p>
          Encuentra los mejores alojamientos cerca del aeropuerto y disfruta de
          la ruta gastronómica local.
        </p>
      </div>
      <div class="filters">
        <button
          v-for="cat in ['Todos', 'Hotel', 'Tradicional', 'Campo']"
          :key="cat"
          @click="activeCategory = cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="container services-grid">
      <PlaceCard
        v-for="place in filteredServices"
        :key="place.id"
        :place="place"
      />
    </div>

    <!-- Featured Map Section -->
    <div class="map-section">
      <div class="container">
        <div class="section-title">
          <h2>Mapa de Servicios</h2>
          <p>Localiza hoteles y restaurantes para tu estadía en la comuna.</p>
        </div>
        <Map :places="filteredServices" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { food, lodging } from "../data/places";
import PlaceCard from "../components/PlaceCard.vue";
import Map from "../components/Map.vue";

const activeCategory = ref("Todos");
const allServices = computed(() => [...lodging, ...food]);

const filteredServices = computed(() => {
  if (activeCategory.value === "Todos") return allServices.value;
  return allServices.value.filter((s) => s.category === activeCategory.value);
});
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.food-page {
  padding-top: 10rem;
  padding-bottom: 5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;

  .header-text {
    max-width: 600px;
    h1 {
      font-size: 3rem;
      font-weight: 800;
      color: $dark;
      margin-top: 1rem;
    }
    p {
      font-size: 1.15rem;
      color: $gray;
      line-height: 1.6;
    }
  }
}

.filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  .filter-btn {
    padding: 0.6rem 1.5rem;
    border-radius: 999px;
    background: white;
    font-weight: 600;
    color: $gray;
    border: 1px solid #e2e8f0;
    transition: $transition-base;

    &:hover,
    &.active {
      background: $secondary;
      color: white;
      border-color: $secondary;
    }
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
}

.map-section {
  padding: 6rem 0;
  background-color: #f1f5f9;
}

@media (max-width: 992px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    .filters {
      justify-content: flex-start;
    }
  }
}
</style>
