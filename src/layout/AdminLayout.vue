<script setup lang="ts">
import { RouterView } from 'vue-router'
import Aside from './AsideLayout.vue';
import AdminNav from './AdminNav.vue';
import { ref } from 'vue';

const isAsideOpen = ref(true);

const toggleAside = () => {
  isAsideOpen.value = !isAsideOpen.value;
}
</script>

<template>
  <div :class="['admin-layout', { 'collapsed': !isAsideOpen }]">
    <AdminNav class="admin-nav"></AdminNav>
    <Aside :isClose="isAsideOpen" @toggle="toggleAside" class="aside"></Aside>
    <main class="main">
      <div>
        <RouterView></RouterView>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  margin-top: -20px;
  min-width: 0;
}

@include respond-to(mobile) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-layout.collapsed {
    grid-template-columns: 1fr;
  }

  main {
    padding: 0 0 60px 0;
  }
}


@include respond-to(tablet) {

  .admin-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    grid-template-areas:
      "navbar navbar"
      "sidebar main";
    transition: grid-template-columns 0.3s ease-in-out;
  }

  .admin-layout.collapsed {
    grid-template-columns: 60px 1fr;
  }

  .admin-nav {
    grid-area: navbar;
  }

  .aside {
    grid-area: sidebar;
    transition: width 0.3s ease-in-out;
  }

  .main {
    grid-area: main;
  }
}

.admin-layout.collapsed .aside {
  width: 60px;
  overflow: hidden;
}
</style>
