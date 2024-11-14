<template>
    <div class="calendario-simples">
        <!-- Contêiner para as setas de navegação e data -->
        <div class="navegacao">
            <button @click="diaAnterior" class="navegar-esquerda">&larr;</button>

            <!-- Data centralizada acima do título de remédios -->
            <div class="data-atual">
                <h3>{{ dataFormatada }}</h3>
            </div>

            <button @click="proximoDia" class="navegar-direita">&rarr;</button>
        </div>

        <div v-if="prescricoesDoDia.length" class="remedios-container">
            <!-- Título centralizado abaixo da data -->
            <h3>Remédios para Hoje</h3>
            <div class="remedios-lista">
                <div v-for="prescricao in prescricoesDoDia" :key="prescricao.id" class="remedio-card">
                    <div class="remedio-nome">{{ prescricao.remedio.nome }}</div>
                    <div class="remedio-info">
                        Frequência: {{ prescricao.frequencia }}x por dia
                    </div>
                    <div class="remedio-observacao">
                        Observação: {{ prescricao.observacao || 'Nenhuma observação' }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="sem-remedios">
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
            prescricoes: []
        };
    },
    computed: {
        dataFormatada() {
            return this.dataAtual.toLocaleDateString("pt-BR", { day: '2-digit', month: 'long', year: 'numeric' });
        },
        prescricoesDoDia() {
            return this.prescricoes.filter(prescricao => this.verificarData(prescricao, this.dataAtual));
        }
    },
    methods: {
        verificarData(prescricao, data) {
            const dataAtual = data.setHours(0, 0, 0, 0);
            const dtInicio = new Date(prescricao.dt_inicio).setHours(0, 0, 0, 0);
            const dtFim = new Date(prescricao.dt_fim).setHours(0, 0, 0, 0);

            return dataAtual >= dtInicio && dataAtual <= dtFim;
        },
        proximoDia() {
            this.dataAtual.setDate(this.dataAtual.getDate() + 1);
            this.dataAtual = new Date(this.dataAtual);
        },
        diaAnterior() {
            this.dataAtual.setDate(this.dataAtual.getDate() - 1);
            this.dataAtual = new Date(this.dataAtual);
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
.calendario-simples {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 12px;
    background-color: #f0f8ff;
    width: 100%;
    margin-bottom: 1.5rem;
}

.navegacao {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.navegar-esquerda,
.navegar-direita {
    background: none;
    border: none;
    font-size: 2.5rem;
    color: #007f4d;
    cursor: pointer;
    padding: 0 1rem;
}

.data-atual {
    margin: 0;
    text-align: center;
    color: #007f4d;
    font-size: 1.2rem;
}

.remedios-container {
    width: 100%;
    margin-top: 0.5rem;
}

.remedios-lista {
    max-height: 200px;
    overflow-y: auto;
    padding-right: 1rem;
}

.remedio-card {
    background-color: #e7f3ea;
    border: 1px solid #007f4d;
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 0;
}

.remedio-nome {
    font-weight: bold;
    color: #005934;
}

.remedio-info,
.remedio-observacao {
    margin-top: 0.5rem;
    color: #333;
    font-size: 0.95rem;
}

.sem-remedios {
    text-align: center;
    color: #777;
    font-size: 1rem;
    margin-top: 1rem;
}
</style>
