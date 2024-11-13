<template>
    <div class="calendario-simples">
        <!-- Navegação entre dias -->
        <button @click="diaAnterior" class="navegar-esquerda">&larr;</button>
        <div class="data-atual">
            <h2>{{ dataFormatada }}</h2>
        </div>
        <button @click="proximoDia" class="navegar-direita">&rarr;</button>

        <!-- Lista de remédios para o dia atual -->
        <div v-if="remediosDoDia.length" class="remedios-dia">
            <h3>Remédios para este dia</h3>
            <ul>
                <li v-for="remedio in remediosDoDia" :key="remedio.id">
                    {{ remedio.nome }} - {{ remedio.frequencia }}x por dia
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Sem remédios para hoje</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            dataAtual: new Date(),
            agendamentos: []
        };
    },
    computed: {
        dataFormatada() {
            return this.dataAtual.toLocaleDateString("pt-BR", { day: '2-digit', month: 'long', year: 'numeric' });
        },
        remediosDoDia() {
            return this.agendamentos.filter(agendamento => this.verificarData(agendamento, this.dataAtual));
        }
    },
    methods: {
        verificarData(agendamento, data) {
            const dataAtual = data.setHours(0, 0, 0, 0); // Considerando apenas a data, sem a hora
            const dtInicio = new Date(agendamento.dt_inicio).setHours(0, 0, 0, 0);
            const dtFim = new Date(agendamento.dt_fim).setHours(0, 0, 0, 0);

            // Verifica se a data atual está no intervalo da prescrição
            return dataAtual >= dtInicio && dataAtual <= dtFim;
        },
        proximoDia() {
            this.dataAtual.setDate(this.dataAtual.getDate() + 1);
            this.dataAtual = new Date(this.dataAtual); // Para reatividade
        },
        diaAnterior() {
            this.dataAtual.setDate(this.dataAtual.getDate() - 1);
            this.dataAtual = new Date(this.dataAtual); // Para reatividade
        },
        async fetchAgendamentos() {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!userId || !token) {
                    console.error('Usuário não autenticado');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/api/agendamentos/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.agendamentos = response.data;
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        }
    },
    mounted() {
        this.fetchAgendamentos();
    }
};
</script>

<style scoped>
.calendario-simples {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f0f8ff;
    width: 100%;
    margin-bottom: 2rem;
}

.data-atual h2 {
    margin: 0;
    color: #007f4d;
    text-align: center;
}

.navegar-esquerda,
.navegar-direita {
    background: none;
    border: none;
    font-size: 2.5rem;
    color: #007f4d;
    cursor: pointer;
}

.remedios-dia {
    color: #005934;
    font-weight: bold;
    text-align: center;
    margin-top: 0.5rem;
}
</style>
