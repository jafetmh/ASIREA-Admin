<template>
  <div class="personal-card" :class="{ 'expanded': isExpanded }">
    <div class="card-main" @click="toggleExpanded">
      <div class="card-photo">
        <img v-if="person.foto" :src="person.foto" :alt="person.nombre" />
        <div v-else class="photo-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 5c1.73 0 3 1.27 3 3s-1.27 3-3 3-3-1.27-3-3 1.27-3 3-3m0 13a7.98 7.98 0 0 1-5.48-2.18C7.33 16.16 9.03 15 11 15h2c1.97 0 3.66 1.16 4.47 2.82A7.94 7.94 0 0 1 12 20">
            </path>
          </svg>
        </div>
      </div>

      <div class="card-info">
        <h3 class="person-name">{{ person.nombre }}</h3>
        <p class="person-occupation">{{ person.ocupacion }}</p>
        <p class="person-position">{{ person.puesto }}</p>
      </div>
    </div>

    <Transition name="slide-fade">
      <div v-if="isExpanded" class="card-actions">
        <ButtonComponent label="Actualizar" :rounded="false" class="btn-edit" @click.stop="handleEdit" />
        <ButtonComponent label="Eliminar" :rounded="false" class="btn-delete" @click.stop="handleDelete" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import { type Personal } from '@/interfaces/Personal';

interface Props {
  person: Personal;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
}>();

const isExpanded = ref(false);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const handleEdit = () => {
  emit('edit', props.person.id);
};

const handleDelete = () => {
  emit('delete', props.person.id);
};
</script>

<style scoped lang="scss">
.personal-card {
  background-color: var(--bg-body);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-green-color);
    box-shadow: 0 4px 12px rgba(var(--primary-green-color-rgb), 0.15);
    transform: translateY(-2px);
  }

  &.expanded {
    border-color: var(--primary-green-color);
  }
}

.card-main {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background-color: var(--bg-body);
}

.card-photo {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--tertiary-bg);
  border: 1px solid var(--border-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-2);

    svg {
      width: 50%;
      height: 50%;
    }
  }
}

.card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;

  .person-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--title-color);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .person-occupation {
    font-size: 0.875rem;
    color: var(--text-color-1);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .person-position {
    font-size: 0.875rem;
    color: var(--text-color-1);
    font-weight: 500;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: var(--tertiary-bg);
  border-top: 1px solid var(--border-color);

  button {
    flex: 1;
    padding: 0.625rem;
    border: 1px solid var(--border-color);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .btn-edit {
    background-color: var(--primary-green-color);
    color: var(--btn-primary-text);
    border-color: var(--primary-green-color);

    &:hover {
      background-color: var(--btn-hover-green);
      box-shadow: 0 2px 6px rgba(var(--primary-green-color-rgb), 0.3);
      transform: translateY(-1px);
    }
  }

  .btn-delete {
    background-color: var(--tertiary-bg);
    color: var(--error-color);
    border-color: var(--border-color);

    &:hover {
      background-color: var(--error-color);
      color: var(--btn-primary-text);
      box-shadow: 0 2px 6px rgba(231, 20, 20, 0.3);
      transform: translateY(-1px);
    }
  }
}

// Animación para la banda de acciones
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 576px) {
  .card-main {
    padding: 1rem;
  }

  .card-photo {
    width: 70px;
    height: 70px;
  }

  .card-info {
    .person-name {
      font-size: 1rem;
    }

    .person-occupation,
    .person-position {
      font-size: 0.8rem;
    }
  }

  .card-actions {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
