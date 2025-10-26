<template>
  <nav class="navbar navbar-expand-lg admin-navbar d-flex justify-content-end align-items-center">
    <div class="h-100">
      <a class="nav-link pe-0 py-0 lh-1 h-100 d-flex align-items-center me-3" href="/admin/sign-up">
        <div class="user-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#f0f0f0"
              d="M12 13c2.396 0 4.575.694 6.178 1.671c.8.49 1.484 1.065 1.978 1.69c.486.616.844 1.352.844 2.139c0 .845-.411 1.511-1.003 1.986c-.56.45-1.299.748-2.084.956c-1.578.417-3.684.558-5.913.558s-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C3.41 20.01 3 19.345 3 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69C7.425 13.694 9.605 13 12 13"
              class="duoicon-primary-layer" />
            <path fill="#fff"
              d="M12 2c3.849 0 6.255 4.167 4.33 7.5A5 5 0 0 1 12 12c-3.849 0-6.255-4.167-4.33-7.5A5 5 0 0 1 12 2"
              class="duoicon-secondary-layer" opacity="0.3" />
          </svg>
        </div>
      </a>
    </div>
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
  </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useAuthStore from '@/store/authStore';

const fullscreen = ref(false);
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
  padding: 1em;
  background: var(--primary-green-color);
  z-index: 1000;

  .fullscreen-btn {
    border: none;
    background-color: transparent;

    >svg {
      color: #f0f0f0;
      scale: 1.2;
    }
  }

}


.user-icon {
  padding: auto;
  border: 2px solid #bbb8b8;
  border-radius: 50%;
}

a,
button {
  color: var(--text-secondary-clr);

  svg {
    transform: scale(0.800);
    opacity: 0.7;
  }
}
</style>
