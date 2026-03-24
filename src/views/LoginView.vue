<template>
  <div class="wrapper">
    <div class="login-container shadow-sm">
      <div class="h-100">
        <div class="logo-section text-center mt-5">
          <div class="logo-container" data-aos="fade-down" data-aos-duration="800">
            <img src="/logo.webp" alt="logo" />
          </div>
          <h2 class="association-name" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">ASIREA</h2>
        </div>
        <div class="d-flex justify-content-center">
          <div class="login-content">
            <!--             <div class="d-flex flex-column align-items-center mb-4">
              <h6 class="header">Inicio de Sesión</h6>
              <div class="underline"></div>
            </div> -->
            <form class="form" @submit.prevent="singIn">
              <div class="form-floating">
                <span>
                  <box-icon name="user" size="20px" color="currentColor"></box-icon>
                </span>
                <InputComponent id="username" placeholder="usuario" v-model="user.username" />
                <label for="username">Usuario</label>
              </div>
              <div class="form-floating">
                <span>
                  <box-icon name="key" size="20px" color="currentColor"></box-icon>
                </span>
                <InputComponent id="password" placeholder="Contraseña" :type="isPasswordVisible ? 'text' : 'password'"
                  v-model="user.password" />
                <label for="password">Contraseña</label>
                <span class="psw-icon" @click="togglePasswordVisible">

                  <svg v-if="!isPasswordVisible" width="24" height="26" version="1.1" id="_x32_"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                    xml:space="preserve">
                    <g>
                      <path class="st0" d="M512,282.163c-0.881-1.49-21.826-38.71-63.998-76.621c-21.106-18.932-47.584-38.03-79.667-52.494
		c-32.041-14.455-69.743-24.183-112.337-24.162c-42.595-0.014-80.296,9.707-112.341,24.162
		c-48.12,21.722-83.626,53.753-107.33,80.244C12.627,259.846,0.644,281.037,0,282.163l29.331,16.484l13.676,7.749l0.024-0.042
		l0.007-0.014c0.895-1.629,20.324-34.688,56.487-66.326c18.068-15.848,40.244-31.331,66.274-42.786
		c26.061-11.456,55.91-18.96,90.199-18.974c35.104,0.014,65.561,7.881,92.056,19.798c39.685,17.848,70.324,45.171,90.808,68.131
		c10.245,11.462,17.938,21.785,22.98,29.1c2.525,3.657,4.385,6.566,5.574,8.49c0.594,0.966,1.02,1.679,1.286,2.119l0.252,0.448
		l0.042,0.063l9.707-5.518l-9.734,5.469L512,282.163z" />
                      <path class="st0" d="M255.999,210.339c-47.71,0-86.388,38.674-86.388,86.391c0,47.71,38.678,86.384,86.388,86.384
		c47.71,0,86.388-38.674,86.388-86.384C342.386,249.014,303.708,210.339,255.999,210.339z" />
                    </g>
                  </svg>
                  <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
                      stroke="#464455" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <!--               <div class="text-end" style="font-size: .95em;">
                <a href=""><span>Recuperar contraseña</span></a>
              </div> -->
              <ButtonComponent :rounded="true" label="Acceder" :strong-label="true" class="sing-in-btn" type="submit" />
              <div>
                <div id="google-signIn-btn" role="button"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <LoaderComponent v-if="loading" :class="{ 'backdrop': loading }" />
    <Dialog v-if="isError" :header="errorMessage.header" :message="errorMessage.message" :icon="alert"
      @close="isError = false"></Dialog>
  </div>
</template>
<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { ref, onMounted } from 'vue';
import useAuthStore from '@/store/authStore';
import type { User } from '@/interfaces/User';
import Dialog from '@/components/DialogComponenet.vue';
import { ERROR } from '@/const';
import alert from '@/assets/alert.json'
import AOS from 'aos';
import 'aos/dist/aos.css';

const isError = ref(false);
const loading = ref<boolean>(false);
const errorMessage = ref<{ header: string, message: string }>(ERROR.request);
const isPasswordVisible = ref(false);
const authStore = useAuthStore();
type UserLogin = Pick<User, "username" | "password">;
const user = ref<UserLogin>({ username: "", password: "" });

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
  });
});

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
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color-1);

    .logo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .logo-container {
        width: 70px;
        height: 70px;
        padding: 10px;
        background: var(--primary-green-color);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .association-name {
        font-size: 1.8em;
        font-weight: 700;
        color: var(--primary-green-color);
        letter-spacing: 0.5px;
        margin: 0;
        text-transform: uppercase;
        animation: text-shadow-pop-top 0.8s both;
      }

      @keyframes text-shadow-pop-top {
        0% {
          text-shadow:
            0 0 #555555,
            0 0 #555555,
            0 0 #555555,
            0 0 #555555,
            0 0 #555555;
          transform: translateY(0);
        }

        100% {
          text-shadow:
            0 -1px rgba(0, 0, 0, 0.25),
            0 -2px rgba(0, 0, 0, 0.25);
          transform: translateY(8px);
        }
      }
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
      font-weight: 500;
      font-size: .7em;
    }

    .underline {
      width: 40px;
      height: 5px;
      border-radius: 5px;
      background-color: var(--text-color-1);
    }

    .form {
      font-size: .8em;
      display: flex;
      flex-direction: column;
      gap: 14px;

      input {
        caret-color: rgba(var(--primary-green-color-rgb), .5);
      }

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
        transition: ease 0.2ms;
      }

      .form-control:focus {
        border: 2px solid rgba(var(--primary-green-color-rgb), 0.3);
      }

      .form-control,
      .sing-in-btn {
        border-color: var(--border-color);
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

      .sing-in-btn {
        padding: 12px 0;
        background-color: #c9d7ce;
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
      width: 36vw;
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
