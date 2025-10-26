<template>
    <input
        :class="['form-control', {'is-invalid': error}]"
        :placeholder="props.placeholder"
        :type="props.type"
        :id="props.id"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        placeholder: {
            type: String,
            required: false
        },
        error: {
            type: Boolean,
            required: false
        },
        type: {
            type: String,
            default: 'text'
        },
        id: {
            type: String,
            required: false
        },
        modelValue: {
            type: String,
            default: ''
        }
    })

    const emit = defineEmits(['update:modelValue'])
</script>
<style scoped lang="scss">
    .form-control {
        color: var(--text-secondary-clr);
    }
    .form-control:focus {
        border-width: 1px;
        border-color: rgb(46, 85, 64);
        /* border-color: var(--text-color-1); */
        box-shadow: none;
    }
</style>
