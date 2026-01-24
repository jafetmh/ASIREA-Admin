<template>
  <!-- Offcanvas para desktop -->
  <div
    class="offcanvas offcanvas-end offcanvas-desktop"
    :class="{ 'show': modelValue && !isMobile }"
    tabindex="-1"
    id="personalOffcanvas"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">{{ isEdit ? 'Actualizar datos de Personal' : 'Agregar datos de Personal' }}</h5>
      <button type="button" class="btn-close" @click="closeForm"></button>
    </div>
    <div class="offcanvas-body">
      <FormContent
        :form-data="formData"
        :errors="errors"
        :image-preview="imagePreview"
        :is-edit="isEdit"
        @update:nombre="formData.nombre = $event"
        @update:puesto="formData.puesto = $event"
        @update:ocupacion="formData.ocupacion = $event"
        @image-selected="onImageSelected"
        @remove-image="removeImage"
        @validate-nombre="validateNombre"
        @validate-puesto="validatePuesto"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </div>
  </div>

  <!-- Modal para mobile -->
  <Transition name="modal-fade">
    <div v-if="modelValue && isMobile" class="modal-backdrop" @click.self="closeForm">
      <div class="modal-container">
        <div class="modal-header">
          <h5>{{ isEdit ? 'Actualizar datos de Personal' : 'Agregar datos de Personal' }}</h5>
          <button class="close-btn" @click="closeForm">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <FormContent
            :form-data="formData"
            :errors="errors"
            :image-preview="imagePreview"
            :is-edit="isEdit"
            @update:nombre="formData.nombre = $event"
            @update:puesto="formData.puesto = $event"
            @update:ocupacion="formData.ocupacion = $event"
            @image-selected="onImageSelected"
            @remove-image="removeImage"
            @validate-nombre="validateNombre"
            @validate-puesto="validatePuesto"
            @submit="handleSubmit"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
  </Transition>

  <!-- Backdrop para offcanvas -->
  <div
    v-if="modelValue && !isMobile"
    class="offcanvas-backdrop fade show"
    @click="closeForm"
  ></div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import FormContent from './FormContent.vue';

interface FormData {
  nombre: string;
  puesto: string;
  ocupacion: string;
  foto?: string;
  fotoArchivo?: File | string;
}

interface Props {
  modelValue: boolean;
  isEdit?: boolean;
  data?: Partial<FormData>;
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
  data: () => ({})
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', data: FormData): void;
}>();

const formData = reactive<FormData>({
  nombre: '',
  puesto: '',
  ocupacion: '',
  foto: undefined,
  fotoArchivo: undefined
});

const errors = reactive({
  nombre: '',
  puesto: '',
  foto: ''
});

const imagePreview = ref<string>('');
const selectedFile = ref<File | null>(null);
const isMobile = ref(false);

// Detectar si es mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

// Watch para cargar datos cuando se edita
watch(() => props.data, (newData) => {
  if (newData) {
    formData.nombre = newData.nombre || '';
    formData.puesto = newData.puesto || '';
    formData.ocupacion = newData.ocupacion || '';
    formData.foto = newData.foto || undefined;

    if (newData.foto && typeof newData.foto === 'string') {
      imagePreview.value = newData.foto;
    }
  }
}, { immediate: true });

const validateNombre = () => {
  if (!formData.nombre.trim()) {
    errors.nombre = 'El nombre es requerido';
    return false;
  }
  if (formData.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
    return false;
  }
  errors.nombre = '';
  return true;
};

const validatePuesto = () => {
  if (!formData.puesto.trim()) {
    errors.puesto = 'El puesto es requerido';
    return false;
  }
  errors.puesto = '';
  return true;
};

const validateForm = () => {
  const isNombreValid = validateNombre();
  const isPuestoValid = validatePuesto();
  return isNombreValid && isPuestoValid;
};

const onImageSelected = (file: File) => {
  // Validar tipo de archivo
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    errors.foto = 'Solo se permiten archivos de imagen (JPG, PNG, GIF, WEBP)';
    selectedFile.value = null;
    imagePreview.value = '';
    return;
  }

  // Validar tamaño (máx 5MB)
  if (file.size > 5 * 1024 * 1024) {
    errors.foto = 'La imagen no debe superar los 5MB';
    selectedFile.value = null;
    imagePreview.value = '';
    return;
  }

  errors.foto = '';
  selectedFile.value = file;
  formData.fotoArchivo = file;
  imagePreview.value = URL.createObjectURL(file);
};

const removeImage = () => {
  selectedFile.value = null;
  imagePreview.value = '';
  formData.fotoArchivo = undefined;
  formData.foto = undefined;
};

const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }

  const submitData: FormData = {
    nombre: formData.nombre.trim(),
    puesto: formData.puesto.trim(),
    ocupacion: formData.ocupacion.trim(),
    foto: formData.foto,
    fotoArchivo: selectedFile.value || undefined
  };

  emit('submit', submitData);
  resetForm();
};

const closeForm = () => {
  emit('update:modelValue', false);
  resetForm();
};

const resetForm = () => {
  formData.nombre = '';
  formData.puesto = '';
  formData.ocupacion = '';
  formData.foto = undefined;
  formData.fotoArchivo = undefined;
  selectedFile.value = null;
  imagePreview.value = '';
  errors.nombre = '';
  errors.puesto = '';
  errors.foto = '';
};
</script>

<style scoped lang="scss">
// Offcanvas Desktop
.offcanvas-desktop {
  z-index: 1045;
  width: 500px !important;
  visibility: hidden;
  background-color: var(--bg-body);
  border-left: 1px solid var(--border-color);
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);

  &.show {
    visibility: visible;
    transform: translateX(0);
  }

  .offcanvas-header {
    padding: 1.5rem;
    background-color: var(--primary-green-color);
    border-bottom: 1px solid var(--border-color);

    .offcanvas-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--btn-primary-text);
      margin: 0;
    }

    .btn-close {
      filter: invert(1);
      opacity: 1;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .offcanvas-body {
    padding: 0;
  }
}

.offcanvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(var(--black-rgb), 0.5);
  pointer-events: auto;
}

// Modal Mobile
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(var(--black-rgb), 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-container {
  background-color: var(--bg-body);
  border-radius: 8px;
  max-width: 95vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(var(--black-rgb), 0.3);
  display: flex;
  flex-direction: column;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: var(--primary-green-color);
  border-bottom: 1px solid var(--border-color);

  h5 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--btn-primary-text);
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-1);
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: rotate(90deg);
    }
  }
}

.modal-body {
  overflow-y: auto;
  flex: 1;
  background: linear-gradient(135deg, var(--bg-green) 0%, var(--bg-green-1) 100%);
}

// Transiciones
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;

  .modal-container {
    transition: transform 0.3s ease;
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;

  .modal-container {
    transform: scale(0.95);
  }
}

@media (min-width: 768px) {
  .offcanvas-desktop {
    width: 550px !important;
  }
}

@media (min-width: 992px) {
  .offcanvas-desktop {
    width: 600px !important;
  }
}
</style>
