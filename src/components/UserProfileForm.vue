<template>
    <form class="form" @submit.prevent="sendFormData">
        <div class="row">
            <div class="col col-xxl-6">
                <div class="form-floating ">
                    <InputComponent id="name" type="text" placeholder="Nombre" :value="formData?.name"
                        v-model="formData.name" :disabled="inputDisabled" />
                    <label for="name">Nombre</label>
                </div>
            </div>
            <div class="col col-xxl-6">
                <div class="form-floating">
                    <InputComponent id="email" type="text" placeholder="Correo electronico" :value="formData?.email"
                        v-model="formData.email" :disabled="inputDisabled" />
                    <label for="email">Correo electronico</label>
                </div>
            </div>
        </div>
        <div class="m-1"></div>
        <div class="row">
            <div class="col col-xxl-6">
                <div class="form-floating ">
                    <InputComponent id="username" type="text" placeholder="Nombre de usuario"
                        v-model="formData.username" :value="formData?.username" :disabled="inputDisabled" />
                    <label for="username">Nombre de usuario</label>
                </div>
            </div>
            <div v-if="!isEdit" class="col col-xxl-6">
                <div class="form-floating ">
                    <InputComponent id="password" type="password" placeholder="Contraseña"
                        v-model="formData.password" />
                    <label for="username">Contraseña</label>
                </div>
            </div>
        </div>
        <Transition name="slide-fade">
            <div v-if="!inputDisabled || !isEdit">
                <div class="d-flex justify-content-end">
                    <ButtonComponent type="submit" class="m-2 fs-6" :rounded="false"
                        :label="isEdit ? 'Actualizar' : 'Guardar'" />
                </div>
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
.form-floating {
    width: 100%;
    margin: .5em;
}
.form-floating label {
  font-size: .8em;
}
button {
    width: 118.71px;
    height: 35.18px;
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

@include respond-to(mobile-xs) {
  .form-floating {
    margin: .3em;
  }
  .form-floating label {
    font-size: .65em;
  }
  button {
    width: 100px;
    height: 30px;
    font-size: 0.7em;
  }
}

@include respond-to(mobile-sm) {
  .form-floating {
    margin: .35em;
  }
  .form-floating label {
    font-size: .7em;
  }
  button {
    width: 105px;
    height: 32px;
    font-size: 0.75em;
  }
}

@include respond-to(mobile) {
  .form-floating {
    margin: .4em;
  }
  .form-floating label {
    font-size: .75em;
  }
  button {
    width: 110px;
    height: 33px;
    font-size: 0.8em;
  }
}

@include respond-to(tablet) {
  .form-floating {
    margin: .45em;
  }
  .form-floating label {
    font-size: .85em;
  }
  button {
    width: 115px;
    height: 34px;
    font-size: 0.85em;
  }
}

@include respond-to(desktop) {
  .form-floating {
    margin: .5em;
  }
  .form-floating label {
    font-size: .9em;
  }
  button {
    width: 118.71px;
    height: 35.18px;
    font-size: 0.9em;
  }
}

@include respond-to(desktop-lg) {
  .form-floating {
    margin: .55em;
  }
  .form-floating label {
    font-size: .95em;
  }
  button {
    width: 125px;
    height: 37px;
    font-size: 0.95em;
  }
}

@include respond-to(desktop-xl) {
  .form-floating {
    margin: .6em;
  }
  .form-floating label {
    font-size: 1em;
  }
  button {
    width: 135px;
    height: 40px;
    font-size: 1em;
  }
}
</style>
