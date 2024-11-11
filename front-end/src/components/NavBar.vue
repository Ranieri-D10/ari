<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><button @click="logout">Logout</button></li>
        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('authToken'); // Remove o token de autenticação
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f0f0f0;
}
</style>