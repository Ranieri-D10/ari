<template>
    <div class="historico-crud">
        <h2>Histórico de Prescrições</h2>
        <div class="container">
            <div class="card list-card">
                <h3>Lista de Históricos</h3>
                <ul>
                    <li v-for="historico in historicos" :key="historico.id">
                        <strong>Prescrição ID:</strong> {{ historico.id_prescricao }}<br>
                        <strong>Data Atual:</strong> {{ new Date(historico.dt_atual).toLocaleString() }}<br>
                        <strong>Status:</strong> {{ historico.status }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            historicos: []
        };
    },
    methods: {
        async fetchHistoricos() {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!userId || !token) {
                    console.error('Usuário não autenticado');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/api/historico/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.historicos = response.data;
            } catch (error) {
                console.error('Erro ao buscar históricos:', error);
            }
        }
    },
    mounted() {
        this.fetchHistoricos();
    }
};
</script>

<style scoped>
.historico-crud {
    width: 80%;
    margin: auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container {
    display: flex;
    justify-content: center;
}

.card {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.list-card {
    width: 100%;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
}
</style>