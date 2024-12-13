<template>
    <div class="prescricao-crud">
        <h2>Gerenciamento de Prescrições</h2>
        <div class="container">
            <div class="card form-card">
                <form @submit.prevent="createPrescricao" class="form">
                    <div class="form-group">
                        <label for="id_remedio">Remédio:</label>
                        <select v-model="novaPrescricao.id_remedio" id="id_remedio" required>
                            <option value="" disabled>Selecione um remédio</option>
                            <option v-for="remedio in remedios" :key="remedio.id" :value="remedio.id">
                                {{ remedio.nome }}
                            </option>
                        </select>
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
                        Remédio: {{ prescricao.remedio.nome }}<br>
                        Observação: {{ prescricao.observacao }}<br>
                        Frequência: {{ prescricao.frequencia }}x/dia<br>
                        Início: {{ new Date(prescricao.dt_inicio).toLocaleDateString("pt-BR") }}<br>
                        Fim: {{ new Date(prescricao.dt_fim).toLocaleDateString("pt-BR") }}<br>
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
            remedios: [],
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

                // Busca prescrições com o id_usuario do usuário autenticado
                const response = await axios.get(`http://localhost:3000/api/prescricoes/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Verifica se cada prescrição possui o objeto 'remedio' com nome, caso contrário, busca o objeto completo.
                this.prescricoes = await Promise.all(response.data.map(async (prescricao) => {
                    if (!prescricao.remedio || !prescricao.remedio.nome) {
                        // Faz a busca do remédio pelo id_remedio da prescrição
                        const remedioResponse = await axios.get(`http://localhost:3000/api/remedios/${prescricao.id_remedio}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        // Associa o objeto remedio à prescrição
                        prescricao.remedio = remedioResponse.data;
                    }
                    return prescricao;
                }));

            } catch (error) {
                console.error('Erro ao buscar prescrições:', error);
            }
        },
        async fetchRemedios() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Usuário não autenticado');
                    return;
                }
                const response = await axios.get('http://localhost:3000/api/remedios', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.remedios = response.data;  // Preenche a lista de remédios
            } catch (error) {
                console.error('Erro ao buscar remédios:', error);
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

                // Converter campos numéricos
                this.novaPrescricao.id_remedio = Number(this.novaPrescricao.id_remedio);
                this.novaPrescricao.frequencia = Number(this.novaPrescricao.frequencia);

                // Ajuste das datas para evitar problemas de fuso horário
                const dtInicio = new Date(this.novaPrescricao.dt_inicio);
                const dtFim = new Date(this.novaPrescricao.dt_fim);

                // Definir a data manualmente em UTC para evitar alterações indesejadas
                this.novaPrescricao.dt_inicio = new Date(Date.UTC(dtInicio.getFullYear(), dtInicio.getMonth(), dtInicio.getDate())).toISOString();
                this.novaPrescricao.dt_fim = new Date(Date.UTC(dtFim.getFullYear(), dtFim.getMonth(), dtFim.getDate())).toISOString();

                // Criar prescrição
                const responsePrescricao = await axios.post('http://localhost:3000/api/prescricoes', this.novaPrescricao, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (responsePrescricao.status === 201) {
                    const novaPrescricao = responsePrescricao.data;
                    const historicoData = {
                        id_prescricao: novaPrescricao.id,
                        dt_atual: new Date().toISOString(),
                        status: 1
                    };

                    const responseHistorico = await axios.post('http://localhost:3000/api/historico', historicoData, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (responseHistorico.status === 201) {
                        console.log('Histórico criado com sucesso');
                    } else {
                        console.error('Erro ao criar histórico:', responseHistorico);
                    }

                    this.fetchPrescricoes();
                    this.resetForm();
                } else {
                    console.error('Erro na resposta ao criar prescrição:', responsePrescricao);
                }
            } catch (error) {
                console.error('Erro ao criar prescrição e histórico:', error);
            }
        }
        ,
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
        this.fetchRemedios();
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

select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
    background-color: #f9f9f9;
    transition: border-color 0.3s, background-color 0.3s;
    cursor: pointer;
}

select:focus {
    border-color: #007f4d;
    background-color: #f1f1f1;
}

option {
    padding: 10px;
    font-size: 1rem;
}
</style>
