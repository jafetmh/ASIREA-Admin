<template>
  <div class="dashboard-container">
    <!-- Hero Header -->
    <div class="hero-header">
      <div class="hero-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1m0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1M13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1" />
        </svg>
      </div>
      <div class="hero-content">
        <h1>Panel de Control</h1>
        <p class="subtitle">Bienvenido al sistema de administración de ASIREA</p>
      </div>
      <!-- Decorative SVG -->
      <svg class="hero-decoration" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" fill="currentColor">
        <path d="M426.8 227.6c41.1 27.1 37.7 25 42.5 27.7a1021 1021 0 0 1-73-6.1 49.1 49.1 0 0 1-10.3-4c-47.7-30.5-97.9-70.7-134.6-114.5-24-32.9-31.9-44.1-41.7-51.2-10.3-7.7-21.5-5.6-15.8 8.6 4.1 9.7 7.2 12.1 42.8 55.3a543.4 543.4 0 0 0 120.6 100.4c-76.1-12.2-151.9-33.4-218.6-72-7.7-4.5-15.2-8.6-22-13.3a7.2 7.2 0 0 0-10 1.5 7.2 7.2 0 0 0 1.5 10c59.4 49.3 152.9 77.9 228.1 92.5-82.8 5.5-252.2-2.3-275.7-7.9-10-2.4-14.3 8.1-6 14.4 49 22.1 262.9 17.4 319.5 0 25.7 3.9 52 6.8 78.6 8.7-8.8 3.3-20.5 10-60.3 26.8-54.4 22.8-96.7 34.5-152.6 26.3-9.3-1.4-19-2.9-28.7-5.6a8.3 8.3 0 1 0-5.1 15.9c30.5 11.8 60.9 16.5 104.8 9.2 53.9-9.3 99.3-33.6 143.7-57.9 10-5.6 22.3-8.3 33.5-12.8 22.5.8 42.4.9 62.6.5-34.6 26.7-78.6 70-121.5 96.5-18.4 11.4-46.9 24.4-67.8 24.6a8.8 8.8 0 0 0-9.3 8.4 8.8 8.8 0 0 0 8.4 9.3c29.2 3 54.5-8.5 79.5-24.8 45.3-29.1 90.4-77.1 130.2-114.5 35.8-1.5 73.9-4.8 113.9-11.2-64.5 67.8-161.5 150.2-175.6 153.3a8.5 8.5 0 0 0 2.5 16.7c39.9-3.9 167-137.2 194.4-173.6a716.6 716.6 0 0 0 80.6-19.5C645.4 416.2 641.1 418.9 639.4 431.7c-.6 11.3 12.2 14.4 18.4 8 63.4-65.6 112.7-146.7 149.5-201.4C938 193 985.7 121.6 922.8 161.6a503.4 503.4 0 0 1-107.3 50.5c-10.8-4.6-28-12.5-31.5-13.9-36.4-14.4-151.6-71.3-182.5-108.2-3.4-3.5-5.4-8.1-9.3-11.2-8-6.4-16.7 2.4-15.1 11.7 8.5 46.6 155 109.9 200.9 123.7l14.4 5.4c-20.5 6.3-42.3 12-69.6 17.6-38.1-18.3-110.4-45.7-171.8-89-20.2-14.2-48.2-49-58.4-53-19-7.4-25.1 3.3-10.9 18.3 22.6 20.9 40 39.4 58 51.5 49.1 33.1 99.6 54.9 158.6 77a975 975 0 0 1-108.5 12.7C530 222.3 428.7 132.4 400.7 72a6 6 0 1 0-11.3 4.1c3.4 11 8.9 23.4 17.2 36.1C439.9 163.6 513.4 225.3 566 256c-18.1.7-32.9.9-47.8.9-38.3-8.8-39.1-12.9-80.9-42.9-22.8-17.2-113.5-104.6-140-146.4-2.3-3.9-4.6-9-9.4-10.1-2.9-.5-5.6 1.8-6.4 5.4-.8 3.8 0 7.8.7 11.6 9.9 34.7 115.4 132.3 144.9 153.5Z" />
      </svg>
    </div>

    <!-- Stats Cards -->
    <div class="stats-section">
      <h2 class="section-title">Resumen de Publicaciones</h2>
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.categoria">
          <div class="stat-icon" :style="{ backgroundColor: stat.color }">
            <component :is="stat.icon" />
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stat.count }}</span>
            <span class="stat-label">{{ stat.categoria }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions-section">
      <h2 class="section-title">Acciones Rápidas</h2>
      <div class="actions-grid">
        <router-link to="/admin/noticias" class="action-card">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
              <path d="M5 7h5v6H5zm0 8h10v2H5zm7-4h3v2h-3zm0-4h3v2h-3z"></path>
              <path
                d="M21 18c0 .55-.45 1-1 1s-1-.45-1-1V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h16c1.65 0 3-1.35 3-3V6h-2zM4 19c-.55 0-1-.45-1-1V5h14v13c0 .35.07.69.18 1z">
              </path>
            </svg>
          </div>
          <span class="action-label">Nueva Publicación</span>
        </router-link>

        <router-link to="/admin/junta" class="action-card">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
              <path
                d="M12 11c1.71 0 3-1.29 3-3s-1.29-3-3-3-3 1.29-3 3 1.29 3 3 3m0-4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1m1 5h-2c-2.76 0-5 2.24-5 5v.5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V17c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm-1.5-6c.47 0 .9-.12 1.27-.33a5.03 5.03 0 0 1-.42-4.52C7.09 6.06 6.8 6 6.5 6 5.06 6 4 7.06 4 8.5S5.06 11 6.5 11m-.39 1H5.5C3.57 12 2 13.57 2 15.5v1c0 .28.22.5.5.5H4c0-1.96.81-3.73 2.11-5m11.39-1c1.44 0 2.5-1.06 2.5-2.5S18.94 6 17.5 6c-.31 0-.59.06-.85.15a5.03 5.03 0 0 1-.42 4.52c.37.21.79.33 1.27.33m1 1h-.61A6.97 6.97 0 0 1 20 17h1.5c.28 0 .5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5">
              </path>
            </svg>
          </div>
          <span class="action-label">Gestionar Junta</span>
        </router-link>

        <router-link to="/admin/personal-admin" class="action-card">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
              <path
                d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5">
              </path>
            </svg>
          </div>
          <span class="action-label">Personal Admin</span>
        </router-link>
      </div>
    </div>

    <!-- Important Publications -->
    <div class="important-section">
      <div class="section-header">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="m6.87 14.33-1.83 6.4c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02L12 18.2l5.45 3.63a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1.83-6.4 4.54-4.08c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-5.7-.45-2.47-5.46a.998.998 0 0 0-1.82 0L8.62 8.06l-5.7.45c-.4.03-.74.3-.87.68s-.02.8.28 1.06z">
            </path>
          </svg>
          Publicaciones Importantes
        </h2>
        <router-link to="/admin/noticias" class="view-all-link">Ver todas</router-link>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando publicaciones...</p>
      </div>

      <div v-else-if="importantPublications.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
          <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
          <path
            d="m6.87 14.33-1.83 6.4c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02L12 18.2l5.45 3.63a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1.83-6.4 4.54-4.08c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-5.7-.45-2.47-5.46a.998.998 0 0 0-1.82 0L8.62 8.06l-5.7.45c-.4.03-.74.3-.87.68s-.02.8.28 1.06z">
          </path>
        </svg>
        <p>No hay publicaciones marcadas como importantes</p>
        <small>Las publicaciones importantes aparecerán aquí</small>
      </div>

      <div v-else class="publications-grid">
        <article v-for="pub in importantPublications" :key="pub.id" class="publication-card">
          <div class="publication-image">
            <img v-if="pub.imagenUrl" :src="pub.imagenUrl" :alt="pub.titulo" />
            <div v-else class="no-image">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5z" />
              </svg>
            </div>
            <span class="category-badge" :class="getCategoryClass(pub.categoria)">
              {{ pub.categoria }}
            </span>
            <span class="important-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                <path
                  d="m6.87 14.33-1.83 6.4c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02L12 18.2l5.45 3.63a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1.83-6.4 4.54-4.08c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-5.7-.45-2.47-5.46a.998.998 0 0 0-1.82 0L8.62 8.06l-5.7.45c-.4.03-.74.3-.87.68s-.02.8.28 1.06z">
                </path>
              </svg>
            </span>
          </div>
          <div class="publication-content">
            <h3 class="publication-title">{{ pub.titulo }}</h3>
            <p class="publication-excerpt">{{ truncateText(pub.descripcion, 80) }}</p>
            <div class="publication-meta">
              <span class="publication-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                  <path
                    d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z">
                  </path>
                  <path d="M12 13h5v5h-5z"></path>
                </svg>
                {{ formatDate(pub.fechaCreacion) }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, h } from 'vue';
import type { Publication } from '@/interfaces/Publication';
import publicacionesFactory, { type CategoriaPublicacion } from '@/api/publicacionesFactory';

// Estado
const allPublications = ref<Publication[]>([]);
const isLoading = ref(false);

// Stats por categoría
const stats = computed(() => {
  const categorias: { categoria: string; color: string; icon: any }[] = [
    {
      categoria: 'Noticias',
      color: '#2e5540',
      icon: h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, fill: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M21.57 3.18a.98.98 0 0 0-.92-.11L7.82 8H4.01c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h3.81l1 .39-.47 1.4c-.33 1 .17 2.1 1.15 2.49l3.14 1.26c.24.09.49.14.74.14.29 0 .58-.06.84-.19.5-.23.88-.66 1.05-1.18l.42-1.27 4.93 1.9c.12.04.24.07.36.07.2 0 .4-.06.57-.18.27-.19.43-.5.43-.82V4c0-.33-.16-.64-.43-.82ZM4 10h3v4H4zm9.39 9.68-3.14-1.26.44-1.32 3.15 1.21-.45 1.36ZM20 18.55 9 14.32V9.69l11-4.23z' })
      ])
    },
    {
      categoria: 'Informes',
      color: '#1976d2',
      icon: h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, fill: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5zM9 13h6v2H9zm0 4h6v2H9zm0-8h4v2H9z' })
      ])
    },
    {
      categoria: 'Proyectos',
      color: '#7b1fa2',
      icon: h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, fill: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z' })
      ])
    },
    {
      categoria: 'Fichas Técnicas',
      color: '#f57c00',
      icon: h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, fill: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5zM9 13h6v2H9zm0 4h6v2H9z' })
      ])
    }
  ];

  return categorias.map(cat => {
    const count = allPublications.value.filter(p => {
      if (cat.categoria === 'Noticias') return p.categoria === 'Noticia';
      if (cat.categoria === 'Informes') return p.categoria === 'Informe';
      if (cat.categoria === 'Proyectos') return p.categoria === 'Proyecto';
      if (cat.categoria === 'Fichas Técnicas') return p.categoria === 'Ficha Tecnica';
      return false;
    }).length;
    return { ...cat, count };
  });
});

// Publicaciones importantes (las 3 más recientes marcadas como importantes)
const importantPublications = computed(() => {
  return allPublications.value
    .filter(p => p.importante)
    .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
    .slice(0, 3);
});

// Cargar todas las publicaciones
const loadAllPublications = async () => {
  isLoading.value = true;
  try {
    const categorias: CategoriaPublicacion[] = ['Noticia', 'Proyecto', 'Informe', 'Ficha Tecnica'];
    const promises = categorias.map(cat => publicacionesFactory.getService(cat).obtenerPublicaciones());
    const results = await Promise.all(promises);

    allPublications.value = results.flatMap((result, index) => {
      const data = result.data || result;
      return Array.isArray(data) ? data.map((p: Publication) => ({ ...p, categoria: categorias[index] })) : [];
    });
  } catch (error) {
    console.error('Error al cargar publicaciones:', error);
  } finally {
    isLoading.value = false;
  }
};

// Helpers
const truncateText = (text: string, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getCategoryClass = (category?: string) => {
  const classes: Record<string, string> = {
    'Noticia': 'cat-noticia',
    'Informe': 'cat-informe',
    'Proyecto': 'cat-proyecto',
    'Ficha Tecnica': 'cat-ficha'
  };
  return classes[category || ''] || '';
};

onMounted(() => {
  loadAllPublications();
});
</script>

<style scoped lang="scss">
.dashboard-container {
  position: relative;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--content-bg);
  overflow: hidden;
  min-height: 100vh;

/*   &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--pattern-color);
    opacity: var(--pattern-opacity);
    mask-image:
      url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd'%3E%3Cpath d='M0 18h6l6-6v6h6l-6 6H0M24 18v6h-6M24 0l-6 6h-6l6-6M12 0v6L0 18v-6l6-6H0V0'/%3E%3C/g%3E%3C/svg%3E"),
      linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0) 70%);
    -webkit-mask-image:
      url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd'%3E%3Cpath d='M0 18h6l6-6v6h6l-6 6H0M24 18v6h-6M24 0l-6 6h-6l6-6M12 0v6L0 18v-6l6-6H0V0'/%3E%3C/g%3E%3C/svg%3E"),
      linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0) 70%);
    mask-composite: intersect;
    -webkit-mask-composite: source-in;
    pointer-events: none;
    z-index: 0;
  } */

  >.hero-header,
  >.stats-section,
  >.quick-actions-section,
  >.important-section {
    position: relative;
    z-index: 1;
  }
}

// Hero Header
.hero-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-green-color) 0%, var(--btn-hover-green) 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  .hero-decoration {
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%) scaleX(-1) rotate(-15deg);
    width: 320px;
    height: auto;
    color: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    z-index: 0;
  }

  .hero-icon {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);

    svg {
      width: 32px;
      height: 32px;
      color: white;
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
    flex: 1;

    h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: white;
      margin: 0 0 0.25rem 0;
      line-height: 1.2;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }
  }
}

// Section Title
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--title-color);
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: var(--primary-green-color);
  }
}

// Stats Section
.stats-section {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--black-rgb), 0.1);
  }

  .stat-icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 28px;
      height: 28px;
      color: white;
    }
  }

  .stat-info {
    display: flex;
    flex-direction: column;

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--title-color);
      line-height: 1;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-color-1);
      margin-top: 0.25rem;
    }
  }
}

// Quick Actions
.quick-actions-section {
  margin-bottom: 2rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    border-color: var(--primary-green-color);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(var(--primary-green-color-rgb), 0.15);

    .action-icon {
      background-color: var(--primary-green-color);

      svg {
        color: var(--btn-primary-text);
      }
    }
  }

  .action-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background-color: var(--tertiary-bg-1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    svg {
      width: 28px;
      height: 28px;
      color: var(--primary-green-color);
      transition: color 0.3s ease;
    }
  }

  .action-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--title-color);
    text-align: center;
  }
}

// Important Section
.important-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .view-all-link {
    font-size: 0.875rem;
    color: var(--primary-green-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: var(--btn-hover-green);
      text-decoration: underline;
    }
  }
}

.publications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.publication-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(var(--black-rgb), 0.12);
  }

  .publication-image {
    position: relative;
    height: 160px;
    background-color: var(--tertiary-bg);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .no-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-color-2);
    }

    .category-badge {
      position: absolute;
      bottom: 0.75rem;
      left: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      color: white;

      &.cat-noticia {
        background-color: #2e5540;
      }

      &.cat-informe {
        background-color: #1976d2;
      }

      &.cat-proyecto {
        background-color: #7b1fa2;
      }

      &.cat-ficha {
        background-color: #f57c00;
      }
    }

    .important-badge {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: rgba(248, 152, 17, .8);
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: #5d4e00;
      }
    }
  }

  .publication-content {
    padding: 1rem;

    .publication-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--title-color);
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .publication-excerpt {
      font-size: 0.875rem;
      color: var(--text-color-1);
      margin: 0 0 0.75rem 0;
      line-height: 1.5;
    }

    .publication-meta {
      display: flex;
      align-items: center;

      .publication-date {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.8rem;
        color: var(--text-color-1);

        svg {
          opacity: 0.7;
        }
      }
    }
  }
}

// Loading & Empty States
.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background-color: var(--empty-state-bg);
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  text-align: center;

  svg {
    color: var(--primary-green-color);
    opacity: 0.5;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: var(--title-color);
    margin: 0;
  }

  small {
    font-size: 0.875rem;
    color: var(--text-color-1);
    margin-top: 0.5rem;
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary-green-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Responsive
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .hero-header {
    margin-top: 20px;
    padding: 1rem;
    border-radius: 0 0 12px 12px;

    .hero-icon {
      width: 50px;
      height: 50px;

      svg {
        width: 26px;
        height: 26px;
      }
    }

    .hero-content h1 {
      font-size: 1.35rem;
    }

    .hero-content .subtitle {
      font-size: 0.85rem;
    }

    .hero-decoration {
      width: 200px;
      right: -60px;
      opacity: 0.6;
    }
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .action-card {
    padding: 1rem;

    .action-icon {
      width: 48px;
      height: 48px;
    }

    .action-label {
      font-size: 0.8rem;
    }
  }

  .publications-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-header {
    .hero-decoration {
      display: none;
    }
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .action-card {
    flex-direction: row;
    justify-content: flex-start;
    padding: 1rem;
  }
}
</style>
