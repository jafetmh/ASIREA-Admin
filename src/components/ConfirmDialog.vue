<template>
  <div class="dialog-container">
    <dialog class="modal rounded" ref="dialog">
      <div class="content">
        <Vue3Lottie v-if="props.icon" :animation-data="props.icon" :height="100" :width="100" :loop="false"
          style="margin-top: -15px;">
        </Vue3Lottie>
        <div class="ms-2">
          <h6>{{ props.header }}</h6>
          <p>{{ props.message }}</p>
        </div>
      </div>
      <div class="dlg-buttons">
        <button @click="handleCancel" class="btn-cancel">Cancelar</button>
        <button @click="handleConfirm" class="btn-confirm">{{ confirmText }}</button>
      </div>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

const dialog = ref<HTMLDialogElement | null>(null)
const emit = defineEmits(['confirm', 'cancel']);

const props = defineProps<{
  header: string,
  message: string,
  icon?: object,
  confirmText?: string
}>()

onMounted(() => {
  dialog.value?.showModal();
  dialog.value?.classList.add('show')
})

const handleConfirm = () => {
  closeModal(() => emit('confirm'));
}

const handleCancel = () => {
  closeModal(() => emit('cancel'));
}

const closeModal = (callback?: () => void) => {
  dialog.value?.classList.remove('show')
  dialog.value?.classList.add('hide')
  setTimeout(() => {
    dialog.value?.close();
    dialog.value?.classList.remove('hide')
    if (callback) callback();
  }, 300)
}
</script>
<style lang="scss" scoped>
.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: .8em;

  .modal {
    top: 50%;
    left: 50%;
    position: absolute;
    background-color: var(--bg-body-1);
    width: max-content;
    height: max-content;
    opacity: 0;
    translate: 0px 100px;
    padding: 2em;
    border: none;
    transition: translate .3s ease, opacity .3s ease;
    pointer-events: none;

    .content {
      display: inline-flex;

      h6 {
        font-weight: bold;
      }
    }

    .dlg-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;

      button {
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.9;
        }
      }

      .btn-cancel {
        background-color: var(--border-color);
        color: var(--text-color-1);
      }

      .btn-confirm {
        background-color: #dc3545;
        color: white;
      }
    }
  }

  .modal[open] {
    @include flexbox(column);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(var(--black-rgb), .5);

    .dlg-buttons {
      width: 100%;
      @include flexbox($justify-content: center);

      button {
        min-width: 100px;
      }
    }
  }

  .modal:not([open]) {
    display: none;
  }

  .modal::backdrop {
    backdrop-filter: blur(1px);
  }

  dialog.show {
    translate: 0px 0px;
    opacity: 1;
    pointer-events: auto;
  }

  dialog.hide {
    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none;
  }
}
</style>
