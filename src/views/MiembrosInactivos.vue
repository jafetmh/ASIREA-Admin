<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { type Member } from '@/interfaces/Member';
import { getMembersInactivos } from '@/api/services/JuntaDirectivaService';
import User from '@/components/icons/User.vue';

const membersList = ref<Member[]>([]);
const isLoading = ref(false);

const loadMembersInactivos = async () => {
  isLoading.value = true;
  try {
    const response = await getMembersInactivos();
    membersList.value = response.data;
  } catch (error) {
    console.error('Error al cargar miembros inactivos:', error);
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
  loadMembersInactivos();
});
</script>

<template>
  <div class="inactivos-container">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <RouterLink to="/admin/junta" class="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="M11.79 6.29 6.09 12l5.7 5.71 1.42-1.42L9.91 13H18v-2H9.91l3.3-3.29z"></path>
          </svg>
          Volver
        </RouterLink>
        <div class="title-section">
          <h1 class="empty-title">Miembros de Junta Inactivos</h1>
          <p class="subtitle">Registros de miembros que han sido dados de baja</p>
        </div>
      </div>
      <span class="badge-count">{{ membersList.length }} registros</span>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="loading-state">
      <p>Cargando...</p>
    </div>

    <!-- Lista de inactivos -->
    <div v-else-if="membersList.length > 0" class="list-container">
      <div class="list-header">
        <span class="col-avatar"></span>
        <span class="col-nombre">Nombre</span>
        <span class="col-puesto">Puesto</span>
        <span class="col-ocupacion">Ocupacion</span>
        <span class="col-fecha-registro">Fecha Registro</span>
        <span class="col-fecha-inactivo">Fecha Inactivo</span>
      </div>
      <div v-for="member in membersList" :key="member.id" class="list-item">
        <div class="col-avatar">
          <div class="avatar">
            <img v-if="member.foto" :src="member.foto" :alt="member.nombre" />
            <User v-else class="avatar-icon" />
          </div>
        </div>
        <span class="col-nombre">{{ member.nombre }}</span>
        <span class="col-puesto">{{ member.puesto }}</span>
        <span class="col-ocupacion">{{ member.ocupacion || '-' }}</span>
        <span class="col-fecha-registro">{{ formatDate(member.fechaRegistro) }}</span>
        <span class="col-fecha-inactivo">{{ formatDate(member.fechaInactivo) }}</span>
      </div>
    </div>

    <!-- Estado vacio -->
    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
        </svg>
      </div>
      <h3>No hay miembros inactivos</h3>
      <p>No se han registrado bajas de miembros de la junta directiva.</p>
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
  .empty-title {
    color: #343a40;
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
  }

  .subtitle {
    margin: 0.25rem 0 0 0;
    color: var(--subtitle-color);
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
  overflow: hidden;
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
  border-bottom: 1px solid var(--border-color);
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

  .list-header,
  .list-item {
    grid-template-columns: 50px 1fr 1fr 1fr;
  }

  .col-ocupacion,
  .col-fecha-registro {
    display: none;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .list-header {
    display: none;
  }

  .list-item {
    grid-template-columns: 50px 1fr;
    gap: 0.5rem;
    padding: 1rem;

    .col-puesto,
    .col-ocupacion,
    .col-fecha-registro {
      display: none;
    }

    .col-fecha-inactivo {
      font-size: 0.8rem;
    }
  }
}
</style>
