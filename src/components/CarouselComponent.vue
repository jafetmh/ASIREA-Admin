<template>
    <div class="swiper-container">
        <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper">
            <swiper-slide><img src="../assets/card4.webp" alt=""></swiper-slide>
            <swiper-slide><img src="../assets/card.webp" alt=""></swiper-slide>
            <swiper-slide><img src="../assets/card3.webp" alt=""></swiper-slide>
            <swiper-slide><img src="../assets/card1.webp" alt=""></swiper-slide>
            <swiper-slide><img src="../assets/card5.jpg" alt=""></swiper-slide>
        </swiper>
        <!--         <swiper :modules="[A11y, Autoplay]" :autoplay="{ delay: 180000, disableOnInteraction: false }" :loop="true">
            <swiper-slide><img :src="Foto3" alt=""></swiper-slide>
            <swiper-slide><img :src="Foto" alt=""></swiper-slide>
            <swiper-slide><img :src="Foto1" alt=""></swiper-slide>
            <swiper-slide><img :src="Foto2" alt=""></swiper-slide>
        </swiper> -->
    </div>
</template>
<script setup lang="ts">
import { EffectCards } from 'swiper/modules';

import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Foto from '@/assets/foto.jpg'
import Foto1 from '@/assets/foto1.jpg'
import Foto2 from '@/assets/foto2.jpg'
import Foto3 from '@/assets/background.webp'

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const modules = [EffectCards]
</script>
<style scoped lang="scss">
.swiper {
    width: 260px;
    height: 420px;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.swiper-slide:nth-child(2n) {
    background-color: rgb(0, 140, 255);
}

.swiper-slide:nth-child(3n) {
    background-color: rgb(10, 184, 111);
}

.swiper-slide:nth-child(4n) {
    background-color: rgb(211, 122, 7);
}

.swiper-slide:nth-child(5n) {
    background-color: rgb(118, 163, 12);
}

.swiper-slide:nth-child(6n) {
    background-color: rgb(180, 10, 47);
}

.swiper-slide:nth-child(7n) {
    background-color: rgb(35, 99, 19);
}

.swiper-slide:nth-child(8n) {
    background-color: rgb(0, 68, 255);
}

.swiper-slide:nth-child(9n) {
    background-color: rgb(218, 12, 218);
}

.swiper-slide:nth-child(10n) {
    background-color: rgb(54, 94, 77);
}

@include respond-to(desktop) {
    .swiper-slide img {
        height: 570px;
    }
}
</style>