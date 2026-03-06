<template>
  <footer class="main-footer">
    <div class="container footer-grid">
      <div class="footer-info">
        <router-link to="/" class="logo">
          <MapPinIcon class="icon" />
          <span>Pudahuel<span>Turismo</span></span>
        </router-link>
        <p>
          Tu guía definitiva para descubrir los encantos de la comuna Aeropuerto
          de Chile.
        </p>
      </div>
      <div class="footer-links">
        <h3>Explorar</h3>
        <ul>
          <li><router-link to="/atractivos">Atractivos</router-link></li>
          <li><router-link to="/comida">Gastronomía</router-link></li>
          <li><router-link to="/">Mapa Interactivo</router-link></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h3>Contacto</h3>
        <p>Municipalidad de Pudahuel</p>
        <p>info@pudahuelturismo.cl</p>
        <div class="social-icons">
          <InstagramIcon class="social-icon" />
          <FacebookIcon class="social-icon" />
          <TwitterIcon class="social-icon" />
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>&copy; 2024 Pudahuel Turismo. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  MapPinIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
} from "lucide-vue-next";
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.main-footer {
  background-color: $dark;
  color: white;
  padding-top: 5rem;
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: $primary;
  margin-bottom: 1.5rem;

  span span {
    color: white;
  }

  .icon {
    width: 2rem;
    height: 2rem;
  }
}

.footer-info p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  max-width: 300px;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  a {
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      color: $primary;
    }
  }
}

.social-icons {
  display: flex;
  gap: 1.25rem;
  margin-top: 1.5rem;

  .social-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    transition: $transition-base;
    cursor: pointer;
    &:hover {
      color: $primary;
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  text-align: center;
}
</style>
