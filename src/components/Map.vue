<template>
  <div class="map-wrapper">
    <div id="map" class="map-container"></div>
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Cargando mapa...</p>
    </div>
    <div class="map-controls">
      <button @click="resetView" title="Resetear Vista">
        <CrosshairIcon class="icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CrosshairIcon } from "lucide-vue-next";

const props = defineProps({
  places: {
    type: Array,
    default: () => [],
  },
  center: {
    type: Array,
    default: () => [-70.78, -33.43],
  },
});

const loading = ref(true);
let map = null;
const markers = [];

// Usar token de demostración o el usuario puede proporcionar el suyo
mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9kb2NoYSIsImEiOiJjazY5Nm16NW0wMHhzM2VxbW96N3g5ZzF3In0.S9rO0S-z0-0-0-0-0-0"; // Reemplazar con token real

const initMap = () => {
  try {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: props.center,
      zoom: 11,
      pitch: 45,
      bearing: -17,
    });

    map.on("load", () => {
      loading.value = false;
      addMarkers();

      // Add regular controls
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    });
  } catch (error) {
    console.error("Error initializing map:", error);
    loading.value = false;
  }
};

const addMarkers = () => {
  if (!map) return;

  // Clear old markers
  markers.forEach((m) => m.remove());
  markers.length = 0;

  props.places.forEach((place) => {
    // Create custom marker element
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = `<div class="marker-dot"></div>`;

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="map-popup">
          <img src="${place.image}" style="width:100%; border-radius:8px; margin-bottom:8px;" />
          <h4 style="margin:0; color:#10B981;">${place.name}</h4>
          <p style="margin:5px 0; font-size:12px; color:#64748B;">${place.category}</p>
        </div>
      `);

    const marker = new mapboxgl.Marker(el)
      .setLngLat(place.location)
      .setPopup(popup)
      .addTo(map);

    markers.push(marker);
  });
};

const resetView = () => {
  if (map) {
    map.flyTo({
      center: props.center,
      zoom: 11,
      essential: true,
    });
  }
};

watch(
  () => props.places,
  () => {
    addMarkers();
  },
  { deep: true },
);

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (map) map.remove();
});
</script>

<style lang="scss">
@use "../assets/styles/variables" as *;

.map-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: $radius;
  overflow: hidden;
  box-shadow: $shadow-lg;
  border: 4px solid white;
}

.map-container {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  gap: 1rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba($primary, 0.1);
    border-top: 4px solid $primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.map-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;

  button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: white;
    box-shadow: $shadow;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $dark;
    &:hover {
      transform: scale(1.1);
      color: $primary;
    }

    .icon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
}

// Custom Marker Styles (Global scope because mapbox creates elements outside vue)
.custom-marker {
  cursor: pointer;
  .marker-dot {
    width: 20px;
    height: 20px;
    background: #10b981;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.3);
      background: #3b82f6;
    }
  }
}

.map-popup {
  padding: 5px;
  h4 {
    font-weight: 700;
    margin-bottom: 5px;
  }
  p {
    line-height: 1.4;
    color: #666;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
