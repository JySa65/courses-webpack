<template>
  <div id="app">
    <h1>Webpack + {{name}}</h1>
    <p>¡Hola Mundo, Webpack con {{name}}!</p>
    <nav class="Menu">
      <a v-for="link in links" :href="link[1]" :key="link[0]" v-text="link[0]"></a>
    </nav>
    <img :src="logo">
  </div>
</template>

<script>
  import style from '../style.css'
  import sass from '../scss/main.scss'
  import logo from '../img/vue-logo.png'
  import data from '../data.json'

  export default {
    data () {
      return {
        name: 'Vue.js',
        logo: logo,
        links: data.links
      }
    }
  }
</script>
