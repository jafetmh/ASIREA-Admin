<template>
  <nav class="navbar navbar-expand-lg admin-navbar d-flex justify-content-between align-items-center">
    <!-- Branding -->
    <div class="navbar-brand-container">
      <img src="/logo.webp" alt="ASIREA Logo" class="navbar-logo" />
      <span class="navbar-acronym">ASIREA</span>
    </div>

    <!-- Acciones -->
    <div class="navbar-actions">
      <a class="nav-link pe-0 py-0 lh-1 h-100 d-flex align-items-center me-3" href="/admin/sign-up">
        <div class="user-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="M12 2a5 5 0 1 0 0 10 5 5 0 1 0 0-10M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1">
            </path>
          </svg>
        </div>
      </a>
      <!-- Botón de cambio de tema -->
      <button class="theme-toggle-btn" @click="toggleTheme"
        :title="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
        <!-- Sol (modo claro) -->
        <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
          viewBox="0 0 24 24">
          <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
          <path
            d="M6.99 12c0 2.76 2.25 5.01 5.01 5.01s5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12M12 8.99c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01S8.99 13.66 8.99 12 10.34 8.99 12 8.99M13 19h-2v2h2zM11 5h2V3h-2zm-8 6h2v2H3zm16 0h2v2h-2zM4.93 17.66l.71.7.7.71.71-.71.71-.7-.71-.71-.71-.71-.7.71zM17.66 4.93l-.71.71-.71.7.71.71.71.71.7-.71.71-.71-.71-.7zM4.93 6.34l.71.71.7.71.71-.71.71-.71-.71-.7-.71-.71-.7.71zm12.73 12.73.7-.71.71-.7-.71-.71-.7-.71-.71.71-.71.71.71.7z">
          </path>
        </svg>
        <!-- Luna (modo oscuro) -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
          <path
            d="M12.2 22c4.53 0 8.45-2.91 9.76-7.24a1.002 1.002 0 0 0-1.25-1.25c-.78.23-1.58.35-2.38.35-4.52 0-8.2-3.68-8.2-8.2 0-.8.12-1.6.35-2.38.11-.35.01-.74-.25-1s-.64-.36-1-.25A10.17 10.17 0 0 0 2 11.8C2 17.42 6.57 22 12.2 22M8.18 4.65c-.03.34-.05.68-.05 1.02 0 5.62 4.57 10.2 10.2 10.2.34 0 .68-.02 1.02-.05C17.93 18.38 15.23 20 12.2 20 7.68 20 4 16.32 4 11.8a8.15 8.15 0 0 1 4.18-7.15">
          </path>
        </svg>
      </button>
      <button class="fullscreen-btn" @click="toggleFullscreen">
        <svg v-if="!fullscreen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
          fill="currentColor">
          <path
            d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
          fill="currentColor">
          <path
            d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z" />
        </svg>
      </button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useAuthStore from '@/store/authStore';

const fullscreen = ref(false);
const isDarkMode = ref(false);
const store = useAuthStore();

const logout = () => {
  store.logout();
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => { fullscreen.value = !fullscreen.value })
      .catch(err => {
        console.error("Error al entrar en pantalla completa:", err);
      });
  } else {
    fullscreen.value = !fullscreen.value
    document.exitFullscreen();
  }
};

// Toggle de tema
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

// Inicializar tema al montar
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  document.body.classList.toggle('dark-mode', isDarkMode.value);
});
</script>

<style scoped lang="scss">
* {
  padding: 0%;
  margin: 0%;
}

@include respond-to(mobile) {
  .admin-navbar {
    max-width: 100vw !important;
  }
}

.admin-navbar {
  position: sticky;
  width: 100%;
  top: 0;
  padding: 0.75em 1em;
  background: var(--primary-green-color);
  z-index: 1000;

  .theme-toggle-btn,
  .fullscreen-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.2s ease;

    >svg {
      color: #f0f0f0;
      scale: 1;
      transition: transform 0.3s ease;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);

      >svg {
        transform: scale(1.1);
      }
    }
  }

  .theme-toggle-btn {
    margin-right: 0.5rem;

    >svg {
      scale: 1;
    }
  }
}

// Branding
.navbar-brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar-logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.navbar-acronym {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

// Acciones
.navbar-actions {
  display: flex;
  align-items: center;
  height: 100%;
}


.user-icon {
  padding: auto;
  border: 2px solid #bbb8b8;
  border-radius: 50%;

  >svg {
    scale: .7;
    fill: #bbb8b8;
  }
}

a,
button {
  color: var(--text-secondary-clr);

  svg {
    opacity: 0.7;
  }
}
</style>
