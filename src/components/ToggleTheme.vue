<template>
  <!--Mobile switch toggle -->
  <div class="d-flex justify-content-between align-items-center mg-left">
    <div class="theme-label">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"
        class="menu-icon">
        <path
          d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Z" />
      </svg>
      <label>Modo oscuro</label>
    </div>
    <div class="form-check form-switch disable">
      <input id="bs-switch" class="form-check-input" type="checkbox" role="switch" @change="toggleTheme"
        v-model="store.darkMode" />
    </div>

    <!-- Desktop toggle -->
    <label id="toggle" class="theme-toggle toggle" title="Toggle theme">
      <input type="checkbox" @change="toggleTheme" v-model="store.darkMode" />
      <span class="theme-toggle-sr">Toggle theme</span>
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1.3em" height="1.3em" fill="currentColor"
        class="theme-toggle__expand" viewBox="0 0 32 32">
        <clipPath id="theme-toggle__expand__cutout">
          <path d="M0-11h25a1 1 0 0017 13v30H0Z" />
        </clipPath>
        <g clip-path="url(#theme-toggle__expand__cutout)">
          <circle cx="16" cy="16" r="8.4" />
          <path
            d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
        </g>
      </svg>
    </label>
  </div>
</template>

<script setup lang="ts">
import { Tooltip } from 'bootstrap'
import { onMounted } from 'vue'
import useAuthStore from '@/store/authStore'

const store = useAuthStore()
const emit = defineEmits(['theme-change'])

onMounted(() => {
  new Tooltip('#toggle', { placement: 'bottom', title: 'Tema', trigger: 'hover' });
  if (store.darkMode) {
    document.body.classList.add('dark-mode')
  }
})

function toggleTheme() {
  if (store.darkMode) {
    document.body.classList.add('dark-mode')
    localStorage.setItem('darkMode', 'enabled')
    store.darkMode = true;
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('darkMode', 'disabled')
    store.darkMode = false;
  }
  emit('theme-change', store.darkMode);
}
</script>

<style scoped lang="scss">
.form-check-input:checked {
  background-color: #212529;
  border-color: var(--border-color);
}

.form-check-input:focus {
  box-shadow: none;
}

.theme-label,
.input {
  @include display-control
}

@media (max-width: 990px) {
  .theme-label {
    display: block;
    color: var(--text-color-1);
    padding: 10px 0;
  }

  .menu-icon {
    margin-right: 10px;
  }

  .toggle {
    display: none;
  }
}

/* bs switch */
input:not(.input) {
  cursor: pointer;
}

@media (min-width: 990px) {

  .disable {
    @include display-control();
  }

  /* Desktop toggle styles */
  .toggle {
    z-index: 1;
    color: rgba(var(--white-rgb), 1);
    background-color: rgba(var(--black-rgb), .2);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    line-height: 1;
  }

  .icon {
    grid-area: 1 / 1;
    transition: transform 500ms ease-in-out;
  }

  .icon--moon {
    transition-delay: 200ms;
  }

  .icon--sun {
    transform: scale(0);
  }

  .toggle.theme-icon-effect .icon--moon {
    transform: rotate(360deg) scale(0);
    transition-delay: 0ms;
  }

  .toggle.theme-icon-effect .icon--sun {
    transition-delay: 200ms;
    transform: scale(1) rotate(360deg);
  }
}
</style>
