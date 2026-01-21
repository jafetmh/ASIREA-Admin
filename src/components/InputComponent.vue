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
