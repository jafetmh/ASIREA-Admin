<template>

  <!-- Encabezado -->
  <div class="page-header">
    <div class="header-title">
      <div class="noticia-div">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
          <path fill="#f0f0f0"
            d="M18.17 4.44h-1.34c-1.01 0-1.83.82-1.83 1.83v.45L5.5 8.76v-.51c0-.41-.34-.75-.75-.75S4 7.84 4 8.25v7c0 .41.34.75.75.75s.75-.34.75-.75v-.63l9.5 2.04v.45c0 1.01.82 1.83 1.83 1.83h1.34c1.01 0 1.83-.82 1.83-1.83V6.27c0-1.01-.82-1.83-1.83-1.83M5.5 13.08v-2.79L15 8.25v6.87zm13 4.03c0 .18-.15.33-.33.33h-1.34c-.18 0-.33-.15-.33-.33V6.27c0-.18.15-.33.33-.33h1.34c.18 0 .33.15.33.33zm-5.53.52a2.785 2.785 0 0 1-2.67 1.94c-1.54 0-2.8-1.24-2.8-2.75c0-.11 0-.23.02-.34c.05-.41.43-.7.84-.65s.7.42.65.83v.15c0 .69.58 1.25 1.3 1.25c.57 0 1.07-.36 1.24-.89c.12-.4.55-.62.94-.49c.4.12.61.55.49.94Z"
            stroke-width="0.5" stroke="#f0f0f0" />
        </svg>
      </div>
      <h2>Publicaciones</h2>
    </div>
    <ButtonComponent label="Crear publicación" :strong-label="true" :rounded="false" @click="openCreateModal"
      class="btn-create" />
  </div>

  <div class="noticias-container">
    <!-- Panel de filtros -->
    <div class="filter-panel">
      <div class="filter-label">Filtrar por categoría:</div>
      <div class="filter-buttons">
        <button :class="['filter-btn', { active: categoriaFiltro === 'Todas' }]" @click="limpiarFiltro">
          Todas
          <span class="badge">{{ allPublications.length }}</span>
        </button>
        <button :class="['filter-btn', { active: categoriaFiltro === 'Noticia' }]"
          @click="filtrarPorCategoria('Noticia')">
          Noticias
          <span class="badge">{{allPublications.filter(p => p.categoria === 'Noticia').length}}</span>
        </button>
        <button :class="['filter-btn', { active: categoriaFiltro === 'Proyecto' }]"
          @click="filtrarPorCategoria('Proyecto')">
          Proyectos
          <span class="badge">{{allPublications.filter(p => p.categoria === 'Proyecto').length}}</span>
        </button>
        <button :class="['filter-btn', { active: categoriaFiltro === 'Informe' }]"
          @click="filtrarPorCategoria('Informe')">
          Informes
          <span class="badge">{{allPublications.filter(p => p.categoria === 'Informe').length}}</span>
        </button>
        <button :class="['filter-btn', { active: categoriaFiltro === 'Ficha Tecnica' }]"
          @click="filtrarPorCategoria('Ficha Tecnica')">
          Fichas Técnicas
          <span class="badge">{{allPublications.filter(p => p.categoria === 'Ficha Tecnica').length}}</span>
        </button>
      </div>
    </div>

    <!-- Grid Noticias -->
    <div v-if="publications.length > 0" class="mt-3">
      <div class="noticias-grid">
        <div v-for="publication in publications" :key="publication.id" class="noticia-card">
          <div class="card-image">
            <div class="date-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{{ formatearFecha(publication.fechaCreacion) }}</span>
            </div>
            <img :src="publication.imagenUrl || '/noticia-default.png'" :alt="publication.titulo" />
          </div>
          <div class="card-content">
            <h3>{{ publication.titulo }}</h3>
            <p class="card-description">{{ publication.descripcion }}</p>
          </div>
          <div class="card-footer">
            <ButtonComponent label="Ver Publicación" :rounded="false" @click="openViewModal(publication)"
              class="btn-view" />
            <ButtonComponent label="Eliminar" :rounded="false" @click="openDeleteConfirm(publication)"
              class="btn-delete" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="publications.length == 0 && !loading"
      class="d-flex flex-column justify-content-center align-items-center empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M12 4.75a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5M3.25 12a8.75 8.75 0 1 1 17.5 0a8.75 8.75 0 0 1-17.5 0" />
        <path fill="currentColor"
          d="M19.31 20.543a.75.75 0 0 0 1.06-.025c2.092-2.193 3.38-5.203 3.38-8.518s-1.288-6.325-3.38-8.518a.75.75 0 0 0-1.086 1.036c1.832 1.92 2.966 4.56 2.966 7.482c0 2.921-1.134 5.563-2.966 7.482a.75.75 0 0 0 .025 1.06m-14.62 0a.75.75 0 0 0 .026-1.06C2.884 17.562 1.75 14.92 1.75 12s1.134-5.563 2.966-7.482A.75.75 0 0 0 3.63 3.482C1.538 5.675.25 8.685.25 12s1.288 6.325 3.38 8.518a.75.75 0 0 0 1.06.025M12 7c-.736 0-1.313.649-1.244 1.4l.494 4.15a.76.76 0 0 0 .75.7a.76.76 0 0 0 .75-.7l.494-4.15C13.314 7.65 12.736 7 12 7m0 10a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5"
          opacity="0.5" />
      </svg>
      <p>Sin registros...</p>
    </div>
    <div v-if="loading" class="loader-wrapper backdrop">
      <SecondLoaderComponent />
    </div>
    <FormModal v-model="showModal" :title="modalTitle" :is-edit="isEditMode" :data="selectedPublication"
      @submit="handleSubmit" />

    <ConfirmDialog v-if="showDeleteDialog" :header="'Confirmar eliminación'"
      :message="`¿Estás seguro de que deseas eliminar la noticia '${publicationToDelete?.titulo}'?`"
      :confirm-text="'Eliminar'" @confirm="handleDelete" @cancel="showDeleteDialog = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import FormModal from '@/components/FormModal.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import publicacionesFactory, { type CategoriaPublicacion } from '@/api/publicacionesFactory';
import { type Publication } from '@/interfaces/Publication';
import SecondLoaderComponent from '@/components/SecondLoaderComponent.vue';

const showModal = ref(false);
const isEditMode = ref(false);
const modalTitle = ref('');
const selectedPublication = ref<Partial<Publication>>({});
const allPublications = ref<Publication[]>([]); // Todas las publicaciones
const publications = ref<Publication[]>([]); // Publicaciones filtradas
const loading = ref(false);
const showDeleteDialog = ref(false);
const publicationToDelete = ref<Publication | null>(null);
const categoriaFiltro = ref<CategoriaPublicacion | 'Todas'>('Todas'); // Filtro actual

onMounted(async () => {
  await loadAllPublications();
});

//Carga todas las publicaciones de todas las categorías en paralelo
const loadAllPublications = async () => {
  try {
    loading.value = true;

    const categorias = publicacionesFactory.getCategorias();

    // Ejecutar todas las peticiones en paralelo
    const promises = categorias.map(async (categoria) => {
      const service = publicacionesFactory.getService(categoria);
      const response = await service.obtenerPublicaciones();
      return response.data || [];
    });

    // Esperar a que todas las peticiones terminen
    const resultados = await Promise.all(promises);
    allPublications.value = resultados.flat();
    aplicarFiltro();

  } catch (error) {
    console.error('Error al cargar publicaciones:', error);
  } finally {
    loading.value = false;
  }
};


//Aplica el filtro de categoría a las publicaciones
const aplicarFiltro = () => {
  if (categoriaFiltro.value === 'Todas') {
    publications.value = allPublications.value;
  } else {
    publications.value = allPublications.value.filter(
      pub => pub.categoria === categoriaFiltro.value
    );
  }
};


// Cambia el filtro de categoría
const filtrarPorCategoria = (categoria: CategoriaPublicacion | 'Todas') => {
  categoriaFiltro.value = categoria;
  aplicarFiltro();
};

const limpiarFiltro = () => {
  filtrarPorCategoria('Todas');
};

function formatearFecha(fechaISO: string) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

console.log(formatearFecha('2025-10-16')); // "16 de octubre de 2025"

const openCreateModal = () => {
  isEditMode.value = false;
  modalTitle.value = 'Crear Publicación';
  selectedPublication.value = {};
  showModal.value = true;
};

const openViewModal = (noticia: Publication) => {
  isEditMode.value = true;
  modalTitle.value = 'Ver Noticia';
  selectedPublication.value = { ...noticia };
  showModal.value = true;
};

const handleSubmit = async (data: any) => {
  try {
    loading.value = true;

    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('descripcion', data.descripcion);

    //validar campo categoria
    if (!data.categoria) {
      console.error('La categoría es requerida');
      return;
    }
    formData.append('categoria', data.categoria);
    if (data.imagen) {
      formData.append('imagenArchivo', data.imagen);
    }
    if (data.documento) {
      formData.append('documentoArchivo', data.documento);
    }

    // Obtener el servicio correcto según la categoría
    const service = publicacionesFactory.getService(data.categoria as CategoriaPublicacion);

    if (isEditMode.value && selectedPublication.value.id) {
      // Actualizar publicación existente
      const eliminarDocumento = !data.documentEnabled;
      formData.append('eliminarDocumento', eliminarDocumento.toString());

      await service.actualizarPublicacion(selectedPublication.value.id, formData);
    } else {
      await service.crearPublicacion(formData);
    }

    // Recargar publicaciones
    await loadAllPublications();
    showModal.value = false;
  } catch (error) {
    console.error('Error al guardar publicación:', error);
  } finally {
    loading.value = false;
  }
};

const openDeleteConfirm = (publication: Publication) => {
  publicationToDelete.value = publication;
  showDeleteDialog.value = true;
};

const handleDelete = async () => {
  if (!publicationToDelete.value?.id || !publicationToDelete.value?.categoria) return;

  try {
    loading.value = true;

    // Obtener el servicio según la categoría de la publicación a eliminar
    const service = publicacionesFactory.getService(publicationToDelete.value.categoria);

    await service.eliminarPublicacion(publicationToDelete.value.id);
    await loadAllPublications();
    showDeleteDialog.value = false;
    publicationToDelete.value = null;
  } catch (error: any) {
    console.error('Error al eliminar publicación:', error);
    if (error.response) {
      const message = error.response.data?.message || error.response.data?.error || 'Error al eliminar la publicación';
      alert(message);
    } else {
      alert('Error al eliminar la publicación');
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.empty,
.loader-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50% !important;
  left: 50%;
  transform: translate(-50%, -50%);
}


.noticias-container {
  position: relative;
  max-width: 100%;
  padding: 2rem;
  min-height: calc(100vh - 62.7px);
  background-color: #F0F0F0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23F0F0F0' stroke-width='.5' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cuse fill='%23eeeeee' href='%23s' y='2'/%3E%3Cuse fill='%23eeeeee' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23ebebeb' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23ebebeb' href='%23s'/%3E%3Cuse fill='%23e9e9e9' href='%23s' x='2'/%3E%3Cuse fill='%23e9e9e9' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23e6e6e6'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23e6e6e6'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23e4e4e4'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23F0F0F0'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e1e1e1'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%232E5540'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%232E5540'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(11 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%232E5540'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

// Panel de filtros
.filter-panel {
  background: #eff1f3;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(var(--black-rgb), 0.08);

  .filter-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-color-1);
    margin-bottom: 0.75rem;
  }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 6px;
      color: var(--text-secondary-clr);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--primary-green-color);
        background: rgba(46, 85, 64, 0.05);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(var(--black-rgb), 0.1);
      }

      &.active {
        background: var(--primary-green-color);
        border-color: var(--primary-green-color);
        color: white;
        box-shadow: 0 4px 12px rgba(46, 85, 64, 0.3);

        .badge {
          background: rgba(255, 255, 255, 0.25);
          color: white;
        }
      }

      .badge {
        background: var(--primary-green-color);
        color: white;
        padding: 0.15rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        min-width: 24px;
        text-align: center;
      }
    }
  }
}

.page-header {
  position: sticky;
  top: var(--top-var);
  background: var(--content-bg);
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem;
  border-bottom: 2px solid var(--border-color);

  .header-title {
    display: flex;
    align-items: center;
    gap: 1rem;

    .noticia-div {
      scale: 1;
      padding: 12px;
      border-radius: 5px;
      background-color: var(--primary-green-color);
      transition: scale .3s ease;

      svg {
        color: var(--accent-color);
      }
    }

    .noticia-div:hover {
      scale: 1.03;
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text-color-1);
    }
  }

  .btn-create {
    background-color: var(--accent-color);
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    box-shadow: -2px 2px 5px rgba(0, 0, 0, .5);
    scale: 1;
    transition: scale 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  .btn-create:active {
    scale: 0.98;
  }
}

.noticias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.noticia-card {
  background-color: var(--tertiary-bg);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(var(--black-rgb), 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(var(--black-rgb), 0.2);
  }

  .card-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-color: var(--bg-body);

    .date-badge {
      position: absolute;
      bottom: 12px;
      left: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      z-index: 10;

      svg {
        flex-shrink: 0;
        opacity: 0.9;
      }

      span {
        white-space: nowrap;
        letter-spacing: 0.3px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    &:hover .date-badge {
      background: rgba(46, 85, 64, 0.9);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }
  }

  .card-content {
    padding: 1.25rem;
    flex-grow: 1;

    h3 {
      margin: 0 0 0.75rem 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-color-1);
      line-height: 1.4;
    }

    .card-description {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-secondary-clr);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card-footer {
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
    background-color: var(--bg-body);
    display: flex;
    gap: 0.5rem;

    .btn-view {
      flex: 1;
      background-color: var(--primary-green-color);
      color: white;
      padding: 0.65rem 1rem;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background-color: #218838;
      }
    }

    .btn-delete {
      flex: 1;
      color: white;
      padding: 0.65rem 1rem;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}

// Responsive
@include respond-to(mobile-xs) {
  .noticias-container {
    padding: 1rem;
  }

  .filter-panel {
    padding: 1rem;

    .filter-label {
      font-size: 0.85rem;
    }

    .filter-buttons {
      gap: 0.5rem;

      .filter-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
        flex: 1 1 calc(50% - 0.25rem);
        justify-content: center;
      }
    }
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;

    .header-title {
      justify-content: center;

      h2 {
        font-size: 1.3rem;
      }

      svg {
        height: 24px;
        width: 24px;
      }
    }

    .btn-create {
      width: 100%;
      padding: 0.65rem 1rem;
      font-size: 0.9rem;
    }
  }

  .noticias-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .noticia-card .card-image {
    height: 180px;
  }
}

@include respond-to(mobile-sm) {
  .page-header {
    flex-direction: column;
    gap: 1rem;

    .header-title h2 {
      font-size: 1.4rem;
    }

    .btn-create {
      width: 100%;
      font-size: 0.95rem;
    }
  }

  .noticias-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .noticia-card .card-image {
    height: 190px;
  }
}

@include respond-to(mobile) {
  .page-header {
    flex-direction: row;

    .header-title {
      justify-content: flex-start;

      h2 {
        font-size: 1.5rem;
      }
    }

    .btn-create {
      width: auto;
    }
  }

  .noticias-grid {
    grid-template-columns: 1fr;
  }
}

@include respond-to(tablet) {
  .page-header .header-title h2 {
    font-size: 1.6rem;
  }

  .noticias-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .noticia-card .card-image {
    height: 200px;
  }
}

@include respond-to(desktop) {
  .noticias-container {
    padding: 2.5rem;
  }

  .page-header .header-title h2 {
    font-size: 1.8rem;
  }

  .noticias-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }

  .noticia-card .card-image {
    height: 220px;
  }
}

@include respond-to(desktop-lg) {
  .noticias-container {
    padding: 3rem;
  }

  .page-header .header-title {
    h2 {
      font-size: 2rem;
    }

    svg {
      height: 36px;
      width: 36px;
    }
  }

  .noticias-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .noticia-card .card-image {
    height: 240px;
  }
}

@include respond-to(desktop-xl) {
  .noticias-container {
    padding: 3.5rem;
  }

  .page-header .header-title h2 {
    font-size: 2.2rem;
  }

  .noticias-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .noticia-card .card-image {
    height: 250px;
  }
}
</style>
