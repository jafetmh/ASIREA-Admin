<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { type Personal } from '@/interfaces/Personal';
import { getPersonalInactivos } from '@/api/services/AdministrativoService';
import User from '@/components/icons/User.vue';

const personalList = ref<Personal[]>([]);
const isLoading = ref(false);

const loadPersonalInactivos = async () => {
  isLoading.value = true;
  try {
    const response = await getPersonalInactivos();
    personalList.value = response.data;
  } catch (error) {
    console.error('Error al cargar personal inactivo:', error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  loadPersonalInactivos();
});
</script>

<template>
  <div class="inactivos-container">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <RouterLink to="/admin/personal-admin" class="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
          </svg>
          Volver
        </RouterLink>
        <div class="title-section">
          <h1>Personal Administrativo Inactivo</h1>
          <p class="subtitle">Registros de personal que han sido dados de baja</p>
        </div>
      </div>
      <span class="badge-count">{{ personalList.length }} registros</span>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="loading-state">
      <p>Cargando...</p>
    </div>

    <!-- Lista de inactivos -->
    <div v-else-if="personalList.length > 0" class="list-container">
      <div class="list-header">
        <span class="col-avatar"></span>
        <span class="col-nombre">Nombre</span>
        <span class="col-puesto">Puesto</span>
        <span class="col-ocupacion">Ocupación</span>
        <span class="col-fecha-registro">Fecha de Registro</span>
        <span class="col-fecha-inactivo">Fecha Inactivo</span>
      </div>
      <div v-for="person in personalList" :key="person.id" class="list-item">
        <div class="col-avatar">
          <div class="avatar">
            <img v-if="person.foto" :src="person.foto" :alt="person.nombre" />
            <User v-else class="avatar-icon" />
          </div>
        </div>
        <span class="col-nombre">{{ person.nombre }}</span>
        <span class="col-puesto">{{ person.puesto }}</span>
        <span class="col-ocupacion">{{ person.ocupacion || '-' }}</span>
        <span class="col-fecha-registro">{{ formatDate(person.fechaRegistro) }}</span>
        <span class="col-fecha-inactivo">{{ formatDate(person.fechaInactivo) }}</span>
      </div>
    </div>

    <!-- Estado vacio -->
    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
        </svg>
      </div>
      <h3>No hay personal inactivo</h3>
      <p>No se han registrado bajas de personal administrativo.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inactivos-container {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--border-color);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-green-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.title-section {
  h1 {
    margin: 0;
    color: #343a40;
    font-size: 1.75rem;
    font-weight: 600;
  }

  .subtitle {
    margin: 0.25rem 0 0 0;
    color: var(--text-secondary-clr);
    font-size: 0.95rem;
  }
}

.badge-count {
  background-color: var(--secondary-bg);
  color: var(--text-secondary-clr);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary-clr);
}

.list-container {
  background: var(--content-bg);
  border-radius: 12px;
  border: 2px solid var(--border-color);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.list-header {
  display: grid;
  grid-template-columns: 60px 1.5fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: var(--secondary-bg);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-secondary-clr);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.list-item {
  display: grid;
  grid-template-columns: 60px 1.5fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
  border-bottom: 1px solid var(--border-color-1);
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--secondary-bg);
  }
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--secondary-bg);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-icon {
    width: 60%;
    height: 60%;
    color: var(--text-secondary-clr);
  }
}

.col-nombre {
  font-weight: 500;
  color: var(--title-color);
}

.col-puesto {
  color: var(--primary-green-color);
  font-weight: 500;
}

.col-ocupacion,
.col-fecha-registro,
.col-fecha-inactivo {
  color: var(--text-secondary-clr);
  font-size: 0.9rem;
}

.col-fecha-inactivo {
  color: #dc3545;
  font-weight: 500;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background-color: var(--content-bg);
  border-radius: 12px;
  border: 2px dashed var(--border-color);

  .empty-icon {
    width: 100px;
    height: 100px;
    background: var(--secondary-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;

    svg {
      color: var(--text-secondary-clr);
      opacity: 0.5;
    }
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--title-color);
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 0.95rem;
    color: var(--text-secondary-clr);
    margin: 0;
  }
}

@media (max-width: 992px) {
  .inactivos-container {
    padding: 1.5rem;
  }

  .list-header,
  .list-item {
    min-width: 800px;
  }
}

@media (max-width: 768px) {
  .inactivos-container {
    padding: 1rem;
  }

  .page-header {
    margin-top: 20px;
    flex-direction: column;
    gap: 1rem;
  }

  .title-section {
    h1 {
      font-size: 1.35rem;
    }

    .subtitle {
      font-size: 0.85rem;
    }
  }

  .list-header,
  .list-item {
    min-width: 700px;
    padding: 0.875rem 1rem;
    gap: 0.75rem;
    font-size: 0.85rem;
  }

  .list-header {
    font-size: 0.75rem;
  }

  .avatar {
    width: 38px;
    height: 38px;
  }
}

@media (max-width: 480px) {
  .page-header {
    align-items: flex-start;
  }

  .title-section {
    h1 {
      font-size: 1.15rem;
    }
  }

  .badge-count {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }

  .btn-back {
    font-size: 0.85rem;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
