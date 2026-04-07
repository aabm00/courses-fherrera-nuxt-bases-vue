<template>
    <section>
        <h2>#1 Bulbasaur</h2>
        <img src="" alt="">

        <button @click="pokemonId++">Siguiente</button>
        <h3>PokemonId: {{ pokemonId }}</h3>

        <pre>{{ responseData }}</pre>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';


interface Pokemon {
    id: number;
    name: string;
    image: string;
}

const pokemonId = ref(1);

const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`)
const responseData = await response.json()
console.log({responseData})

</script>

<style scoped>

</style>