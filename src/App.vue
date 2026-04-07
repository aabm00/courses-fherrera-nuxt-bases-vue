<script setup lang="ts">

import {ref} from 'vue'
import ShoppingCart from './components/ShoppingCart.vue';

const product = ref({
  name: "Camiseta",
  quantity: 10
})
</script>

<template>
  <div>
    <h1>Mi carrito de compras</h1>

    <ShoppingCart v-bind="product" />
  </div>
</template>
