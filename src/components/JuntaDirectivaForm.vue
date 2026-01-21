<!-- JuntaDirectivaForm.vue -->
<template>
  <Transition name="modal-fade">
    <div v-if="modelValue" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h5>{{ isEdit ? 'Editar Miembro de Junta' : 'Agregar Miembro de Junta' }}</h5>
          <button class="close-btn" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
              fill="currentColor">
              <path
                d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-section">
            <form @submit.prevent="handleSubmit">
              <!-- Campo Nombre -->
              <div class="form-floating">
                <InputComponent id="nombre" v-model="formData.nombre" placeholder="Ingrese el nombre completo"
                  :error="!!errors.nombre" @blur="validateNombre" required class="form-control" />
                <label for="nombre">Nombre Completo <span class="required">*</span></label>
              </div>
              <div v-if="errors.nombre" class="error-message">{{ errors.nombre }}</div>

              <!-- Campo Puesto -->
              <div class="form-floating">
                <InputComponent id="puesto" v-model="formData.puesto" placeholder="Ingrese el puesto"
                  :error="!!errors.puesto" @blur="validatePuesto" required class="form-control" />
                <label for="puesto">Puesto en la Junta <span class="required">*</span></label>
              </div>
              <div v-if="errors.puesto" class="error-message">{{ errors.puesto }}</div>

              <!-- Campo Ocupación (Opcional) -->
              <div class="form-floating">
                <InputComponent id="ocupacion" v-model="formData.ocupacion"
                  placeholder="Ingrese la ocupación profesional" class="form-control" />
                <label for="ocupacion">Ocupación Profesional <span class="optional">(Opcional)</span></label>
              </div>

              <!-- Campo Foto -->
              <div id="file">
                <div class="form-floating">
                  <label for="foto">Fotografía</label>
                  <input type="file" id="foto" ref="imageInput"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" @change="onImageSelected"
                    class="form-control file-input" />
                </div>
                <small class="file-help">Formatos: JPG, PNG, GIF, WEBP. Máx: 5MB</small>
              </div>
              <div v-if="errors.foto" class="error-message">{{ errors.foto }}</div>
            </form>
          </div>

          <div class="preview-section">
            <!-- Preview de la imagen -->
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Preview" />
              <button type="button" class="btn-remove-image" @click="removeImage">
                Remover imagen
              </button>
            </div>
            <div v-else class="no-preview">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px"
                fill="currentColor">
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
              </svg>
              <p>Sin imagen</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="form-actions">
            <ButtonComponent type="button" label="Cancelar" :strong-label="true" :rounded="false" @click="closeModal"
              class="btn-secondary" />
            <ButtonComponent type="submit" :label="isEdit ? 'Guardar Cambios' : 'Guardar'" :rounded="false" @click="handleSubmit"
              class="btn-primary" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';

interface FormData {
  nombre: string;
  puesto: string;
  ocupacion: string;
  foto?: string;
  fotoArchivo?: File | string
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

const imageInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string>('');
const selectedFile = ref<File | null>(null);

// Computed para verificar si el formulario es válido
const isFormValid = computed(() => {
  return formData.nombre.trim() !== '' &&
    formData.puesto.trim() !== '';
});

// Validaciones
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

// Watch para cargar datos cuando se edita
watch(() => props.data, (newData) => {
  if (newData) {
    formData.nombre = newData.nombre || '';
    formData.puesto = newData.puesto || '';
    formData.ocupacion = newData.ocupacion || '';
    formData.foto = newData.foto || undefined;

    // Si hay una URL de foto, mostrarla en el preview
    if (newData.foto && typeof newData.foto === 'string') {
      imagePreview.value = newData.foto;
    }
  }
}, { immediate: true });

const onImageSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

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
  }
};

const removeImage = () => {
  selectedFile.value = null;
  imagePreview.value = '';
  formData.fotoArchivo = undefined;
  if (imageInput.value) {
    imageInput.value.value = '';
  }
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

const closeModal = () => {
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

  if (imageInput.value) imageInput.value.value = '';
};
</script>

<style scoped lang="scss">
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
  background-color: var(--bg-green);
  border-radius: 5px;
  max-width: 95vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(var(--black-rgb), 0.3);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--primary-green-color);

  h5 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color-2);
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
    color: var(--text-secondary-clr);
    background-color: var(--bg-body);
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 10px 1.5rem;
  overflow-y: auto;
  background-color: #b5c2b7;
  flex: 1 1 0%;
  min-height: 0;
}

.form-section {
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 0;
  }
}

#file .form-floating>label {
  padding-top: 0 !important;
}

.form-control {
  border-color: var(--border-color);
  background-color: var(--tertiary-bg);
  transition: all .3s ease-in-out;
}

.form-control:focus {
  box-shadow: 0 3px 5px var(--primary-green-color);
}

.file-input {
  padding: 0.75rem !important;
  border: 2px dashed #0a8326 !important;
  border-radius: 6px;
  background-color: var(--bg-body);
  color: var(--text-secondary-clr);
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--accent-color);
  }
}

.file-help {
  display: block;
  margin-top: 0.25rem;
  color: var(--text-secondary-clr);
  font-size: 0.75rem;
  opacity: 0.8;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.required {
  color: #dc3545;
}

.optional {
  color: var(--text-secondary-clr);
  font-weight: 400;
  font-size: 0.875rem;
  opacity: 0.7;
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  background: #b5c2b7;
  flex-shrink: 0;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  button {
    min-width: 100px;
    padding: 0.75rem 1.5rem;
  }

  .btn-secondary {
    background-color: var(--tertiary-bg);
    border: 1px solid var(--border-color);
    transition: all .3s ease;

    &:hover {
      box-shadow: 0 2px 2px rgba(46, 85, 64, .5);
    }
  }

  .btn-primary {
    background-color: var(--primary-green-color);
    color: var(--text-color);

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.preview-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-preview {
  width: 100%;
  max-height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--border-color);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.btn-remove-image {
  width: 100%;
  padding: 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #bb2d3b;
  }
}

.no-preview {
  width: 100%;
  min-height: 200px;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-secondary-clr);
  opacity: 0.6;

  svg {
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
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
    transform: scale(0.9);
  }
}

// Responsive
@media (max-width: 576px) {
  .modal-header h5 {
    font-size: 1rem;
  }

  .form-actions button {
    min-width: 80px;
    font-size: 0.85rem;
  }
}

@media (min-width: 768px) {
  .modal-container {
    max-width: 85vw;
  }

  .modal-body {
    flex-direction: row;
    gap: 2rem;
  }

  .form-section,
  .preview-section {
    width: 50%;
  }

  .image-preview {
    max-height: 400px;
  }
}

@media (min-width: 992px) {
  .modal-container {
    width: 60vw;
    max-width: 1200px;
  }

  .modal-header h5 {
    font-size: 1.4rem;
  }

  .image-preview {
    max-height: 500px;
  }
}

@media (min-width: 1200px) {
  .modal-container {
    max-width: 1000px;
  }

  .modal-header h5 {
    font-size: 1.5rem;
  }
}
</style>
