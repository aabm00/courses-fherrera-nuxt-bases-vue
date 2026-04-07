<script setup lang="ts">

import PokemonInfo from './components/PokemonInfo.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import { useProducts } from './composable/useProducts';

const { products, handleIncrementQuantity, handleDecrementQuantity } = useProducts()

</script>

<template>
  <div>
    <h1>Mi carrito de compras</h1>

    <ShoppingCart 
      v-for="product in products" key="product.id"
      v-bind="product" 
      @increment="() => handleIncrementQuantity(product.id)" 
      @decrement="() => handleDecrementQuantity(product.id)"/>

      <!-- <Suspense> -->
        <PokemonInfo />
      <!-- </Suspense> -->
  </div>

</template>
