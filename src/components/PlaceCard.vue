<template>
  <div class="place-card">
    <div class="card-image">
      <img :src="place.image" :alt="place.name" />
      <span class="badge" :class="badgeClass">{{ place.category }}</span>
      <button class="favorite-btn" @click.stop="toggleFavorite">
        <HeartIcon :class="{ active: isFavorite }" />
      </button>
    </div>
    <div class="card-content">
      <div class="header-info">
        <h3>{{ place.name }}</h3>
        <div class="rating">
          <StarIcon class="star-icon" />
          <span>{{ place.rating }}</span>
        </div>
      </div>
      <p class="description">{{ place.description }}</p>
      <div class="footer-info">
        <div class="location">
          <MapPinIcon class="map-icon" />
          <span>Pudahuel, Chile</span>
        </div>
        <button class="view-more">Ver Detalles</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { StarIcon, HeartIcon, MapPinIcon } from "lucide-vue-next";

const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
});

const isFavorite = ref(false);

const badgeClass = computed(() => {
  const cat = props.place.category.toLowerCase();
  if (["naturaleza", "ecología"].includes(cat)) return "badge-green";
  if (["parque", "negocios"].includes(cat)) return "badge-blue";
  return "badge-amber";
});

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.place-card {
  @include card-effect;
  background-color: white;
  border-radius: $radius;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }
}

.place-card:hover .card-image img {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  @include glass-effect;
}

.favorite-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  @include glass-effect;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $dark;

  .active {
    color: #ef4444;
    fill: #ef4444;
  }

  &:hover {
    transform: scale(1.1);
  }
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: $dark;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: $accent;

    .star-icon {
      width: 1rem;
      height: 1rem;
      fill: $accent;
    }
  }
}

.description {
  color: $gray;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid $light;

  .location {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    color: $gray;

    .map-icon {
      width: 0.9rem;
      height: 0.9rem;
    }
  }
}

.view-more {
  font-size: 0.85rem;
  font-weight: 600;
  color: $primary;
  &:hover {
    text-decoration: underline;
  }
}
</style>
