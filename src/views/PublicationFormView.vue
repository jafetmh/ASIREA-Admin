<template>
  <div class="form-page">

    <!-- Encabezado -->
    <div class="page-header">
      <div class="header-title">
        <BackBtnComponent @click="goBack"></BackBtnComponent>
        <div class="noticia-div">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path fill="#f0f0f0"
              d="M18.17 4.44h-1.34c-1.01 0-1.83.82-1.83 1.83v.45L5.5 8.76v-.51c0-.41-.34-.75-.75-.75S4 7.84 4 8.25v7c0 .41.34.75.75.75s.75-.34.75-.75v-.63l9.5 2.04v.45c0 1.01.82 1.83 1.83 1.83h1.34c1.01 0 1.83-.82 1.83-1.83V6.27c0-1.01-.82-1.83-1.83-1.83M5.5 13.08v-2.79L15 8.25v6.87zm13 4.03c0 .18-.15.33-.33.33h-1.34c-.18 0-.33-.15-.33-.33V6.27c0-.18.15-.33.33-.33h1.34c.18 0 .33.15.33.33zm-5.53.52a2.785 2.785 0 0 1-2.67 1.94c-1.54 0-2.8-1.24-2.8-2.75c0-.11 0-.23.02-.34c.05-.41.43-.7.84-.65s.7.42.65.83v.15c0 .69.58 1.25 1.3 1.25c.57 0 1.07-.36 1.24-.89c.12-.4.55-.62.94-.49c.4.12.61.55.49.94Z"
              stroke-width="0.5" stroke="#f0f0f0" />
          </svg>
        </div>
        <h2>{{ pageTitle }}</h2>
      </div>
    </div>

    <!-- Sección principal: formulario + footer con botones -->
    <section class="publication-section">

      <div class="form-body">

        <!-- Columna izquierda: campos del formulario -->
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
                  placeholder="Ingrese el contenido de la publicación" required></textarea>
                <label for="descripcion">Contenido</label>
              </div>

              <div class="form-floating">
                <select id="cat" class="form-select form-control" aria-label="Elige una categoría"
                  v-model="formData.categoriaId" required>
                  <option :value="null" disabled selected>Elige una categoría</option>
                  <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
                </select>
                <label for="cat">Categoría</label>
              </div>

              <div class="importante-toggle">
                <label>Marcar como importante</label>
                <div class="switch-container">
                  <input type="checkbox" id="importante-switch" v-model="formData.importante" class="switch-input" />
                  <label for="importante-switch" class="switch-label"></label>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Columna derecha: imagen de portada -->
        <div class="preview-section">
          <div class="cover-wrapper">
            <div class="preview-header">
              <p class="preview-label">Imagen de portada</p>

              <div v-if="imagePreview" class="image-actions">
                <button type="button" class="btn-change-image" @click="triggerImageInput" title="Cambiar imagen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z">
                    </path>
                    <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                  </svg>
                </button>
                <button type="button" class="btn-remove-image" @click="removeImage" title="Eliminar imagen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>

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
                <img :src="imagePreview" alt="Preview de imagen" />
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer con botones de acción -->
      <div class="form-footer">
        <ButtonComponent type="button" label="Cancelar" :strong-label="true" :rounded="false" @click="goBack"
          class="btn-cancel" />
        <ButtonComponent :label="submitLabel" :strong-label="true" :rounded="false" @click="handleSubmit"
          class="btn-save" :is-icon="SendIcon" :disabled="saving" />
      </div>

    </section>

    <!-- Sección de documentos (se habilita tras guardar la publicación) -->
    <Transition name="docs-reveal">
      <section v-if="showDocumentos" class="documents-section">
        <div class="documents-header">
          <div class="doc-header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
              <path
                d="m21.8 6.4-2.7-3.6c-.38-.5-.97-.8-1.6-.8h-11c-.63 0-1.23.3-1.6.8L2.2 6.4h.01c-.13.18-.21.37-.21.6v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-.23-.09-.42-.21-.59h.01ZM13 14v4h-2v-4H8l4-4 4 4zM5 6l1.5-2h11L19 6z">
              </path>
            </svg>
          </div>
          <div class="doc-header-text">
            <h3>Documentos adjuntos</h3>
            <small>Publicar documentos PDF relacionados a {{ formData.titulo }}</small>
          </div>
          <button type="button" class="btn-select-doc" @click="triggerDocInput">
            Seleccionar documento
          </button>
        </div>

        <input type="file" ref="docInput" accept=".pdf" @change="onDocFileSelected" style="display: none;" />

        <!-- Área de staging: archivo seleccionado pendiente de subida -->
        <div v-if="selectedDocFile" class="doc-staging-area">
          <div class="doc-staging-list">
            <div class="doc-staging-item">
              <span class="staging-file-name">{{ selectedDocFile.name }}</span>
              <button type="button" class="btn-staging-remove" @click="cancelDocUpload" title="Quitar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                  <path
                    d="m9.88 12.71-4.95 4.95 1.41 1.41 2.83-2.83L12 13.41l2.12 2.13 3.54 3.53 1.41-1.41-4.95-4.95-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div class="doc-staging-footer">
            <button type="button" class="btn-upload-confirm" :disabled="uploadingDoc" @click="uploadDocumento">
              {{ uploadingDoc ? 'Subiendo...' : 'Publicar' }}
            </button>
          </div>
        </div>

        <div class="documents-body">

          <!-- Lista de documentos -->
          <div class="doc-list">
            <div v-if="loadingDocs" class="doc-list-loading">
              <SecondLoaderComponent />
            </div>
            <template v-else>
              <div v-if="documentos.length === 0" class="no-docs">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                  <path
                    d="m21.8 6.4-2.7-3.6c-.38-.5-.97-.8-1.6-.8h-11c-.63 0-1.23.3-1.6.8L2.2 6.4h.01c-.13.18-.21.37-.21.6v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-.23-.09-.42-.21-.59h.01ZM6.5 4h11L19 6H5zM4 20V8h16v12z">
                  </path>
                  <path d="M8 11h8v2H8z"></path>
                </svg>
                <p>No hay documentos adjuntos aún.</p>
              </div>

              <div v-for="doc in documentos" :key="doc.id" class="doc-item">
                <div class="doc-item-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-file-pdf" viewBox="0 0 16 16">
                    <path
                      d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                    <path
                      d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                  </svg>
                </div>
                <div class="doc-item-info">
                  <span class="doc-name">{{ doc.nombre }}</span>
                  <span class="doc-date">{{ formatDate(doc.fechaSubida) }}</span>
                </div>
                <div class="doc-item-actions">
                  <a :href="doc.url" target="_blank" class="btn-doc-view" title="Ver documento"> Observar
                  </a>
                  <button type="button" class="btn-doc-delete" @click="eliminarDocumento(doc.id)"
                    title="Eliminar documento">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </template>
          </div>

        </div>
      </section>
    </Transition>

    <!-- Loader global -->
    <div v-if="saving" class="loader-overlay">
      <SecondLoaderComponent />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import BackBtnComponent from '@/components/BackBtnComponent.vue';
import SendIcon from '@/components/icons/buttons/SendIcon.vue';
import SecondLoaderComponent from '@/components/SecondLoaderComponent.vue';
import PublicacionesService from '@/api/services/PublicacionesService';
import type { Categoria, Documento, Publication } from '@/interfaces/Publication';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const publicationId = computed(() => route.params.id ? Number(route.params.id) : undefined);

// ID efectivo: el de edición o el recién creado
const savedPublicationId = ref<number | undefined>(undefined);
const effectiveId = computed(() => publicationId.value ?? savedPublicationId.value);

const pageTitle = computed(() =>
  (isEdit.value || savedPublicationId.value) ? `Publicación: ${formData.titulo}` : 'Nueva Publicación'
);
const submitLabel = computed(() =>
  (isEdit.value || savedPublicationId.value) ? 'Guardar Cambios' : 'Publicar'
);
const showDocumentos = computed(() => !!effectiveId.value);

// ─── Formulario ───────────────────────────────────────────────────────────────

interface FormData {
  titulo: string;
  descripcion: string;
  categoriaId: number | null;
  imagen?: File | string;
  importante: boolean;
}

const formData = reactive<FormData>({
  titulo: '',
  descripcion: '',
  categoriaId: null,
  importante: false,
});

const categorias = ref<Categoria[]>([]);
const imageInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string>('');
const saving = ref(false);

const populateForm = (publication: Publication) => {
  formData.titulo = publication.titulo;
  formData.descripcion = publication.descripcion;
  formData.categoriaId = publication.categoria?.id ?? null;
  formData.importante = publication.importante ?? false;
  imagePreview.value = publication.imagenPortadaUrl ?? '';
};

const triggerImageInput = () => imageInput.value?.click();

const onImageSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    formData.imagen = input.files[0];
    imagePreview.value = URL.createObjectURL(input.files[0]);
  }
};

const removeImage = () => {
  formData.imagen = undefined;
  imagePreview.value = '';
  if (imageInput.value) imageInput.value.value = '';
};

const handleSubmit = async () => {
  if (!formData.categoriaId) return;

  saving.value = true;
  try {
    const fd = new FormData();
    fd.append('titulo', formData.titulo);
    fd.append('descripcion', formData.descripcion);
    fd.append('categoriaId', formData.categoriaId.toString());
    fd.append('importante', String(formData.importante));

    if (formData.imagen instanceof File) {
      fd.append('imagenArchivo', formData.imagen);
    }

    const id = effectiveId.value;
    if (id) {
      await PublicacionesService.actualizarPublicacion(id, fd);
    } else {
      const res = await PublicacionesService.crearPublicacion(fd);
      savedPublicationId.value = res.data?.id ?? res.id;
      await loadDocumentos();
    }
  } catch (error) {
    console.error('Error al guardar publicación:', error);
  } finally {
    saving.value = false;
  }
};

const goBack = () => router.push({ name: 'noticias' });

// ─── Documentos ───────────────────────────────────────────────────────────────

const documentos = ref<Documento[]>([]);
const docInput = ref<HTMLInputElement | null>(null);
const selectedDocFile = ref<File | null>(null);
const uploadingDoc = ref(false);
const loadingDocs = ref(false);

const loadDocumentos = async () => {
  if (!effectiveId.value) return;
  loadingDocs.value = true;
  try {
    const res = await PublicacionesService.obtenerDocumentos(effectiveId.value);
    documentos.value = res.data ?? res;
  } catch (error) {
    console.error('Error al cargar documentos:', error);
  } finally {
    loadingDocs.value = false;
  }
};

const triggerDocInput = () => docInput.value?.click();

const onDocFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  selectedDocFile.value = input.files?.[0] ?? null;
};

const cancelDocUpload = () => {
  selectedDocFile.value = null;
  if (docInput.value) docInput.value.value = '';
};

const uploadDocumento = async () => {
  if (!selectedDocFile.value || !effectiveId.value) return;
  uploadingDoc.value = true;
  try {
    const fd = new FormData();
    fd.append('archivo', selectedDocFile.value);
    await PublicacionesService.subirDocumento(effectiveId.value, fd);
    cancelDocUpload();
    await loadDocumentos();
  } catch (error) {
    console.error('Error al subir documento:', error);
  } finally {
    uploadingDoc.value = false;
  }
};

const eliminarDocumento = async (docId: number) => {
  if (!effectiveId.value) return;
  try {
    await PublicacionesService.eliminarDocumento(effectiveId.value, docId);
    documentos.value = documentos.value.filter(d => d.id !== docId);
  } catch (error) {
    console.error('Error al eliminar documento:', error);
  }
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
};

// ─── Montaje ──────────────────────────────────────────────────────────────────

onMounted(async () => {
  try {
    const [categoriasRes] = await Promise.all([
      PublicacionesService.obtenerCategorias(),
      isEdit.value && publicationId.value
        ? PublicacionesService.obtenerPublicacion(publicationId.value).then(res => {
          populateForm(res.data ?? res);
        })
        : Promise.resolve(),
    ]);
    categorias.value = categoriasRes.data ?? categoriasRes;

    if (isEdit.value && publicationId.value) {
      await loadDocumentos();
    }
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
});
</script>

<style scoped lang="scss">
.form-page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--top-var, 58.84px));
  background-color: var(--bg-body);
  position: relative;
}

// ─── Header ───────────────────────────────────────────────────────────────────
.page-header {
  position: sticky;
  top: var(--top-var);
  background: var(--tertiary-bg);
  z-index: 200;
  display: flex;
  align-items: center;
  padding: .8rem 1.8rem;
  border-bottom: 1px solid var(--border-color);

  .header-title {
    display: flex;
    align-items: center;
    gap: 1rem;


    .noticia-div {
      padding: 10px;
      border-radius: 5px;
      background-color: var(--primary-green-color);
    }

    h2 {
      margin: 0;
      font-size: 1.3rem !important;
      font-weight: 700;
      color: var(--text-color-1);
    }
  }
}

// ─── Sección publicación ──────────────────────────────────────────────────────
.publication-section {
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
}

// Cuerpo de dos columnas
.form-body {
  display: flex;
  flex-direction: column-reverse;
  gap: 1.5rem;
}

// Footer con botones
.form-footer {
  @include flexbox(row, flex-end, center);
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background-color: #e3e3e7;
  border-top: 1px solid var(--border-color);

  .btn-save,
  .btn-cancel {
    color: var(--text-color-1);
  }

  .btn-cancel {
    border: 1px solid var(--border-color);
    padding: 0.65rem 1.25rem;
  }

  .btn-save {
    padding: 0.65rem 1.5rem;
    font-weight: 500;
    transition: opacity 0.2s ease;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

// ─── Formulario ───────────────────────────────────────────────────────────────
.form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-wrapper {
  background-color: rgb(236 243 236 / 90%);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  padding: 1.25rem;
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.description-floating {
  flex: 1;
  display: flex;
  flex-direction: column;

  .description-textarea {
    min-height: 240px;
    resize: vertical;
  }
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

.importante-toggle {
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
      background-color: var(--primary-green-color-1);
    }

    .switch-input:checked+.switch-label::before {
      transform: translateX(24px);
    }

    .switch-input:focus+.switch-label {
      box-shadow: 0 0 1px var(--accent-color);
    }
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

// ─── Preview portada ──────────────────────────────────────────────────────────
.preview-section {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.cover-wrapper {
  background-color: #f7fcf5;
  border: 1px solid rgba(var(--primary-green-color-rgb), 0.2);
  border-radius: 2px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  .image-actions {
    display: flex;
    gap: 0.375rem;
  }
}

.preview-label {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color-1);
}

.upload-zone {
  border: 1px dashed var(--primary-green-color);
  border-radius: 12px;
  background: var(--form-input-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 280px;
  flex: 1;

  &:hover:not(.has-image) {
    border-color: var(--btn-hover-green);
    background: var(--tertiary-bg);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--primary-green-color-rgb), 0.15);
  }

  &.has-image {
    border-style: solid;
    cursor: default;
    border-color: var(--border-color);
    min-height: 0;
  }

  .upload-content {
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

    img {
      width: 100%;
      max-height: 480px;
      object-fit: cover;
      display: block;
    }
  }
}

.btn-change-image,
.btn-remove-image {
  padding: 0.35rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
    display: block;
  }
}

.btn-change-image {
  background: rgba(var(--primary-green-color-rgb), 0.12);
  color: var(--primary-green-color);

  &:hover {
    background: rgba(var(--primary-green-color-rgb), 0.22);
    transform: translateY(-1px);
  }
}

.btn-remove-image {
  background: rgba(220, 53, 69, 0.12);
  color: #dc3545;

  &:hover {
    background: rgba(220, 53, 69, 0.22);
    transform: translateY(-1px);
  }
}

// ─── Sección de documentos ────────────────────────────────────────────────────
.documents-section {
  background-color: var(--bg-body-1);
  /*   border-top: 2px solid var(--border-color);
 */
  padding: 1.5rem;

  .documents-header {
    @include flexbox(row, space-between, center);
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    padding: 12px;
    border-bottom: 1px solid var(--border-color);

    .doc-header-icon {
      @include flexbox(row, center, center);
      flex-shrink: 0;
      padding: 0.6rem;
      border-radius: 8px;
      background-color: rgba(var(--primary-green-color-rgb), 0.12);
    }

    .doc-header-text {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      flex: 1;

      h3 {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--text-color-1);
        line-height: 1.2;
      }

      small {
        font-size: .8rem;
        color: var(--text-secondary-clr);
      }
    }

    .btn-select-doc {
      border: none;
      flex-shrink: 0;
      background-color: rgba(var(--primary-green-color-rgb), 0.08);
      color: var(--text-color-1);
      border-radius: 6px;
      padding: 0.45rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(var(--primary-green-color-rgb), 0.16);
      }
    }
  }

  .documents-body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}

// Área de staging (archivo seleccionado pendiente de subida)
.doc-staging-area {
  background-color: rgba(var(--primary-green-color-rgb), 0.06);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.25rem;

  .doc-staging-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 0.6rem;

    .doc-staging-item {
      @include flexbox(row, space-between, center);
      gap: 0.75rem;
      background-color: #489166;
      border-radius: 5px;
      padding: 0.55rem 0.75rem;

      .staging-file-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: #fff;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .btn-staging-remove {
        @include flexbox(row, center, center);
        flex-shrink: 0;
        background-color: rgba(0, 0, 0, 0.28);
        border: none;
        border-radius: 4px;
        padding: 0.25rem;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .doc-staging-footer {
    @include flexbox(row, flex-end, center);

    .btn-upload-confirm {
      background-color: var(--accent-color);
      color: var(--text-color-1);
      border: none;
      border-radius: 6px;
      padding: 0.45rem 1.1rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}

// Lista de documentos
.doc-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .doc-list-loading {
    @include flexbox(row, center, center);
    padding: 2rem 0;
  }

  .no-docs {
    @include flexbox(column, center, center);
    gap: 0.5rem;
    padding: 2rem;
    color: var(--text-secondary-clr);
    text-align: center;

    p {
      margin: 0;
      font-size: 0.9rem;
    }
  }

  .doc-item {
    @include flexbox(row, space-between, center);
    gap: 1rem;
    padding: 0.75rem 1rem;
    background-color: var(--tertiary-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--tertiary-bg-1);
    }

    .doc-item-icon {
      color: var(--primary-green-color);
      flex-shrink: 0;
      display: flex;
    }

    .doc-item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-width: 0;

      .doc-name {
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-color-1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .doc-date {
        font-size: 0.75rem;
        color: var(--text-secondary-clr);
      }
    }

    .doc-item-actions {
      @include flexbox(row, flex-end, center);
      gap: 0.375rem;
      flex-shrink: 0;

      .btn-doc-view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.35rem;
        text-decoration: none;
        border-radius: 2px;
        font-size: .8rem;
        font-weight: 400;
        background: rgba(var(--primary-green-color-rgb), 0.12);
        color: var(--primary-green-color);
        transition: background-color 0.2s ease;

        &:hover {
          background: rgba(var(--primary-green-color-rgb), 0.22);
        }
      }

      .btn-doc-delete {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.35rem;
        border: none;
        border-radius: 2px;
        background: rgba(220, 53, 69, 0.12);
        color: #dc3545;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background: rgba(220, 53, 69, 0.22);
        }
      }
    }
  }
}

// ─── Loader overlay ───────────────────────────────────────────────────────────
.loader-overlay {
  position: fixed;
  top: var(--top-var, 58.84px);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

// ─── Transition: sección documentos ──────────────────────────────────────────
.docs-reveal-enter-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.docs-reveal-enter-from {
  opacity: 0;
  transform: translateY(-16px);
}

.docs-reveal-enter-to {
  opacity: 1;
  transform: translateY(0);
}

// ─── Responsive ───────────────────────────────────────────────────────────────
@include respond-to(mobile-xs) {
  .page-header {
    padding: .8rem 1.8rem;
  }

  .page-header .header-title h2 {
    font-size: 1.2rem;
  }

  .form-body {
    flex-direction: column-reverse;
    padding: 1rem 1rem 0.75rem;
  }

  .form-footer {
    padding: 0.75rem 1rem;
  }

  .documents-section {
    padding: 1rem;
  }
}

@include respond-to(mobile) {
  .documents-section .documents-header {
    flex-wrap: wrap;

    .btn-select-doc {
      width: 100%;
    }
  }
}

@include respond-to(tablet) {
  .form-body {
    padding: 2rem 2rem 1.25rem;
    gap: 2rem;
  }

  .form-footer {
    padding: 1rem 2rem;
  }

  .description-floating .description-textarea {
    min-height: 340px;
  }

  .documents-section {
    padding: 1.5rem 2rem;
  }

  .documents-body {
    flex-direction: row !important;
    align-items: flex-start;

    .doc-upload-area {
      width: 340px;
      flex-shrink: 0;
    }

    .doc-list {
      flex: 1;
    }
  }
}

@include respond-to(desktop) {
  .form-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    flex-direction: unset;
    padding: 2rem 2rem 1.25rem;
    gap: 2rem;
  }

  .form-footer {
    padding: 1rem 2rem;
  }

  .page-header .header-title h2 {
    font-size: 1.8rem;
  }

  .description-floating .description-textarea {
    min-height: 220px;
  }

  .documents-section {
    padding: 2rem;
  }
}
</style>
