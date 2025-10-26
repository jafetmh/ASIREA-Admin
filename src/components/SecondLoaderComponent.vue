<template>
  <div class="loader-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
      <rect width="6" height="14" x="1" y="4" fill="currentColor">
        <animate id="SVGBoZ3Ab9F" fill="freeze" attributeName="y" begin="0;SVG0XJl4OCs.end-0.275s" dur="0.825s"
          values="1;5" />
        <animate fill="freeze" attributeName="height" begin="0;SVG0XJl4OCs.end-0.275s" dur="0.825s" values="22;14" />
        <animate fill="freeze" attributeName="opacity" begin="0;SVG0XJl4OCs.end-0.275s" dur="0.825s" values="1;0.2" />
      </rect>
      <rect width="6" height="14" x="9" y="4" fill="currentColor" opacity="0.4">
        <animate fill="freeze" attributeName="y" begin="SVGBoZ3Ab9F.begin+0.165s" dur="0.825s" values="1;5" />
        <animate fill="freeze" attributeName="height" begin="SVGBoZ3Ab9F.begin+0.165s" dur="0.825s" values="22;14" />
        <animate fill="freeze" attributeName="opacity" begin="SVGBoZ3Ab9F.begin+0.165s" dur="0.825s" values="1;0.2" />
      </rect>
      <rect width="6" height="14" x="17" y="4" fill="currentColor" opacity="0.3">
        <animate id="SVG0XJl4OCs" fill="freeze" attributeName="y" begin="SVGBoZ3Ab9F.begin+0.33s" dur="0.825s"
          values="1;5" />
        <animate fill="freeze" attributeName="height" begin="SVGBoZ3Ab9F.begin+0.33s" dur="0.825s" values="22;14" />
        <animate fill="freeze" attributeName="opacity" begin="SVGBoZ3Ab9F.begin+0.33s" dur="0.825s" values="1;0.2" />
      </rect>
    </svg>
  </div>
</template>
<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
