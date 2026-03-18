<template>
  <button class="back-btn" title="Volver">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
      <path d="M11.79 6.29 6.09 12l5.7 5.71 1.42-1.42L9.91 13H18v-2H9.91l3.3-3.29z"></path>
    </svg>
  </button>
</template>
<style scoped>
.back-btn {
  background: rgba(var(--primary-green-color-rgb), 0.12);
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  color: var(--text-color-1);
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover svg {
    transform: translateX(-2px);
    transition: transform 0.2s ease;
  }
}
</style>
