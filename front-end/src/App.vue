<template>
  <v-app>
    <NavBar />

    <!-- Corpo principal da aplicação -->
    <v-main class="main-content">
      <router-view />
    </v-main>

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

<style scoped>
.main-content {
  padding: 2rem;
  /* Espaço ao redor do conteúdo */
  flex: 1;
  /* Permite que o v-main ocupe o espaço restante */
  display: flex;
  justify-content: center;
  /* Centraliza o conteúdo horizontalmente */
  align-items: center;
  /* Centraliza o conteúdo verticalmente */
  min-height: calc(100vh - 64px - 60px);
  /* Ajuste a altura mínima de acordo com a altura da navbar e do footer */
}
</style>