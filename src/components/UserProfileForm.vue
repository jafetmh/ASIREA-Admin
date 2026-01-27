<template>
    <form class="form" @submit.prevent="sendFormData">
        <div class="form-grid">
            <div class="form-floating">
                <InputComponent id="name" type="text" placeholder="Nombre" :value="formData?.name"
                    v-model="formData.name" :disabled="inputDisabled" />
                <label for="name">Nombre</label>
            </div>
            <div class="form-floating">
                <InputComponent id="email" type="text" placeholder="Correo electronico" :value="formData?.email"
                    v-model="formData.email" :disabled="inputDisabled" />
                <label for="email">Correo electronico</label>
            </div>
            <div class="form-floating">
                <InputComponent id="username" type="text" placeholder="Nombre de usuario"
                    v-model="formData.username" :value="formData?.username" :disabled="inputDisabled" />
                <label for="username">Nombre de usuario</label>
            </div>
            <div v-if="!isEdit" class="form-floating">
                <InputComponent id="password" type="password" placeholder="Contraseña"
                    v-model="formData.password" />
                <label for="password">Contraseña</label>
            </div>
        </div>
        <Transition name="slide-fade">
            <div v-if="!inputDisabled || !isEdit" class="form-actions">
                <ButtonComponent type="submit" :rounded="false"
                    :label="isEdit ? 'Actualizar' : 'Guardar'" />
            </div>
        </Transition>
    </form>
</template>
<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import InputComponent from './InputComponent.vue';
import type { User } from '@/interfaces/User'
import { reactive, watch } from 'vue';

type UserData = Partial<User>;
interface Props {
    user?: Partial<UserData>;
    isEdit: boolean
    inputDisabled: boolean
};
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'submit', user: UserData): void; }>();
const formData = reactive<UserData>({ ...props.user });

//emite el evento submit con info del usuario
const sendFormData = () => { emit('submit', formData) }

watch(() => props.user, (newUser) => {
    Object.assign(formData, newUser);
})

</script>
<style scoped lang="scss">
.form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.form-floating {
  width: 100%;
}

.form-floating label {
  font-size: 0.85em;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

button {
  min-width: 120px;
  padding: 0.6rem 1.2rem;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@include respond-to(tablet) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .form {
    max-width: 700px;
  }
}

@include respond-to(desktop) {
  .form {
    max-width: 800px;
    padding: 1.5rem 0;
  }

  .form-grid {
    gap: 1.25rem;
  }
}

@include respond-to(desktop-lg) {
  .form {
    max-width: 900px;
  }

  .form-grid {
    gap: 1.5rem;
  }
}
</style>
