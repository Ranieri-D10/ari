<template>
    <nav class="menu">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><button @click="logout">Logout</button></li>
        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            // Lógica de logout, pode limpar o token ou redirecionar para login
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.menu {
    /* estilos do menu superior */
}
</style>