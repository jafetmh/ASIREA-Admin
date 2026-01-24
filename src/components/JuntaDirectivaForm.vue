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
                <label for="ocupacion">Ocupación <span class="optional">(Opcional)</span></label>
              </div>
            </form>
          </div>

          <div class="preview-section">
            <!-- Input oculto -->
            <input type="file" id="foto" ref="imageInput" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              @change="onImageSelected" style="display: none;" />

            <!-- Zona de upload interactiva -->
            <div class="upload-zone" :class="{ 'has-image': imagePreview }" @click="triggerFileInput">
              <!-- Placeholder cuando no hay imagen -->
              <div v-if="!imagePreview" class="upload-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z">
                  </path>
                  <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                </svg>
                <p>
                  <strong>Clic para agregar fotografía</strong>
                  o arrastra una imagen aquí
                </p>
                <small class="file-help">Formatos: JPG, PNG, GIF, WEBP. Máx: 5MB</small>
              </div>

              <!-- Preview cuando hay imagen -->
              <div v-else class="image-preview" @click.stop>
                <img :src="imagePreview" alt="Preview" />
                <div class="image-actions">
                  <button type="button" class="btn-change-image" @click="triggerFileInput">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                      <path
                        d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z">
                      </path>
                      <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                    </svg>
                    Cambiar
                  </button>
                  <button type="button" class="btn-remove-image" @click="removeImage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                      <path
                        d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z">
                      </path>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
            <div v-if="errors.foto" class="error-message">{{ errors.foto }}</div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="form-actions">
            <ButtonComponent type="button" label="Cancelar" :strong-label="true" :rounded="false" @click="closeModal"
              class="btn-secondary" />
            <ButtonComponent type="submit" :label="isEdit ? 'Guardar Cambios' : 'Guardar'" :rounded="false"
              @click="handleSubmit" :disabled="!isFormValid" class="btn-primary" />
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

const triggerFileInput = () => {
  imageInput.value?.click();
};

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
  formData.foto = undefined;
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
  border-radius: 8px;
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
    color: var(--text-secondary-clr);
    background-color: var(--bg-body);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--tertiary-bg);
      transform: rotate(90deg);
    }
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: var(--bg-body);
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

.form-control {
  border-color: var(--border-color);
  background-color: var(--form-input-bg);
  color: var(--text-color-3);
  transition: all .3s ease-in-out;
  backdrop-filter: blur(5px);

  &:focus {
    background-color: var(--form-input-bg-focus);
    box-shadow: 0 3px 8px rgba(var(--primary-green-color-rgb), 0.15);
    border-color: var(--primary-green-color);
  }
}

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: '⚠';
  }
}

.required {
  color: var(--error-color);
}

.optional {
  color: var(--text-secondary-clr);
  font-weight: 400;
  font-size: 0.875rem;
  opacity: 0.7;
}

// Zona de upload mejorada
.preview-section {
  width: 100%;
}

.upload-zone {
  border: 2px dashed var(--primary-green-color);
  border-radius: 12px;
  background: var(--form-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;

  &:hover:not(.has-image) {
    border-color: var(--primary-green-color);
    background: var(--form-bg-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--primary-green-color-rgb), 0.1);
  }

  &.has-image {
    border-style: solid;
    padding: 0;
    cursor: default;
    border-color: var(--border-color);
  }

  .upload-content {
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;

    svg {
      width: 64px;
      height: 64px;
      margin-bottom: 1rem;
      opacity: 0.5;
      color: var(--primary-green-color);
      transition: all 0.3s ease;
    }

    p {
      margin: 0;
      color: var(--text-secondary-clr);
      font-size: 0.95rem;
      line-height: 1.5;

      strong {
        color: var(--primary-green-color);
        display: block;
        margin-bottom: 0.25rem;
        font-size: 1rem;
      }
    }

    .file-help {
      display: block;
      margin-top: 0.75rem;
      font-size: 0.75rem;
      opacity: 0.7;
      color: var(--text-secondary-clr);
    }
  }

  &:hover:not(.has-image) .upload-content svg {
    opacity: 0.8;
    transform: scale(1.1);
  }

  .image-preview {
    position: relative;
    border: none;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 350px;
      object-fit: cover;
      display: block;
    }

    .image-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover .image-actions {
      opacity: 1;
    }
  }
}

.btn-change-image,
.btn-remove-image {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    width: 18px;
    height: 18px;
  }

  &.btn-change-image {
    background: var(--card-bg);
    color: var(--primary-green-color);

    &:hover {
      background: var(--card-bg-solid);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }

  &.btn-remove-image {
    background: var(--error-color);
    color: var(--btn-primary-text);

    &:hover {
      background: var(--error-color);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(231, 20, 20, 0.4);
      filter: brightness(1.1);
    }
  }
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  background: var(--tertiary-bg);
  flex-shrink: 0;
  border-top: 1px solid var(--border-color);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  button {
    min-width: 100px;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
  }

  .btn-secondary {
    background-color: var(--bg-body);
    border: 1px solid var(--border-color);
    color: var(--text-color-3);
    transition: all .3s ease;

    &:hover {
      box-shadow: 0 2px 4px rgba(var(--primary-green-color-rgb), 0.3);
      transform: translateY(-1px);
    }
  }

  .btn-primary {
    background-color: var(--primary-green-color);
    color: var(--btn-primary-text);
    border: 1px solid transparent;
    transition: all .3s ease;

    &:hover:not(:disabled) {
      background-color: var(--btn-hover-green);
      box-shadow: 0 2px 8px rgba(var(--primary-green-color-rgb), 0.3);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
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
    transform: scale(0.95);
  }
}

// Responsive
@media (max-width: 576px) {
  .modal-header h5 {
    font-size: 1rem;
  }

  .form-actions {
    flex-direction: column-reverse;

    button {
      width: 100%;
      min-width: unset;
      font-size: 0.95rem;
    }
  }

  .upload-zone .image-preview img {
    height: 250px;
  }

  .upload-zone .upload-content {
    padding: 1.5rem;

    svg {
      width: 48px;
      height: 48px;
    }
  }
}

@media (min-width: 768px) {
  .modal-container {
    max-width: 90vw;
    border-radius: 12px;
  }

  .modal-body {
    flex-direction: row;
    gap: 2rem;
    padding: 2rem;
  }

  .form-section {
    flex: 1.3;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-green);
    padding: 12px;
  }

  .preview-section {
    flex: 1;
    position: sticky;
    top: 0;
  }

  .upload-zone .image-preview img {
    height: 100%;
    min-height: 200px;
    max-height: 400px;
  }

  .upload-zone .upload-content {
    min-height: 200px;
  }
}

@media (min-width: 992px) {
  .modal-container {
    width: 65vw;
    max-width: 1100px;
  }

  .modal-header h5 {
    font-size: 1.4rem;
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

// Mejoras de accesibilidad
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
