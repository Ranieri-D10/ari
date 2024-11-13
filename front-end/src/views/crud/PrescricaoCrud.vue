<template>
    <div class="prescricao-crud">
        <h2>Gerenciamento de Prescrições</h2>
        <div class="container">
            <div class="card form-card">
                <form @submit.prevent="createPrescricao" class="form">
                    <div class="form-group">
                        <label for="id_remedio">ID do Remédio:</label>
                        <input v-model="novaPrescricao.id_remedio" id="id_remedio" type="number" required />
                    </div>
                    <div class="form-group">
                        <label for="observacao">Observação:</label>
                        <input v-model="novaPrescricao.observacao" id="observacao" />
                    </div>
                    <div class="form-group">
                        <label for="frequencia">Frequência (vezes por dia):</label>
                        <input v-model="novaPrescricao.frequencia" id="frequencia" type="number" required />
                    </div>
                    <div class="form-group">
                        <label for="dt_inicio">Data de Início:</label>
                        <input v-model="novaPrescricao.dt_inicio" id="dt_inicio" type="date" required />
                    </div>
                    <div class="form-group">
                        <label for="dt_fim">Data de Fim:</label>
                        <input v-model="novaPrescricao.dt_fim" id="dt_fim" type="date" required />
                    </div>
                    <button type="submit" class="action-button">Adicionar Prescrição</button>
                </form>
            </div>

            <div class="card list-card">
                <h3>Lista de Prescrições</h3>
                <ul>
                    <li v-for="prescricao in prescricoes" :key="prescricao.id">
                        Usuário ID: {{ prescricao.id_usuario }} - Remédio ID: {{ prescricao.id_remedio }}<br>
                        Observação: {{ prescricao.observacao }}<br>
                        Frequência: {{ prescricao.frequencia }}x/dia<br>
                        Início: {{ new Date(prescricao.dt_inicio).toLocaleDateString() }}<br>
                        Fim: {{ new Date(prescricao.dt_fim).toLocaleDateString() }}<br>
                        <button @click="confirmDelete(prescricao.id)" class="delete-button">Deletar</button>
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
            prescricoes: [],
            novaPrescricao: {
                id_usuario: '', // Será preenchido automaticamente
                id_remedio: '',
                observacao: '',
                frequencia: '',
                dt_inicio: '',
                dt_fim: '',
                status: true // Status padrão como true
            },
        };
    },
    methods: {
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
        },
        async createPrescricao() {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!userId || !token) {
                    console.error('Usuário não autenticado');
                    return;
                }

                // Atribuir o id_usuario antes de enviar a nova prescrição
                this.novaPrescricao.id_usuario = Number(userId);

                // Converter campos numéricos e datas
                this.novaPrescricao.id_remedio = Number(this.novaPrescricao.id_remedio);
                this.novaPrescricao.frequencia = Number(this.novaPrescricao.frequencia);
                this.novaPrescricao.dt_inicio = new Date(this.novaPrescricao.dt_inicio).toISOString();
                this.novaPrescricao.dt_fim = new Date(this.novaPrescricao.dt_fim).toISOString();

                // Enviar requisição para criar a prescrição com o token de autenticação
                const response = await axios.post('http://localhost:3000/api/prescricoes', this.novaPrescricao, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status === 201) {
                    this.fetchPrescricoes(); // Atualizar lista de prescrições
                    this.resetForm(); // Resetar formulário
                } else {
                    console.error('Erro na resposta ao criar prescrição:', response);
                }
            } catch (error) {
                console.error('Erro ao criar prescrição:', error);
            }
        },
        resetForm() {
            // Resetar dados da nova prescrição
            this.novaPrescricao = {
                id_usuario: '', // Mantido para novo preenchimento
                id_remedio: '',
                observacao: '',
                frequencia: '',
                dt_inicio: '',
                dt_fim: '',
                status: true
            };
        },
        confirmDelete(id) {
            if (confirm('Você tem certeza que deseja deletar esta prescrição?')) {
                this.deletePrescricao(id);
            }
        },
        async deletePrescricao(id) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token de autenticação não encontrado');
                    return;
                }

                await axios.delete(`http://localhost:3000/api/prescricoes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.fetchPrescricoes();
            } catch (error) {
                console.error('Erro ao deletar prescrição:', error);
            }
        },
    },
    mounted() {
        this.fetchPrescricoes();
    },
};
</script>

<style scoped>
.prescricao-crud {
    width: 80%;
    margin: auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container {
    display: flex;
    justify-content: space-between;
}

.card {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-card {
    width: 45%;
}

.list-card {
    width: 50%;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.action-button {
    width: 100%;
    padding: 10px;
    background-color: #007f4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.action-button:hover {
    background-color: #005934;
}

.delete-button {
    padding: 5px 10px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #cc5140;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
}
</style>
