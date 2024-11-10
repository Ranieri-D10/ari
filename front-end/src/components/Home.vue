<template>
    <div class="home">
        <h1>Agenda de Remédios</h1>
        <p v-if="message">{{ message }}</p>

        <div v-if="prescricoes.length > 0">
            <table>
                <thead>
                    <tr>
                        <th>Nome do Remédio</th>
                        <th>Função</th>
                        <th>Dosagem</th>
                        <th>Frequência</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Observação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="prescricao in prescricoes" :key="prescricao.id">
                        <td>{{ prescricao.remedio.nome }}</td>
                        <td>{{ prescricao.remedio.funcao }}</td>
                        <td>{{ prescricao.remedio.dosagem }} mg</td>
                        <td>{{ formatarData(prescricao.frequencia) }}</td>
                        <td>{{ formatarData(prescricao.dt_inicio) }}</td>
                        <td>{{ formatarData(prescricao.dt_fim) }}</td>
                        <td>{{ prescricao.observacao || 'N/A' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else>
            <p>Nenhuma prescrição encontrada.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            prescricoes: [],
            message: '',
        };
    },
    created() {
        this.buscarPrescricoes();
    },
    methods: {
        async buscarPrescricoes() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    this.message = 'Você precisa estar logado.';
                    return;
                }

                const response = await axios.get('http://localhost:3000/prescricoes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.prescricoes = response.data;
            } catch (error) {
                this.message = 'Erro ao carregar prescrições: ' + (error.response?.data?.message || error.message);
            }
        },
        formatarData(data) {
            return new Date(data).toLocaleDateString();
        },
    },
};
</script>

<style scoped>
.home {
    max-width: 800px;
    margin: auto;
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f4f4f4;
}
</style>