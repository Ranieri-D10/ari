<!-- src/App.vue -->
<template>
  <v-app>
    <!-- Usa o seu NavBar.vue como barra de navegação -->
    <NavBar />

    <!-- Corpo principal da aplicação -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Usa o novo Footer.vue -->
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    NavBar,
    Footer,
  },
};
</script>
