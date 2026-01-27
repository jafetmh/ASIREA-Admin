<template>
  <Transition name="modal-fade">
    <div v-if="modelValue" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h5>{{ data.titulo ? data.titulo : title }}</h5>
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
            <div class="form-wrapper">
              <form @submit.prevent="handleSubmit">
                <div class="form-floating">
                  <InputComponent id="titulo" v-model="formData.titulo" placeholder="Ingrese el título" required
                    class="form-control" />
                  <label for="titulo">Título</label>
                </div>

                <!-- Input oculto para imagen -->
                <input type="file" id="imagen" ref="imageInput" accept="image/*" @change="onImageSelected"
                  style="display: none;" />

                <div class="form-floating">
                  <textarea id="descripcion" class="form-control" v-model="formData.descripcion"
                    placeholder="Ingrese la noticia" style="height: 100px" required></textarea>
                  <label for="descripcion">Contenido</label>
                </div>
                <div class="form-floating">
                  <select name="" id="cat" class="form-select form-control" aria-label="Elige una categoria"
                    v-model="formData.categoria" required>
                    <option value="" disabled selected>Elige una categoria</option>
                    <option value="Noticia">Noticia</option>
                    <option value="Informe">Informe</option>
                    <option value="Proyecto">Proyecto</option>
                    <option value="Ficha Tecnica">Ficha Técnica</option>
                  </select>
                  <label for="cat">Categoria</label>
                </div>
                <div class="importante-toggle">
                  <label>Marcar como importante</label>
                  <div class="switch-container">
                    <input type="checkbox" id="importante-switch" v-model="formData.importante" class="switch-input" />
                    <label for="importante-switch" class="switch-label"></label>
                  </div>
                </div>
                <div class="with-document">
                  <label>Incluir archivo/documento</label>
                  <div class="switch-container">
                    <input type="checkbox" id="document-switch" v-model="documentEnabled" class="switch-input" />
                    <label for="document-switch" class="switch-label"></label>
                  </div>
                </div>

                <Transition name="document-slide">
                  <div v-if="documentEnabled" id="file">
                    <div class="form-floating">
                      <label for="documento">Documento</label>
                      <input type="file" id="documento" ref="documentInput" accept=".pdf,.doc,.docx"
                        @change="onDocumentSelected" class="form-control file-input" />
                    </div>
                  </div>
                </Transition>
              </form>
            </div>
          </div>

          <div class="preview-section">
            <!-- Zona de upload interactiva -->
            <div class="upload-zone" :class="{ 'has-image': imagePreview }" @click="triggerImageInput">
              <!-- Placeholder cuando no hay imagen -->
              <div v-if="!imagePreview" class="upload-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z">
                  </path>
                  <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                </svg>
                <p>
                  <strong>Clic para agregar portada</strong>
                  o arrastra una imagen aquí
                </p>
                <small class="file-help">Formatos: JPG, PNG, GIF, WEBP</small>
              </div>

              <!-- Preview cuando hay imagen -->
              <div v-else class="image-preview-container" @click.stop>
                <img :src="imagePreview" alt="Preview" />
                <div class="image-actions">
                  <button type="button" class="btn-change-image" @click="triggerImageInput">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z">
                      </path>
                      <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                    </svg>
                    Cambiar
                  </button>
                  <button type="button" class="btn-remove-image" @click="removeImage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z">
                      </path>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <div v-if="documentEnabled && documentUrl" class="document-actions">
              <button type="button" @click="openDocument" class="btn-document">Revisar documento
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5" d="m9 5l6 7l-6 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="form-actions">
            <ButtonComponent type="button" label="Cancelar" :strong-label="true" :rounded="false" @click="closeModal"
              class="btn-secondary" />
            <ButtonComponent type="submit" :label="isEdit ? 'Guardar Cambios' : 'Guardar'" :rounded="false"
              @click="handleSubmit" class="btn-primary" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';

interface FormData {
  titulo: string;
  descripcion: string;
  categoria: string;
  imagen?: File | string;
  documento?: File | string;
  imagenUrl?: string;
  documentoUrl?: string;
  documentEnabled?: boolean;
  importante?: boolean;
}

interface Props {
  modelValue: boolean;
  title?: string;
  isEdit?: boolean;
  data?: Partial<FormData>;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Formulario',
  isEdit: false,
  data: () => ({})
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', data: FormData): void;
}>();

const formData = reactive<FormData>({
  titulo: '',
  descripcion: '',
  categoria: '',
  imagen: undefined,
  documento: undefined,
  importante: false
});

const imageInput = ref<HTMLInputElement | null>(null);
const documentInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string>('');
const documentUrl = ref<string>('');
const documentEnabled = ref<boolean>(false);

// Watch para cargar datos cuando se edita
watch(() => props.data, (newData) => {
  if (newData) {
    formData.titulo = newData.titulo || '';
    formData.descripcion = newData.descripcion || '';
    formData.categoria = newData.categoria || '';
    formData.importante = newData.importante || false;

    if (newData.imagenUrl) {
      imagePreview.value = newData.imagenUrl;
    } else if (typeof newData.imagen === 'string') {
      imagePreview.value = newData.imagen;
    }

    if (newData.documentoUrl) {
      documentUrl.value = newData.documentoUrl;
      documentEnabled.value = true;
    } else if (typeof newData.documento === 'string') {
      documentUrl.value = newData.documento;
      documentEnabled.value = true;
    }
  }
}, { immediate: true });

const triggerImageInput = () => {
  imageInput.value?.click();
};

const onImageSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    formData.imagen = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  formData.imagen = undefined;
  imagePreview.value = '';
  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

const onDocumentSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    formData.documento = file;
    documentUrl.value = URL.createObjectURL(file);
  }
};

const openDocument = () => {
  if (documentUrl.value) {
    window.open(documentUrl.value, '_blank');
  }
};

const handleSubmit = () => {
  emit('submit', { ...formData });
  resetForm();
};

const closeModal = () => {
  emit('update:modelValue', false);
  resetForm();
};

const resetForm = () => {
  formData.titulo = '';
  formData.descripcion = '';
  formData.categoria = '';
  formData.imagen = undefined;
  formData.documento = undefined;
  formData.importante = false;
  imagePreview.value = '';
  formData.imagenUrl = '';
  documentUrl.value = '';
  documentEnabled.value = false;

  if (imageInput.value) imageInput.value.value = '';
  if (documentInput.value) documentInput.value.value = '';
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
  }
}

.modal-body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 10px 1.5rem;
  overflow-y: auto;
  background-color: var(--bg-body);
  flex: 1 1 0%;
  min-height: 0;
}
.form-section {
  width: 100%;
}

.form-wrapper {
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  backdrop-filter: blur(5px);

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 0;
  }
}

/* Estilso de formulario */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 300;
    color: var(--text-color-1);
  }

  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--primary-green-color);
    border-radius: 6px;
    background-color: var(--bg-body);
    color: var(--text-secondary-clr);
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: var(--text-color-1);
      border-width: 2px;
    }
  }

  .file-input {
    padding: 0.75rem;
    border: 2px dashed var(--primary-green-color);
    border-radius: 6px;
    background-color: var(--bg-body);
    color: var(--text-color-3);
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
      border-color: var(--btn-hover-green);
    }
  }
}

#file .form-floating>label {
  padding-top: 0 !important;
}

.form-control {
  border-color: var(--border-color);
  background-color: var(--form-input-bg);
  color: var(--text-color-3);
  transition: all .3s ease-in-out;
}

.form-control:focus {
  box-shadow: 0 3px 5px rgba(var(--primary-green-color-rgb), 0.3);
  border-color: var(--primary-green-color);
}

.importante-toggle,
.with-document {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: var(--tertiary-bg);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.importante-toggle,
.with-document {

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color-1);
    margin: 0;
  }

  .switch-container {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;

    .switch-input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-label {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--border-color);
      transition: background-color 0.3s ease;
      border-radius: 26px;
      margin: 0;

      &::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: var(--card-bg-solid);
        transition: transform 0.3s ease;
        border-radius: 50%;
      }
    }

    .switch-input:checked+.switch-label {
      background-color: var(--primary-green-color);
    }

    .switch-input:checked+.switch-label::before {
      transform: translateX(24px);
    }

    .switch-input:focus+.switch-label {
      box-shadow: 0 0 1px var(--accent-color);
    }
  }
}

select,
::picker(select) {
  appearance: base-select;
}

::picker(select) {
  opacity: 0;
  border: 1px solid var(--border-color);
  transition: all 0.4s allow-discrete;
}

@starting-style {
  ::picker(select):popover-open {
    opacity: 0;
  }
}

::picker(select):popover-open {
  opacity: 1;
}

::picker-icon {
  display: none;
}

select option {
  padding: 10px 12px;
}

select option {

  &:hover {
    background-color: rgba(var(--primary-green-color-rgb), 0.8) !important;
  }

  &::checkmark {
    display: none;
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
    transition: all .3s ease;

    &:hover {
      background-color: var(--btn-hover-green);
      box-shadow: 0 2px 8px rgba(var(--primary-green-color-rgb), 0.3);
      transform: translateY(-1px);
    }
  }
}

.preview-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

// Zona de upload interactiva
.upload-zone {
  border: 2px dashed var(--primary-green-color);
  border-radius: 12px;
  background: var(--form-input-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;

  &:hover:not(.has-image) {
    border-color: var(--btn-hover-green);
    background: var(--tertiary-bg);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--primary-green-color-rgb), 0.15);
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
      width: 56px;
      height: 56px;
      margin-bottom: 1rem;
      opacity: 0.5;
      color: var(--primary-green-color);
      transition: all 0.3s ease;
    }

    p {
      margin: 0;
      color: var(--text-secondary-clr);
      font-size: 0.9rem;
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

  .image-preview-container {
    position: relative;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 280px;
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
  border-radius: 6px;
  font-size: 0.85rem;
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
}

.btn-change-image {
  background: var(--card-bg-solid);
  color: var(--primary-green-color);

  &:hover {
    background: var(--bg-body);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

.btn-remove-image {
  background: var(--error-color, #dc3545);
  color: white;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4);
  }
}

.document-actions {
  display: flex;
  justify-content: space-between;

  .btn-document {
    border: 1px solid var(--border-color);
    background-color: var(--tertiary-bg);
    color: var(--text-secondary-clr);
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--nav-link-active-hover);
      transform: translateY(-1px);
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
    transform: scale(0.9);
  }
}

// Transición para el form-group de documento
.document-slide-enter-active,
.document-slide-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.document-slide-enter-from {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  transform: translateY(-5px);
}

.document-slide-enter-to {
  opacity: 1;
  max-height: 50px;
  margin-top: 1rem;
  transform: translateY(0);
}

.document-slide-leave-from {
  opacity: 1;
  max-height: 50px;
  margin-top: 1rem;
  transform: translateY(0);
}

.document-slide-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  transform: translateY(-5px);
}

// Responsive
@include respond-to(mobile-xs) {
  .modal-header h5 {
    font-size: 1rem;
  }

  .form-group label {
    font-size: 0.8rem;
  }

  .form-actions button {
    min-width: 80px;
    font-size: 0.85rem;
  }
}

@include respond-to(mobile-sm) {
  .modal-header h5 {
    font-size: 1.1rem;
  }

  .form-group label {
    font-size: 0.85rem;
  }
}

@include respond-to(mobile-xs) {
  .upload-zone {
    min-height: 180px;

    .upload-content {
      padding: 1.5rem;
      min-height: 180px;

      svg {
        width: 40px;
        height: 40px;
      }

      p {
        font-size: 0.85rem;

        strong {
          font-size: 0.9rem;
        }
      }
    }

    .image-preview-container img {
      height: 200px;
    }
  }

  .btn-change-image,
  .btn-remove-image {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }
}

@include respond-to(tablet) {
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

  .upload-zone .image-preview-container img {
    height: 320px;
  }
}

@include respond-to(desktop) {
  .modal-container {
    width: 60vw;
    max-width: 1200px;
  }

  .modal-header h5 {
    font-size: 1.4rem;
  }

  .upload-zone .image-preview-container img {
    height: 380px;
  }
}

@include respond-to(desktop-lg) {
  .modal-container {
    max-width: 1000px;
  }

  .modal-header h5 {
    font-size: 1.5rem;
  }
}

@include respond-to(desktop-xl) {
  .modal-container {
    max-width: 1200px;
  }

  .modal-header h5 {
    font-size: 1.6rem;
  }
}
</style>
