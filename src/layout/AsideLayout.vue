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
      <!--       <li>
        <button @click="toggleSubMenu($event)" class="dropdown-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="currentColor">
            <path
              d="m221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z" />
          </svg>
          <span>Todo-Lists</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="currentColor">
            <path
              d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
          </svg>
        </button>
        <ul class="sub-menu">
          <div>
            <li><a href="#">Work</a></li>
            <li><a href="#">Private</a></li>
            <li><a href="#">Coding</a></li>
            <li><a href="#">Gardening</a></li>
            <li><a href="#">School</a></li>
          </div>
        </ul>
      </li>
      <li :class="{ active: isActive('/admin/calendar') }">
        <a href="/admin/calendar">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="currentColor">
            <path
              d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
          </svg>
          <span>Calendar</span>
        </a>
      </li>
      <li :class="{ active: isActive('/admin/profile') }">
        <a href="/admin/profile">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="currentColor">
            <path
              d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          <span>Profile</span>
        </a>
      </li> -->
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const aside = ref<HTMLElement | null>(null)
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
</script>
<style scoped lang="scss">
#sidebar {
  box-sizing: border-box;
  height: calc(100vh - 58.84px);
  width: 250px;
  padding: 5px 1em;
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
  box-shadow: 0 1px 2px rgba(var(--black-rgb), 0.300);
  color: var(--accent-color);
  background-color: var(--nav-link-active-hover);
}

#sidebar a,
#sidebar .dropdown-btn,
#sidebar .logo {
  border-radius: 0.5em;
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
  background-color: rgba(var(--primary-green-color-rgb), .5);
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
