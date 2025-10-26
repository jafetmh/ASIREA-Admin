<template>
  <div class="wrapper">
    <div class="login-container shadow-sm">
      <div class="h-100">
        <div class="text-center mt-5">
          <img :src="!authStore.darkMode ? AsireaSymbol : AsireaWhiteSymbol" alt="logo" class="me-2 asirea-logo" />
        </div>
        <div class="d-flex justify-content-center">
          <div class="login-content">
            <div class="d-flex flex-column align-items-center mb-4">
              <h5 class="header">Iniciar sesion</h5>
              <div class="underline"></div>
            </div>
            <form class="form" @submit.prevent="singIn">
              <div class="form-floating">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    style="fill: var(--text-secondary-clr);">
                    <path
                      d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                  </svg>
                </span>
                <InputComponent id="username" placeholder="usuario" v-model="user.username" />
                <label for="username">Usuario</label>
              </div>
              <div class="form-floating">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    style="fill: var(--text-secondary-clr);">
                    <path
                      d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                  </svg>
                </span>
                <InputComponent id="password" placeholder="Contraseña" :type="isPasswordVisible ? 'text' : 'password'"
                  v-model="user.password" />
                <label for="password">Contraseña</label>
                <span class="psw-icon" @click="togglePasswordVisible">
                  <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" height="24px"
                    viewBox="0 -960 960 960" width="24px" fill="currentColor">
                    <path
                      d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="currentColor">
                    <path
                      d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                </span>
              </div>
              <div class="text-end" style="font-size: .95em;">
                <a href=""><span>Recuperar contraseña</span></a>
              </div>
              <ButtonComponent :rounded="true" label="Acceder" class="sing-in-btn" type="submit" />
              <div>
                <div id="google-signIn-btn" role="button"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <LoaderComponent v-if="loading" :class="{'backdrop': loading }"/>
    <Dialog v-if="isError" :header="errorMessage.header" :message="errorMessage.message" :icon="error"
      @close="isError = false"></Dialog>
  </div>
</template>
<script setup lang="ts">
import AsireaSymbol from '../assets/Logosimbolo.webp'
import AsireaWhiteSymbol from '../assets/logosimboloblanco.webp'
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { ref } from 'vue';
import useAuthStore from '@/store/authStore';
import type { User } from '@/interfaces/User';
import Dialog from '@/components/DialogComponenet.vue';
import { ERROR } from '@/const';
import error from '@/assets/error.json'

const isError = ref(false);
const loading = ref<boolean>(false);
const errorMessage = ref<{ header: string, message: string }>(ERROR.request);
const isPasswordVisible = ref(false);
const authStore = useAuthStore();
type UserLogin = Pick<User, "username" | "password">;
const user = ref<UserLogin>({ username: "", password: "" });


const singIn = async () => {
  try {
    const { username, password } = user.value;
    if (username === "" || password === "") {
      errorMessage.value = ERROR.input
      isError.value = true
      return
    }
    loading.value = true
    await authStore.singIn(user.value)
    loading.value = false

  } catch (error: any) {
    loading.value = false

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'Error en la solicitud';

      if (status === 404) {
        errorMessage.value = {
          header: 'Usuario no encontrado',
          message: message
        }
      } else if (status === 401) {
        errorMessage.value = {
          header: 'Credenciales incorrectas',
          message: message
        }
      } else {
        errorMessage.value = {
          header: `Error ${status}`,
          message: message
        }
      }
    } else {
      errorMessage.value = ERROR.request
    }

    isError.value = true;
  }
}
const togglePasswordVisible = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
}
</script>
<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .login-container {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    background-color: #f0f0f0;

    .asirea-logo {
      width: 80px;
      height: 80px;
    }

    .login-content {
      width: 100%;
    }

    .asirea-logo {
      filter: drop-shadow(2px 2px 2px var(--accent-color));
    }
  }

  .login-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;

    .header {
      font-weight: 800;
      font-size: 1em;
    }

    .underline {
      width: 100px;
      height: 5px;
      border-radius: 5px;
      background-color: var(--border-color);
    }

    .form {
      font-size: .8em;
      display: flex;
      flex-direction: column;
      gap: 14px;

      .form-floating span {
        position: absolute;
        margin-right: 10px;
        top: 10px;
        padding: 10px;
        cursor: pointer;

        svg {
          fill: var(--text-color-1) !important;
          scale: 0.8;
        }
      }

      .form-floating .psw-icon {
        position: absolute;
        right: 0;
        top: 10px;
        cursor: pointer;
        border-radius: 50%;
      }

      .form-floating .psw-icon:hover,
      .form-floating .psw-icon:active {
        background-color: rgba(var(--tertiary-bg-rgb), 1);
      }

      .form-floating>label {
        left: 30px;
      }

      .form-control {
        background-color: var(--bg-body) !important;
      }

      .form-control,
      .form-control:focus {
        padding-left: 40px;
      }

      a {
        font-size: .9em;
        text-decoration: none;
        color: var(--accent-color);
        padding: 0;
        margin: 0;
      }

      .sing-in-btn,
      .sing-in-btn:active {
        color: var(--text-color);
        background-color: rgba(var(--white-rgb), 1);
      }
    }
  }
}

@include respond-to(mobile-xs) {
  .login-content {
    .header {
      font-size: 0.9em;
    }

    .form {
      font-size: 0.7em;
    }
  }
}

@include respond-to(mobile-sm) {
  .login-content {
    .header {
      font-size: 0.95em;
    }

    .form {
      font-size: 0.72em;
    }
  }
}

@include respond-to(mobile) {
  .login-content {
    .header {
      font-size: 1em;
    }

    .form {
      font-size: 0.75em;
    }
  }
}

@include respond-to(tablet) {
  .wrapper {
    background-color: var(--bg-body);
    @include flexbox();

    .login-container {
      width: 60vw;
      height: 90vh;
      /* border-radius: 10px; */
      overflow: hidden;


      .login-content {
        width: 85%;

        .header {
          font-size: 1.1em;
        }

        .form {
          font-size: 0.8em;
        }
      }
    }
  }
}

@include respond-to(desktop) {
  .wrapper {
    min-height: 100vh;
    background-color: rgb(46, 85, 64);
    @include flexbox();

    .login-container {
      width: 40vw;
      height: 90vh;
      max-width: 1400px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      justify-content: center;

      .login-content {
        grid-column: 2;
        width: 90%;

        .header {
          font-size: 1.2em;
        }

        .form {
          font-size: .9em !important;
        }
      }
    }
  }
}

@include respond-to(desktop-lg) {
  .wrapper {
    .login-container {
      max-width: 1600px;

      .login-content {
        .header {
          font-size: 1.3em;
        }

        .form {
          font-size: 0.9em;
        }
      }
    }
  }
}

@include respond-to(desktop-xl) {
  .wrapper {
    .login-container {
      max-width: 1800px;

      .login-content {
        .header {
          font-size: 1.5em;
        }

        .form {
          font-size: 1em;
        }
      }
    }
  }
}
</style>
