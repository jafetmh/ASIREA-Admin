<script setup lang="ts">
import { ref, onMounted } from 'vue';
import JuntaDirectivaForm from '@/components/JuntaDirectivaForm.vue';
import { type Member } from '@/interfaces/Member';
import { addMember, deleteMember, getMembers, updateMember } from '@/api/services/JuntaDirectivaService';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import Pencil from '@/components/icons/buttons/Pencil.vue';
import DeleteMember from '@/components/icons/buttons/DeleteMember.vue';
import User from '@/components/icons/User.vue';

// Estado
const isEditMode = ref(false);
const members = ref<Member[]>([]);
const showModal = ref(false);
const isLoading = ref(false);
const selectedMember = ref<Partial<Member>>({});


//manejo de dialogo de confirmacion
const showDeleteDialog = ref(false);
const memberToDelete = ref<Member | null>(null);

const openDeleteConfirm = (member: Member) => {
  memberToDelete.value = member;
  showDeleteDialog.value = true;
};

//Abrir formulario modal
const openViewModal = (member: Member) => {
  isEditMode.value = true;
  selectedMember.value = { ...member };
  showModal.value = true;
};

// Cargar miembros desde la API
const loadMembers = async () => {
  isLoading.value = true;
  try {
    const rs = await getMembers();
    members.value = rs.data;
  } catch (error) {
    console.error('Error al cargar miembros:', error);
  } finally {
    isLoading.value = false;
  }
};

// Eliminar miembro
const handleDelete = async () => {
  if (!memberToDelete.value?.id) return;

  try {
    await deleteMember(memberToDelete.value.id);
    showDeleteDialog.value = false;
    memberToDelete.value = null;
  } catch (error) {
    console.error('Error al eliminar miembro:', error);
  }
  await loadMembers();
};


// Abrir modal para agregar nuevo miembro de junta
const handleAdd = () => {
  isEditMode.value = false;
  selectedMember.value = {};
  showModal.value = true;
};

// Cerrar modal
const closeModal = () => {
  showModal.value = false;
  selectedMember.value = {};
};

// Manejar guardado exitoso
const handleSubmit = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('puesto', data.puesto);
    formData.append('ocupacion', data.ocupacion);

    // Solo enviar el archivo si hay uno nuevo seleccionado
    if (data.fotoArchivo instanceof File) {
      formData.append('fotoArchivo', data.fotoArchivo);
    }

    if (selectedMember.value?.id && selectedMember) {
      // Actualizar miembro existente
      await updateMember(selectedMember.value.id, formData)
    } else {
      // Agregar nuevo miembro
      await addMember(formData);
    }
    await loadMembers();
    closeModal();
  } catch (error) {
    console.error('Error al guardar miembro:', error);
  }
};

onMounted(() => {
  loadMembers();
});
</script>

<template>
  <div class="junta-directiva-container">
    <!-- Header -->
    <div class="header-section">
      <div class="header-content">
        <div class="title-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="M12 11c1.71 0 3-1.29 3-3s-1.29-3-3-3-3 1.29-3 3 1.29 3 3 3m0-4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1m1 5h-2c-2.76 0-5 2.24-5 5v.5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V17c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm-1.5-6c.47 0 .9-.12 1.27-.33a5.03 5.03 0 0 1-.42-4.52C7.09 6.06 6.8 6 6.5 6 5.06 6 4 7.06 4 8.5S5.06 11 6.5 11m-.39 1H5.5C3.57 12 2 13.57 2 15.5v1c0 .28.22.5.5.5H4c0-1.96.81-3.73 2.11-5m11.39-1c1.44 0 2.5-1.06 2.5-2.5S18.94 6 17.5 6c-.31 0-.59.06-.85.15a5.03 5.03 0 0 1-.42 4.52c.37.21.79.33 1.27.33m1 1h-.61A6.97 6.97 0 0 1 20 17h1.5c.28 0 .5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5">
            </path>
          </svg>
          <h2 class="main-title">Junta Directiva</h2>
        </div>
        <button class="btn-add" @click="handleAdd">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z">
            </path>
          </svg>
          Agregar Miembro
        </button>
      </div>
      <p class="subtitle">Gestión de miembros de la junta directiva</p>
    </div>

    <!-- Members Grid -->
    <div class="members-grid">
      <div v-for="member in members" :key="member.id" class="member-card">
        <!-- Card Header with Image -->
        <div class="card-header">
          <div class="avatar-container">
            <img v-if="member.foto" :src="member.foto" :alt="member.nombre" class="avatar-image" />
            <User v-else class="avatar-icon" />
          </div>
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <h5 class="member-name">{{ member.nombre }}</h5>

          <div class="info-container">
            <div class="info-item">
              <span class="info-label">Puesto</span>
              <p class="info-value-puesto">{{ member.puesto }}</p>
            </div>

            <div class="info-item">
              <span class="info-label">Ocupación</span>
              <p class="info-value">{{ member.ocupacion }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <ButtonComponent :is-icon="Pencil" label="Actualizar" :rounded="false" @click="openViewModal(member)" class="btn-view" />
            <ButtonComponent :is-icon="DeleteMember" label="Eliminar" :rounded="false" @click="openDeleteConfirm(member)" class="btn-delete" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="members.length === 0" class="empty-state">
      <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
        viewBox="0 0 24 24">
        <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
        <path
          d="M4 8c0 2.28 1.72 4 4 4s4-1.72 4-4-1.72-4-4-4-4 1.72-4 4m6 0c0 1.18-.82 2-2 2s-2-.82-2-2 .82-2 2-2 2 .82 2 2M3 20h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1m4-5h2c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3m14-3.5c0-2-1.5-3.5-3.5-3.5S14 9.5 14 11.5s1.5 3.5 3.5 3.5c.62 0 1.18-.16 1.67-.42l2.12 2.12 1.41-1.41-2.12-2.12c.26-.49.42-1.05.42-1.67M17.5 13c-.88 0-1.5-.62-1.5-1.5s.62-1.5 1.5-1.5 1.5.62 1.5 1.5-.62 1.5-1.5 1.5">
        </path>
      </svg>
      <h4 class="empty-title">No hay miembros registrados</h4>
      <p class="empty-text">Comienza agregando el primer miembro de la junta directiva</p>
      <button class="btn-add-empty" @click="handleAdd">
        Agregar Primer Miembro
      </button>
    </div>

    <!-- Modal Formulario -->
    <JuntaDirectivaForm v-model="showModal" :is-edit="isEditMode" :data="selectedMember" @submit="handleSubmit" />

    <ConfirmDialog v-if="showDeleteDialog" :header="'Confirmar eliminación'"
      :message="`¿Estás seguro de que deseas eliminar a '${memberToDelete?.nombre}' de la Junta?`"
      :confirm-text="'Eliminar'" @confirm="handleDelete" @cancel="showDeleteDialog = false" />
  </div>
</template>

<style scoped>
.junta-directiva-container {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Header Styles */
.header-section {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-users {
  color: #2d5f4d;
}

.main-title {
  margin: 0;
  color: #2d5f4d;
  font-size: 1.75rem;
  font-weight: 600;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #2d5f4d;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-add:hover {
  background-color: #234a3d;
}

.subtitle {
  color: #6c757d;
  margin: 0;
}

/* Members Grid */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.member-card {
  border: 2px solid var(--border-color);
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

/* .member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
} */

/* Card Header */
.card-header {
  background-color: #2d5f4d;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.avatar-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-icon {
  width: 60%;
  height: 60%;
  color: #2d5f4d;
  opacity: 0.7;
}

/* Card Body */
.card-body {
  padding: 1.25rem;
}

.member-name {
  margin: 0 0 0.5rem 0;
  color: #2d5f4d;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.info-container {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
}

.info-item {
  margin-bottom: 0.5rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.info-value-puesto {
  margin: 0.25rem 0 0 0;
  color: #2d5f4d;
  font-weight: 600;
}

.info-value {
  margin: 0.25rem 0 0 0;
  color: #495057;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

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
  background-color: #dc3545;
  color: white;
  padding: 0.65rem 1rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  color: #dee2e6;
  margin-bottom: 1rem;
}

.empty-title {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.empty-text {
  color: #adb5bd;
  margin-bottom: 1.5rem;
}

.btn-add-empty {
  padding: 0.625rem 1.5rem;
  background-color: #2d5f4d;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
}

.btn-add-empty:hover {
  background-color: #234a3d;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
}

.modal-title {
  margin-bottom: 1rem;
  color: #2d5f4d;
}

.modal-text {
  color: #6c757d;
}

.btn-close-modal {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-close-modal:hover {
  background-color: #5a6268;
}
</style>
