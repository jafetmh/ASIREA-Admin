<template>
  <div class="personal-admin-container">
    <!-- Hero Header -->
    <div class="hero-header">
      <div class="hero-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M10 13H8c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm7.73-11.49c-.08-.22-.19-.42-.3-.62v-.01c-.69-1.14-1.93-1.89-3.42-1.89-2.28 0-4 1.72-4 4s1.72 4 4 4c1.49 0 2.73-.74 3.42-1.89v-.01c.12-.2.22-.4.3-.62.02-.06.03-.12.05-.18.06-.17.11-.34.15-.52.05-.25.07-.51.07-.78s-.03-.53-.07-.78c-.03-.18-.09-.35-.15-.52-.02-.06-.03-.12-.05-.18M9 10c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2m6 0q-.165 0-.33-.03c-.22.66-.56 1.27-.98 1.81.41.13.84.22 1.31.22 2.28 0 4-1.72 4-4s-1.72-4-4-4c-.47 0-.9.09-1.31.22.43.53.76 1.14.98 1.81.11-.01.21-.03.33-.03 1.18 0 2 .82 2 2s-.82 2-2 2m1 3h-1.11c.6.58 1.08 1.27 1.44 2.03C17.83 15.2 19 16.46 19 18h-2v1c0 .35-.07.69-.18 1H20c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5">
          </path>
        </svg>
      </div>
      <div class="hero-content">
        <h1>Personal Administrativo</h1>
        <p class="subtitle">Gestión del personal administrativo</p>
      </div>
    </div>

    <div class="page-actions">
      <ButtonComponent label="Añadir Personal Administrativo" :rounded="true" class="btn-add" @click="openAddModal" />
    </div>

    <!-- Estado vacío -->
    <div v-if="!isLoading && personalList.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 13H8c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm7.73-11.49c-.08-.22-.19-.42-.3-.62v-.01c-.69-1.14-1.93-1.89-3.42-1.89-2.28 0-4 1.72-4 4s1.72 4 4 4c1.49 0 2.73-.74 3.42-1.89v-.01c.12-.2.22-.4.3-.62.02-.06.03-.12.05-.18.06-.17.11-.34.15-.52.05-.25.07-.51.07-.78s-.03-.53-.07-.78c-.03-.18-.09-.35-.15-.52-.02-.06-.03-.12-.05-.18M9 10c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2m6 0q-.165 0-.33-.03c-.22.66-.56 1.27-.98 1.81.41.13.84.22 1.31.22 2.28 0 4-1.72 4-4s-1.72-4-4-4c-.47 0-.9.09-1.31.22.43.53.76 1.14.98 1.81.11-.01.21-.03.33-.03 1.18 0 2 .82 2 2s-.82 2-2 2m1 3h-1.11c.6.58 1.08 1.27 1.44 2.03C17.83 15.2 19 16.46 19 18h-2v1c0 .35-.07.69-.18 1H20c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5" />
        </svg>
      </div>
      <h3>No hay personal registrado</h3>
      <p>Comienza agregando un nuevo miembro del personal administrativo.</p>
      <ButtonComponent label="Agregar Personal" :rounded="true" class="btn-add-empty" @click="openAddModal" />
    </div>

    <!-- Grid de tarjetas -->
    <div v-else-if="personalList.length > 0" class="cards-grid">
      <PersonalCard v-for="person in personalList" :key="person.id" :person="person" @edit="handleEdit"
        @delete="handleDelete" />
    </div>
    <PersonalAdminForm v-model="showForm" :is-edit="isEditing" :data="editingData" @submit="handleFormSubmit" />

    <!-- Diálogo de confirmación de eliminación -->
    <ConfirmDialog v-if="showDeleteDialog" header="Confirmar eliminación"
      :message="`¿Estás seguro de que deseas eliminar a '${personalToDelete?.nombre}' del personal administrativo?`"
      confirm-text="Eliminar" @confirm="confirmDelete" @cancel="cancelDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import PersonalCard from '@/components/PersonalCard.vue';
import PersonalAdminForm from '@/components/PersonalAdminForm.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { type Personal } from '@/interfaces/Personal';
import {
  getPersonalList,
  addPersonal,
  updatePersonal,
  deletePersonal
} from '@/api/services/AdministrativoService';

// Estado
const personalList = ref<Personal[]>([]);
const showForm = ref(false);
const isEditing = ref(false);
const editingData = ref<Partial<Personal>>({});
const isLoading = ref(false);

// Estado para diálogo de confirmación de eliminación
const showDeleteDialog = ref(false);
const personalToDelete = ref<Personal | null>(null);

// Cargar lista de personal desde la API
const loadPersonalList = async () => {
  isLoading.value = true;
  try {
    const response = await getPersonalList();
    personalList.value = response.data;
  } catch (error) {
    console.error('Error al cargar personal:', error);
  } finally {
    isLoading.value = false;
  }
};

// Abrir formulario para agregar nuevo personal
const openAddModal = () => {
  isEditing.value = false;
  editingData.value = {};
  showForm.value = true;
};

// Abrir formulario para editar personal existente
const handleEdit = (id: number) => {
  const person = personalList.value.find(p => p.id === id);
  if (person) {
    isEditing.value = true;
    editingData.value = { ...person };
    showForm.value = true;
  }
};

// Abrir diálogo de confirmación para eliminar
const handleDelete = (id: number) => {
  const person = personalList.value.find(p => p.id === id);
  if (person) {
    personalToDelete.value = person;
    showDeleteDialog.value = true;
  }
};

// Confirmar eliminación
const confirmDelete = async () => {
  if (!personalToDelete.value?.id) return;

  try {
    await deletePersonal(personalToDelete.value.id);
    showDeleteDialog.value = false;
    personalToDelete.value = null;
    await loadPersonalList();
  } catch (error) {
    console.error('Error al eliminar personal:', error);
  }
};

// Cancelar eliminación
const cancelDelete = () => {
  showDeleteDialog.value = false;
  personalToDelete.value = null;
};

// Manejar envío del formulario (agregar o editar)
const handleFormSubmit = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('puesto', data.puesto);
    formData.append('ocupacion', data.ocupacion);

    // Solo enviar el archivo si hay uno nuevo seleccionado
    if (data.fotoArchivo instanceof File) {
      formData.append('fotoArchivo', data.fotoArchivo);
    }

    if (editingData.value?.id) {
      // Actualizar personal existente
      await updatePersonal(editingData.value.id, formData);
    } else {
      // Agregar nuevo personal
      await addPersonal(formData);
    }

    await loadPersonalList();
    showForm.value = false;
    editingData.value = {};
  } catch (error) {
    console.error('Error al guardar personal:', error);
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  loadPersonalList();
});
</script>

<style scoped lang="scss">
.personal-admin-container {
  position: relative;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--content-bg);
  overflow: hidden;
  min-height: 100vh;

  &::before {
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
      linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0) 70%);
    -webkit-mask-image:
      url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd'%3E%3Cpath d='M0 18h6l6-6v6h6l-6 6H0M24 18v6h-6M24 0l-6 6h-6l6-6M12 0v6L0 18v-6l6-6H0V0'/%3E%3C/g%3E%3C/svg%3E"),
      linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0) 70%);
    mask-composite: intersect;
    -webkit-mask-composite: source-in;
    pointer-events: none;
    z-index: 0;
  }

  > .hero-header,
  > .page-actions,
  > .cards-grid,
  > .empty-state {
    position: relative;
    z-index: 1;
  }
}

// Estilo Hero
.hero-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;

  .hero-icon {
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, var(--primary-green-color) 0%, var(--btn-hover-green) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 40px;
      height: 40px;
      color: var(--btn-primary-text);
    }
  }

  .hero-content {
    flex: 1;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--title-color);
      margin: 0 0 0.25rem 0;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1rem;
      color: var(--text-color-1);
      margin: 0;
    }
  }
}

.page-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;

  .btn-add {
    background-color: var(--primary-green-color);
    color: var(--btn-primary-text);
    padding: 0.75rem 1.5rem;
    border: none;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      background-color: var(--btn-hover-green);
      box-shadow: 0 2px 8px rgba(var(--primary-green-color-rgb), 0.3);
      transform: translateY(-1px);
    }
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background-color: var(--empty-state-bg);
  border-radius: 12px;
  border: 2px dashed var(--border-color);

  .empty-icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, var(--bg-green-1) 0%, var(--bg-green) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;

    svg {
      color: var(--primary-green-color);
      opacity: 0.6;
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
    color: var(--text-color-1);
    margin: 0 0 1.5rem 0;
    max-width: 300px;
  }

  .btn-add-empty {
    background-color: var(--primary-green-color);
    color: var(--btn-primary-text);
    padding: 0.75rem 1.5rem;
    border: none;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--btn-hover-green);
      box-shadow: 0 2px 8px rgba(var(--primary-green-color-rgb), 0.3);
      transform: translateY(-1px);
    }
  }
}

@media (max-width: 768px) {
  .personal-admin-container {
    padding: 1rem;
  }

  .hero-header {
    margin-top: 20px;

    .hero-content h1 {
      font-size: 1.5rem;
    }
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;

    .btn-add {
      width: 100%;
    }
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .empty-state {
    padding: 2.5rem 1.5rem;

    .empty-icon {
      width: 80px;
      height: 80px;

      svg {
        width: 48px;
        height: 48px;
      }
    }

    h3 {
      font-size: 1.1rem;
    }

    p {
      font-size: 0.875rem;
    }
  }
}

@media (min-width: 1400px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
