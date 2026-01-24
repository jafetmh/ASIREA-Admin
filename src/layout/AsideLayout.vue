<template>
  <aside ref="aside" id="sidebar">
    <ul class="ps-0 mb-0">
      <li>
        <span class="logo">ASIREA</span>
        <button id="toggle-btn" class="btn_toggle" ref="toggleButton" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="currentColor">
            <path
              d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
          </svg>
        </button>
      </li>
      <li :class="{ active: isActive('/admin/init') }">
        <a href="/admin/init">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.15-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Zm9-8.59 6 6V20H6v-9.59z" />
          </svg>
          <span>Inicio</span>
        </a>
      </li>

      <li :class="{ active: isActive('/admin/noticias') }">
        <a href="/admin/noticias">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="M21.57 3.18a.98.98 0 0 0-.92-.11L7.82 8H4.01c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h3.81l1 .39-.47 1.4c-.33 1 .17 2.1 1.15 2.49l3.14 1.26c.24.09.49.14.74.14.29 0 .58-.06.84-.19.5-.23.88-.66 1.05-1.18l.42-1.27 4.93 1.9c.12.04.24.07.36.07.2 0 .4-.06.57-.18.27-.19.43-.5.43-.82V4c0-.33-.16-.64-.43-.82ZM4 10h3v4H4zm9.39 9.68-3.14-1.26.44-1.32 3.15 1.21-.45 1.36ZM20 18.55 9 14.32V9.69l11-4.23z">
            </path>
          </svg>
          <span>Publicaciones</span>
        </a>
      </li>
      <li :class="{ active: isActive('/admin/junta') }">
        <a href="/admin/junta">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="M12 11c1.71 0 3-1.29 3-3s-1.29-3-3-3-3 1.29-3 3 1.29 3 3 3m0-4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1m1 5h-2c-2.76 0-5 2.24-5 5v.5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V17c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm-1.5-6c.47 0 .9-.12 1.27-.33a5.03 5.03 0 0 1-.42-4.52C7.09 6.06 6.8 6 6.5 6 5.06 6 4 7.06 4 8.5S5.06 11 6.5 11m-.39 1H5.5C3.57 12 2 13.57 2 15.5v1c0 .28.22.5.5.5H4c0-1.96.81-3.73 2.11-5m11.39-1c1.44 0 2.5-1.06 2.5-2.5S18.94 6 17.5 6c-.31 0-.59.06-.85.15a5.03 5.03 0 0 1-.42 4.52c.37.21.79.33 1.27.33m1 1h-.61A6.97 6.97 0 0 1 20 17h1.5c.28 0 .5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5">
            </path>
          </svg>
          <span>Junta Directiva</span>
        </a>
      </li>
      <li :class="{ active: isActive('/admin/personal-admin') }">
        <a href="/admin/personal-admin">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="M10 13H8c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm7.73-11.49c-.08-.22-.19-.42-.3-.62v-.01c-.69-1.14-1.93-1.89-3.42-1.89-2.28 0-4 1.72-4 4s1.72 4 4 4c1.49 0 2.73-.74 3.42-1.89v-.01c.12-.2.22-.4.3-.62.02-.06.03-.12.05-.18.06-.17.11-.34.15-.52.05-.25.07-.51.07-.78s-.03-.53-.07-.78c-.03-.18-.09-.35-.15-.52-.02-.06-.03-.12-.05-.18M9 10c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2m6 0q-.165 0-.33-.03c-.22.66-.56 1.27-.98 1.81.41.13.84.22 1.31.22 2.28 0 4-1.72 4-4s-1.72-4-4-4c-.47 0-.9.09-1.31.22.43.53.76 1.14.98 1.81.11-.01.21-.03.33-.03 1.18 0 2 .82 2 2s-.82 2-2 2m1 3h-1.11c.6.58 1.08 1.27 1.44 2.03C17.83 15.2 19 16.46 19 18h-2v1c0 .35-.07.69-.18 1H20c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5">
            </path>
          </svg>
          <span>Personal <br>Administrativo</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
            transform="scale(1,-1) rotate(180)">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="M9 13h7v-2H9V7l-6 5 6 5z"></path>
            <path d="M19 3h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path>
          </svg>
          <span>Cerrar sesión</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useAuthStore from '@/store/authStore'

const aside = ref<HTMLElement | null>(null)
const authStore = useAuthStore()
const toggleButton = ref<HTMLElement | null>(null)
const subMenus = ref<HTMLElement[]>([])
const route = useRoute()

defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  }
})

const emit = defineEmits(['toggle'])

const isActive = (path: string) => {
  return route.path === path
}
onMounted(() => {
  if (aside.value) {
    subMenus.value = Array.from(aside.value.getElementsByClassName('sub-menu')) as HTMLElement[]
  }
})

function toggleSidebar() {
  emit('toggle')
  aside.value?.classList.toggle('close')
  toggleButton.value?.classList.toggle('rotate')
  closeAllSubMenus()
}

function toggleSubMenu(e: Event) {
  const button = e.currentTarget as HTMLElement
  const subMenu = button.nextElementSibling as HTMLElement | null
  if (subMenu) {
    if (!subMenu.classList.contains('show')) {
      closeAllSubMenus()
    }
    subMenu.classList.toggle('show')
    button.classList.toggle('rotate')
  }

  if (aside.value?.classList.contains('close')) {
    aside.value.classList.toggle('close')
    toggleButton.value?.classList.toggle('rotate')
  }
}

function closeAllSubMenus() {
  if (aside.value) {
    subMenus.value.forEach((ul) => {
      ul.classList.remove('show')
      ul.previousElementSibling?.classList.remove('rotate')
    })
  }
}

function logout() {
  authStore.logout()
}
</script>
<style scoped lang="scss">
#sidebar {
  box-sizing: border-box;
  height: calc(100vh - 58.84px);
  width: 250px;
  padding: .5em 0;
  background-color: var(--tertiary-bg);
  border-right: 1px solid var(--border-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  position: sticky;
  top: var(--top-var);
  align-self: start;
  transition: 300ms ease-in-out;
  overflow: hidden;
  text-wrap: nowrap;
}

#sidebar.close {
  padding: 5px;
  width: 60px;

  ul li.active a {
    border-radius: .5em;
  }
}


#sidebar.close ul li a {
  display: flex;
  justify-items: center;
}

#sidebar ul {
  list-style: none;
}

#sidebar>ul>li:first-child {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;

  .logo {
    font-weight: 600;
  }
}

#sidebar ul li.active a {
  width: 100%;
  color: var(--accent-color);
  background-color: var(--active-link);
}

#sidebar a,
#sidebar .dropdown-btn,
#sidebar .logo {
  padding: 0.85em;
  text-decoration: none;
  color: var(--text-secondary-clr);
  display: flex;
  align-items: center;
  gap: 1em;
}

#sidebar ul li a span,
#sidebar ul li button span,
li .sub-menu {
  font-size: 1em;
  font-weight: 400;
  color: var(--nav-link-active-color);
}

.dropdown-btn {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}

#sidebar svg {
  transform: scale(0.9);
  flex-shrink: 0;
}

#sidebar a span,
#sidebar .dropdown-btn span {
  flex-grow: 1;
}

#sidebar a:hover,
#sidebar .dropdown-btn:hover {
  background-color: var(--nav-link-active-hover);
}

#sidebar .sub-menu {

  display: grid;
  grid-template-rows: 0fr;
  transition: 300ms ease-in-out;

  >div {
    overflow: hidden;
  }
}

ul li a svg {
  color: var(--nav-link-active-color);
}

#sidebar .sub-menu.show {
  grid-template-rows: 1fr;
}

.dropdown-btn svg {
  transition: 200ms ease;
}

.rotate svg:last-child {
  rotate: 180deg;
}

#sidebar .sub-menu a {
  padding-left: 2em;
}

#toggle-btn {
  margin-left: auto;
  padding: 1em;
  border: none;
  border-radius: 0.5em;
  background: none;
  cursor: pointer;
  color: var(--text-secondary-clr);
  transition: background-color .3s ease;

  svg {
    transition: rotate 150ms ease;
  }
}

#toggle-btn:hover {
  background-color: var(--active-link);
}

.container {
  border: 1px solid var(--line-clr);
  border-radius: 1em;
  margin-bottom: 20px;
  padding: min(3em, 15%);

  h2,
  p {
    margin-top: 1em;
  }
}

@media (max-width: 800px) {

  #sidebar {
    z-index: 1000;
    height: 60px;
    width: 100%;
    border-right: none;
    border-top: 1px solid var(--border-color);
    padding: 0;
    position: fixed;
    top: unset;
    bottom: 0;

    >ul {
      justify-content: center;
      padding: 0;
      display: grid;
      grid-auto-columns: 60px;
      grid-auto-flow: column;
      align-items: center;
      overflow-x: scroll;
    }

    ul li {
      height: 100%;
    }

    ul a,
    ul .dropdown-btn {
      width: 60px;
      height: 60px;
      padding: 0;
      border-radius: 0;
      justify-content: center;
    }

    ul li span,
    ul li:first-child,
    .dropdown-btn svg:last-child {
      display: none;
    }

    ul li .sub-menu.show {
      position: fixed;
      bottom: 60px;
      left: 0;
      box-sizing: border-box;
      height: 60px;
      width: 100%;
      background-color: var(--aside-bg);
      border-top: 2px solid var(--border-color);
      display: flex;
      justify-content: center;

      >div {
        overflow-x: auto;
      }

      li {
        display: inline-flex;
      }

      a {
        box-sizing: border-box;
        padding: 1em;
        width: auto;
        justify-content: center;
      }
    }
  }
}
</style>
