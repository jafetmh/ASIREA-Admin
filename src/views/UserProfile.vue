<template>
  <div class="profile-container">

    <section class="profile-banner">
      <img src="/Carrusel4c.png">
    </section>
    <section class="profile-avatar">
      <img :src="currentUser?.picture || profileImgUrl" alt="Foto de Perfil" class="avatar rounded-circle m-3">
      <input type="file" ref="fileInput" accept="image/*" @change="onFileSelected" class="d-none">
      <Transition name="slide-fade">
        <button v-if="!isInputDisabled || !isEditing" class="camera-btn" @click="openFileInput">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
            <path
              d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Z" />
          </svg>
        </button>
      </Transition>
    </section>
    <section class="profile-details" :class="{ 'extended': !isInputDisabled }">
      <div class="container px-md-5 text-center">
        <div class="basic-style d-flex justify-content-between">
          <h6 class="m-2">{{ isEditing ? 'Detalles de la cuenta' : 'Crear cuenta' }}</h6>
          <Transition name="slide-fade">
            <ButtonComponent v-if="isEditing" @click="toggleInputs" label="Editar Perfil" :rounded="false" />
          </Transition>
        </div>
        <UserProfileForm :user="currentUser" :isEdit="isEditing" :inputDisabled="isInputDisabled"
          @submit="handleSubmit" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import useAuthStore from '@/store/authStore';
import UserProfileForm from '@/components/UserProfileForm.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ButtonComponent from '@/components/ButtonComponent.vue';
import defaultProfileImg from '@/assets/user.png'
import type { User } from '@/interfaces/User'
import api from '@/utils/axios';
import { apiRoutes } from '@/api/api_routes';

const store = useAuthStore();
const router = useRouter();

const isEditing = ref(false);
const route = useRoute();
const userId = ref<string>();
userId.value = route.params.id as string;
const currentUser = ref<Partial<User>>({ id: 0 });
const isInputDisabled = ref(true);
const fileInput = ref<HTMLInputElement | null>(null);
const profileImgUrl = ref<string>(defaultProfileImg);

onMounted(() => {
  if (userId.value) {
    isEditing.value = true;
    currentUser.value = { ...store.user };
  } else {
    isInputDisabled.value = false;
  }
})

const handleSubmit = async (user: Partial<User>) => {
  if (isEditing.value) {
    try {
      const response = await api.put(`${apiRoutes.users}/${userId.value}`, user);
      currentUser.value = { ...response.data };
      store.user = { ...response.data };
      isInputDisabled.value = true;
      console.log('Usuario actualizado:', response.data);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  } else {
    try {
      const response = await api.post(apiRoutes.singUp, user);
      console.log(response);
      router.push('/sing-up');
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  }
}

const toggleInputs = () => {
  isInputDisabled.value = !isInputDisabled.value;
}
const openFileInput = () => {
  fileInput.value?.click();
}

const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    profileImgUrl.value = URL.createObjectURL(input.files[0]);
  }
}

</script>

<style scoped lang="scss">
.profile-container {
  display: grid;
  grid-template-rows: auto auto 1fr;
  max-width: 100vw;
  min-height: calc(100vh - 62.7px);
  margin: 0;

  .profile-banner {
    height: 250px;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .profile-avatar {
    display: flex;
    justify-content: center;
    margin-top: -75px;
    position: relative;

    .avatar {
      padding: 0;
      width: 150px;
      height: 150px;
      border: 5px solid var(--border-color);
      object-fit: cover;
    }

    .camera-btn {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      position: absolute;
      right: 50%;
      bottom: 50%;
      transform: translate(100px, 80px);
    }
  }

  .profile-details {
    padding: 2rem;
    text-align: center;
    background-color: var(--bg-green);
    interpolate-size: allow-keywords;

    .basic-style {
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--border-color);

      h6 {
        font-weight: bold;
        font-size: 1em;
      }

      button {
        width: 118.71px;
        height: 35.18px;
        font-size: 0.85em;
      }
    }
  }

}

.extended {
  height: auto;
}

svg {
  fill: rgba(var(--bg-secondary-rgb), 1);
}

@include respond-to(mobile-xs) {
  .profile-details .basic-style {
    h6 {
      font-size: 0.85em;
    }

    button {
      font-size: 0.7em;
    }
  }
}

@include respond-to(mobile-sm) {
  .profile-details .basic-style {
    h6 {
      font-size: 0.9em;
    }

    button {
      font-size: 0.75em;
    }
  }
}

@include respond-to(mobile) {
  .profile-details .basic-style {
    h6 {
      font-size: 0.95em;
    }

    button {
      font-size: 0.8em;
    }
  }
}

@include respond-to(tablet) {
  .profile-details .basic-style {
    h6 {
      font-size: 1.05em;
    }

    button {
      font-size: 0.85em;
    }
  }
}

@include respond-to(desktop) {
  .profile-details .basic-style {
    h6 {
      font-size: 1.1em;
    }

    button {
      font-size: 0.9em;
    }
  }
}

@include respond-to(desktop-lg) {
  .profile-details .basic-style {
    h6 {
      font-size: 1.2em;
    }

    button {
      font-size: 0.95em;
    }
  }
}

@include respond-to(desktop-xl) {
  .profile-details .basic-style {
    h6 {
      font-size: 1.4em;
    }

    button {
      font-size: 1em;
    }
  }
}
</style>
