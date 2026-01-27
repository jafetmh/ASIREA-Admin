<template>
  <div class="profile-container">

    <section class="profile-banner">
      <img src="/Carrusel4c.png">
    </section>
    <section class="profile-avatar">
      <div class="avatar-wrapper">
        <img v-if="profileImgUrl" :src="profileImgUrl" alt="Foto de Perfil" class="avatar rounded-circle">
        <div v-else class="avatar-placeholder rounded-circle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path
              d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
          </svg>
        </div>
      </div>
      <input type="file" ref="fileInput" accept="image/*" @change="onFileSelected" class="d-none">
      <button class="camera-btn" @click="openFileInput">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
          <path
            d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Z" />
        </svg>
      </button>
    </section>
    <section class="profile-details">
      <div class="form-container">
        <div class="section-header">
          <h6>Crear cuenta</h6>
        </div>
        <UserProfileForm :user="newUser" :isEdit="false" :inputDisabled="false" @submit="handleSubmit" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import UserProfileForm from '@/components/UserProfileForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '@/interfaces/User'
import api from '@/utils/axios';
import { apiRoutes } from '@/api/api_routes';

const router = useRouter();

const newUser = ref<Partial<User>>({});
const fileInput = ref<HTMLInputElement | null>(null);
const profileImgUrl = ref<string>();

const handleSubmit = async (user: Partial<User>) => {
  try {
    const response = await api.post(apiRoutes.singUp, user);
    console.log(response);
    router.push('/home');
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
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

    .avatar-wrapper {
      position: relative;
      margin: 0.75rem;
    }

    .avatar {
      padding: 0;
      width: 150px;
      height: 150px;
      border: 5px solid var(--border-color);
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 150px;
      height: 150px;
      border: 5px solid var(--border-color);
      background-color: var(--tertiary-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary-clr);

      svg {
        width: 80px;
        height: 80px;
        opacity: 0.6;
      }
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
    padding: 1rem;
    background-color: var(--bg-green);

    .form-container {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 0.5rem;
    }

    .section-header {
      width: 100%;
      padding-bottom: 0.75rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid var(--border-color);
      text-align: left;

      h6 {
        font-weight: bold;
        font-size: 1em;
        margin: 0;
      }
    }
  }
}

svg {
  fill: rgba(var(--bg-secondary-rgb), 1);
}

@include respond-to(mobile-xs) {
  .profile-container {
    .profile-banner {
      height: 150px;
    }

    .profile-avatar {
      margin-top: -50px;

      .avatar,
      .avatar-placeholder {
        width: 100px;
        height: 100px;
      }

      .avatar-placeholder svg {
        width: 50px;
        height: 50px;
      }

      .camera-btn {
        transform: translate(65px, 55px);
        width: 32px;
        height: 32px;
      }
    }

    .profile-details .section-header h6 {
      font-size: 0.9em;
    }
  }
}

@include respond-to(mobile-sm) {
  .profile-container {
    .profile-banner {
      height: 180px;
    }

    .profile-avatar {
      margin-top: -60px;

      .avatar,
      .avatar-placeholder {
        width: 120px;
        height: 120px;
      }

      .avatar-placeholder svg {
        width: 60px;
        height: 60px;
      }

      .camera-btn {
        transform: translate(80px, 65px);
        width: 35px;
        height: 35px;
      }
    }
  }
}

@include respond-to(tablet) {
  .profile-container {
    .profile-details {
      padding: 1.5rem;

      .form-container {
        padding: 0 1rem;
      }
    }
  }
}

@include respond-to(desktop) {
  .profile-container {
    .profile-details {
      padding: 2rem;

      .form-container {
        padding: 0 2rem;
      }

      .section-header h6 {
        font-size: 1.1em;
      }
    }
  }
}

@include respond-to(desktop-lg) {
  .profile-container .profile-details .section-header h6 {
    font-size: 1.2em;
  }
}

@include respond-to(desktop-xl) {
  .profile-container .profile-details .section-header h6 {
    font-size: 1.3em;
  }
}
</style>
