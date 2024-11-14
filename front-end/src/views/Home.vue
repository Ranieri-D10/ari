<template>
    <div class="home">
        <header class="header">
            <h2>Agenda de Remédios</h2>
        </header>

        <div class="container">
            <div class="calendario-container">
                <CalendarioSimples :prescricoes="prescricoes" />
            </div>

            <div class="funcionalidades-container">
                <section class="funcionalidades">
                    <h3>Funcionalidades</h3>
                    <button @click="navigateTo('remedios')" class="crud-button">Gerenciar Remédios</button>
                    <button @click="navigateTo('prescricoes')" class="crud-button">Gerenciar Prescrições</button>
                    <button @click="navigateTo('historico')" class="crud-button">Histórico de Prescrições</button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import CalendarioSimples from '../components/CalendarioSimples.vue';
import axios from 'axios';

export default {
    components: {
        CalendarioSimples
    },
    data() {
        return {
            prescricoes: []
        };
    },
    methods: {
        navigateTo(view) {
            this.$router.push(`/${view}`);
        },
        async fetchPrescricoes() {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!userId || !token) {
                    console.error('Usuário não autenticado');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/api/prescricoes/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.prescricoes = response.data;
            } catch (error) {
                console.error('Erro ao buscar prescrições:', error);
            }
        }
    },
    mounted() {
        this.fetchPrescricoes();
    }
};
</script>

<style scoped>
.home {
    max-width: 100%;
    margin: auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 12px;
}

.header {
    text-align: center;
    color: #007f4d;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.container {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
}

.calendario-container {
    flex: 12;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.funcionalidades-container {
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.funcionalidades {
    width: 100%;
    padding: 1.5rem;
    background-color: #f9fafc;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.crud-button {
    width: 80%;
    height: 70%;
    padding: 0.75rem;
    background-color: #007f4d;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.crud-button:hover {
    background-color: #005934;
}
</style>