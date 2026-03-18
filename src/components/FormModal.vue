<template>
  <Transition name="page-slide">
    <div v-if="modelValue" class="page-overlay">

      <div class="page-header">
        <h5>{{ data.titulo ? data.titulo : title }}</h5>
        <button class="close-btn" @click="closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="currentColor">
            <path
              d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </button>
      </div>

      <div class="page-body">
        <!-- Columna izquierda: formulario -->
        <div class="form-section">
          <div class="form-wrapper">
            <form @submit.prevent="handleSubmit">
              <div class="form-floating">
                <InputComponent id="titulo" v-model="formData.titulo" placeholder="Ingrese el título" required
                  class="form-control" />
                <label for="titulo">Título</label>
              </div>

              <input type="file" id="imagen" ref="imageInput" accept="image/*" @change="onImageSelected"
                style="display: none;" />

              <div class="form-floating description-floating">
                <textarea id="descripcion" class="form-control description-textarea" v-model="formData.descripcion"
                  placeholder="Ingrese la noticia" required></textarea>
                <label for="descripcion">Contenido</label>
              </div>

              <div class="form-floating">
                <select id="cat" class="form-select form-control" aria-label="Elige una categoria"
                  v-model="formData.categoriaId" required>
                  <option :value="null" disabled selected>Elige una categoria</option>
                  <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
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

        <!-- Columna derecha: imagen portada -->
        <div class="preview-section">
          <p class="preview-label">Imagen de portada</p>
          <div class="upload-zone" :class="{ 'has-image': imagePreview }" @click="triggerImageInput">
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

      <div class="page-footer">
        <div class="form-actions">
          <ButtonComponent type="button" label="Cancelar" :strong-label="true" :rounded="false" @click="closeModal"
            class="btn-secondary" />
          <ButtonComponent type="submit" :label="isEdit ? 'Guardar Cambios' : 'Guardar'" :rounded="false"
            @click="handleSubmit" class="btn-primary" />
        </div>
      </div>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import PublicacionesService from '@/api/services/PublicacionesService';
import type { Categoria } from '@/interfaces/Publication';

interface FormData {
  titulo: string;
  descripcion: string;
  categoriaId: number | null;
  imagen?: File | string;
  documento?: File | string;
  imagenUrl?: string;
  documentoUrl?: string;
  documentEnabled?: boolean;
  importante?: boolean;
}

interface PublicacionData {
  titulo?: string;
  descripcion?: string;
  categoria?: Categoria;
  imagen?: File | string;
  documento?: File | string;
  imagenPortadaUrl?: string;
  documentoUrl?: string;
  documentEnabled?: boolean;
  importante?: boolean;
}

interface Props {
  modelValue: boolean;
  title?: string;
  isEdit?: boolean;
  data?: PublicacionData;
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
  categoriaId: null,
  imagen: undefined,
  documento: undefined,
  importante: false
});

const categorias = ref<Categoria[]>([]);

onMounted(async () => {
  try {
    const response = await PublicacionesService.obtenerCategorias();
    categorias.value = response.data ?? response;
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
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
    formData.categoriaId = newData.categoria?.id ?? null;
    formData.importante = newData.importante || false;

    if (newData.imagenPortadaUrl) {
      imagePreview.value = newData.imagenPortadaUrl;
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
  formData.categoriaId = null;
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
// Pantalla completa
.page-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: var(--bg-body);
  display: flex;
  flex-direction: column;
}

.page-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
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

.page-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
  background-color: var(--bg-body);
}

.page-footer {
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  background: var(--tertiary-bg);
  border-top: 1px solid var(--border-color);
}

// Formulario
.form-section {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.form-wrapper {
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  backdrop-filter: blur(5px);
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
}

.description-floating {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .description-textarea {
    flex: 1;
    min-height: 220px;
    resize: vertical;
  }
}

/* Estilos de formulario */
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

#file .form-floating>label {
  padding-top: 0 !important;
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

// Select
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

  &:hover {
    background-color: rgba(var(--primary-green-color-rgb), 0.8) !important;
  }

  &::checkmark {
    display: none;
  }
}

// Acciones del footer
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

// Sección de imagen
.preview-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-label {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color-1);
}

.upload-zone {
  border: 2px dashed var(--primary-green-color);
  border-radius: 12px;
  background: var(--form-input-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1;
  min-height: 280px;

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
    height: 100%;
    min-height: 280px;

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

  .image-preview-container {
    position: relative;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      min-height: 280px;
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

// Transición de entrada/salida de la pantalla completa
.page-slide-enter-active,
.page-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

// Transición para el campo de documento
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

// Responsive — tablet y desktop: dos columnas
@include respond-to(tablet) {
  .page-body {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }

  .form-section {
    align-self: stretch;

    .form-wrapper {
      height: 100%;

      form {
        height: 100%;
      }
    }
  }

  .description-floating .description-textarea {
    min-height: 300px;
  }

  .preview-section {
    align-self: stretch;
  }

  .upload-zone {
    min-height: 0;
  }

  .upload-zone .upload-content {
    min-height: 0;
  }

  .upload-zone .image-preview-container img {
    min-height: 0;
    height: 100%;
  }
}

@include respond-to(desktop) {
  .page-header h5 {
    font-size: 1.4rem;
  }

  .page-body {
    padding: 2rem;
    gap: 2rem;
  }

  .description-floating .description-textarea {
    min-height: 380px;
  }
}

@include respond-to(desktop-lg) {
  .page-header h5 {
    font-size: 1.5rem;
  }
}

@include respond-to(desktop-xl) {
  .page-header h5 {
    font-size: 1.6rem;
  }
}

// Mobile pequeño
@include respond-to(mobile-xs) {
  .page-header h5 {
    font-size: 1rem;
  }

  .page-body {
    padding: 1rem;
  }

  .form-actions button {
    min-width: 80px;
    font-size: 0.85rem;
  }

  .upload-zone .upload-content svg {
    width: 48px;
    height: 48px;
  }
}
</style>
