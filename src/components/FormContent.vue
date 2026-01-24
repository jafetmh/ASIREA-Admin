<template>
  <div class="form-content">
    <!-- Sección de foto -->
    <div class="photo-section">
      <input type="file" ref="imageInput" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        @change="handleImageChange" style="display: none;" />

      <div class="photo-upload-zone" :class="{ 'has-image': imagePreview }" @click="triggerFileInput">
        <div v-if="!imagePreview" class="upload-placeholder">
          <div class="photo-circle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
              <path
                d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
          </div>
          <p class="upload-text">Haz clic para agregar foto</p>
        </div>

        <div v-else class="photo-preview" @click.stop>
          <img :src="imagePreview" alt="Preview" />
          <button type="button" class="btn-remove-photo" @click="handleRemoveImage">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
              <path
                d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z">
              </path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="errors.foto" class="error-message">{{ errors.foto }}</div>
    </div>

    <!-- Formulario -->
    <form @submit.prevent="$emit('submit')" class="form-section">
      <!-- Contenedor de inputs -->
      <div class="inputs-container">
        <!-- Campo Nombre -->
        <div class="form-floating">
          <InputComponent id="nombre" :model-value="formData.nombre" @update:model-value="$emit('update:nombre', $event)"
            placeholder="Ingrese el nombre completo" :error="!!errors.nombre" @blur="$emit('validate-nombre')"
            class="form-control" />
          <label for="nombre">Nombre Completo <span class="required">*</span></label>
        </div>
        <div v-if="errors.nombre" class="error-message">{{ errors.nombre }}</div>

        <!-- Campo Puesto -->
        <div class="form-floating">
          <InputComponent id="puesto" :model-value="formData.puesto" @update:model-value="$emit('update:puesto', $event)"
            placeholder="Ingrese el puesto" :error="!!errors.puesto" @blur="$emit('validate-puesto')"
            class="form-control" />
          <label for="puesto">Puesto <span class="required">*</span></label>
        </div>
        <div v-if="errors.puesto" class="error-message">{{ errors.puesto }}</div>

        <!-- Campo Ocupación -->
        <div class="form-floating">
          <InputComponent id="ocupacion" :model-value="formData.ocupacion"
            @update:model-value="$emit('update:ocupacion', $event)" placeholder="Ingrese la ocupación"
            class="form-control" />
          <label for="ocupacion">Ocupación <span class="optional">(Opcional)</span></label>
        </div>
      </div>

      <!-- Botones -->
      <div class="form-actions">
        <ButtonComponent label="Cancelar" :strong-label="true" :rounded="true" @click="$emit('cancel')" class="btn-cancel" />
        <ButtonComponent type="submit" :label="isEdit ? 'Actualizar' : 'Guardar'" :rounded="true" class="btn-submit" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';

interface FormData {
  nombre: string;
  puesto: string;
  ocupacion: string;
}

interface Props {
  formData: FormData;
  errors: {
    nombre: string;
    puesto: string;
    foto: string;
  };
  imagePreview: string;
  isEdit: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:nombre', value: string): void;
  (e: 'update:puesto', value: string): void;
  (e: 'update:ocupacion', value: string): void;
  (e: 'image-selected', file: File): void;
  (e: 'remove-image'): void;
  (e: 'validate-nombre'): void;
  (e: 'validate-puesto'): void;
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const imageInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  imageInput.value?.click();
};

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    emit('image-selected', input.files[0]);
  }
};

const handleRemoveImage = () => {
  emit('remove-image');
  if (imageInput.value) {
    imageInput.value.value = '';
  }
};
</script>

<style scoped lang="scss">
.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
}

// Sección de foto
.photo-section {
  width: 100%;
}

.photo-upload-zone {
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:not(.has-image) {
    border: 2px dashed var(--border-color);
    border-radius: 12px;
    padding: .5rem;
    background-color: var(--form-bg);

    &:hover {
      border-color: var(--primary-green-color);
      background-color: var(--form-bg-hover);
    }
  }

  &.has-image {
    cursor: default;
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .photo-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-green-color) 0%, var(--btn-hover-green) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(var(--primary-green-color-rgb), 0.25);

      svg {
        width: 60px;
        height: 60px;
        color: var(--btn-primary-text);
      }
    }

    .upload-text {
      margin: 0;
      color: var(--text-color-1);
      font-size: 0.95rem;
      font-weight: 500;
    }
  }

  .photo-preview {
    position: relative;
    width: 100%;
    max-width: 150px;
    margin: 0 auto;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid var(--primary-green-color);
      box-shadow: 0 4px 12px rgba(var(--primary-green-color-rgb), 0.25);
    }

    .btn-remove-photo {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--error-color);
      border: 2px solid var(--card-bg-solid);
      color: var(--btn-primary-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: #c41111;
        transform: scale(1.1);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}

// Formulario
.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

// Contenedor de inputs
.inputs-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background-color: var(--form-container-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.form-control {
  border-color: var(--border-color);
  background-color: var(--form-input-bg);
  color: var(--text-color-3);
  transition: all .3s ease-in-out;
  backdrop-filter: blur(5px);

  &:focus {
    box-shadow: 0 3px 8px rgba(var(--primary-green-color-rgb), 0.15);
    border-color: var(--border-color);
  }
}

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: -0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: currentColor;
    mask-image: url("data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M19.96 8.52c.02-.17.04-.35.04-.52 0-2.38-2.14-4.29-4.52-3.96C14.79 2.81 13.47 2 12 2s-2.79.8-3.48 2.04C6.14 3.72 4 5.63 4 8c0 .17.01.35.04.52C2.81 9.21 2 10.53 2 12s.8 2.79 2.04 3.48c-.02.17-.04.35-.04.52 0 2.38 2.14 4.29 4.52 3.96C9.21 21.19 10.53 22 12 22s2.79-.8 3.48-2.04C17.86 20.28 20 18.37 20 16c0-.17-.01-.35-.04-.52C21.19 14.79 22 13.47 22 12s-.8-2.79-2.04-3.48m-1.44 5.4-1.1.29.43 1.05c.09.23.14.48.14.73 0 1.1-.9 2-2 2-.25 0-.5-.05-.73-.15l-1.05-.43-.29 1.1c-.23.87-1.02 1.48-1.92 1.48s-1.69-.61-1.92-1.48l-.29-1.1-1.05.43c-.23.09-.48.15-.73.15-1.1 0-2-.9-2-2 0-.25.05-.5.14-.73l.43-1.05-1.1-.29C4.61 13.69 4 12.9 4 12s.61-1.69 1.48-1.92l1.1-.29-.43-1.05c-.09-.23-.14-.48-.14-.73 0-1.1.9-2 2-2 .25 0 .5.05.73.15l1.05.43.29-1.1c.23-.87 1.02-1.48 1.92-1.48s1.69.61 1.92 1.48l.29 1.1 1.05-.43c.23-.09.48-.15.73-.15 1.1 0 2 .9 2 2 0 .25-.05.5-.14.73l-.43 1.05 1.1.29C19.39 10.31 20 11.1 20 12s-.61 1.69-1.48 1.92'/%3e%3cpath d='M11 11.5h2V16h-2zM11 8h2v2h-2z'/%3e%3c/svg%3e");
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }
}

.required {
  color: var(--error-color);
}

.optional {
  color: var(--text-color-1);
  font-weight: 400;
  font-size: 0.875rem;
  opacity: 0.7;
}

// Botones
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  button {
    flex: 1;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .btn-cancel {
    background-color: var(--tertiary-bg);
    border: 2px solid var(--border-color);
    color: var(--text-color-3);

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .btn-submit {
    background-color: var(--primary-green-color);
    color: var(--btn-primary-text);
    border: none;

    &:hover {
      background-color: var(--btn-hover-green);
      box-shadow: 0 2px 8px rgba(var(--primary-green-color-rgb), 0.3);
      transform: translateY(-1px);
    }
  }
}

@media (max-width: 576px) {
  .form-actions {
    flex-direction: column-reverse;
  }

  .photo-upload-zone .upload-placeholder .photo-circle {
    width: 100px;
    height: 100px;

    svg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
