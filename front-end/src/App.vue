<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import NavBar from './components/NavBar.vue';

const router = useRouter();
const route = useRoute();

// Verifica se o usuário está autenticado pelo token
const isAuthenticated = ref(localStorage.getItem('token') !== null);

// Computed para verificar se a rota atual é "home"
const isHome = computed(() => route.name === 'home');

// Observa mudanças na rota para garantir que a autenticação esteja atualizada
watch(route, () => {
  isAuthenticated.value = localStorage.getItem('token') !== null;
});

// Redireciona para /login se o usuário tentar acessar /home sem estar autenticado
if (isHome.value && !isAuthenticated.value) {
  router.push('/login');
}
</script>

<template>
  <!-- Exibe o NavBar apenas para usuários autenticados -->
  <NavBar v-if="isAuthenticated" />

  <!-- Exibe o header de navegação para rotas de login e registro apenas se o usuário não estiver autenticado -->
  <header v-else>
    <nav>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
  </header>

  <!-- Renderiza o conteúdo principal da aplicação com layout em tela cheia apenas na home -->
  <div :class="{ 'full-screen': isHome && isAuthenticated }">
    <RouterView />
  </div>
</template>

<style scoped>
/* Define o layout para tela cheia na rota home */
.full-screen {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilos do header de navegação */
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
