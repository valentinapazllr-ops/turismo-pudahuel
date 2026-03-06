<template>
  <div class="attractions-page">
    <div class="page-header container">
      <div class="header-text">
        <span class="badge badge-amber">Explora</span>
        <h1>Atractivos Turísticos</h1>
        <p>
          Descubre los rincones naturales, rurales y culturales más
          impresionantes de Pudahuel.
        </p>
      </div>
      <div class="filters">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="container places-grid">
      <PlaceCard
        v-for="place in filteredAttractions"
        :key="place.id"
        :place="place"
      />
    </div>

    <!-- Map Info Section -->
    <div class="container map-explore">
      <div class="map-text">
        <h2>Localización en el Mapa</h2>
        <p>
          Visualiza todas las experiencias de la ruta para planificar tu visita
          de forma eficiente.
        </p>
      </div>
      <Map :places="filteredAttractions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { attractions } from "../data/places";
import PlaceCard from "../components/PlaceCard.vue";
import Map from "../components/Map.vue";

const categories = ["Todos", "Naturaleza", "Rural", "Cultura", "Aventura"];
const activeCategory = ref("Todos");

const filteredAttractions = computed(() => {
  if (activeCategory.value === "Todos") return attractions;
  return attractions.filter((a) => a.category === activeCategory.value);
});
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.attractions-page {
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
      background: $primary;
      color: white;
      border-color: $primary;
    }
  }
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 6rem;
}

.map-explore {
  .map-text {
    margin-bottom: 2rem;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: $dark;
      margin-bottom: 0.5rem;
    }
    p {
      color: $gray;
    }
  }
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
