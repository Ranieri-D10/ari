<template>
    <nav class="navbar">
        <button class="nav-button" @click="$router.push('/home')">Home</button>
        <button class="nav-button" @click="logout">Logout</button>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('token'); // Remove o token de autenticação
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
    background-color: #007f4d;
}

.nav-button {
    background-color: #fff;
    color: #007f4d;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.nav-button:hover {
    background-color: #005934;
    color: #fff;
}
</style>
