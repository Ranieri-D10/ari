<template>
    <div>
        <h2>Histórico de Prescrições</h2>
        <button @click="novoHistorico">Novo Registro de Histórico</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Prescrição ID</th>
                    <th>Data Atual</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="historico in historicos" :key="historico.id">
                    <td>{{ historico.id }}</td>
                    <td>{{ historico.id_prescricao }}</td>
                    <td>{{ historico.dt_atual }}</td>
                    <td>{{ historico.status }}</td>
                    <td>
                        <button @click="editarHistorico(historico.id)">Editar</button>
                        <button @click="deletarHistorico(historico.id)">Deletar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            historicos: [], // Armazena os registros de histórico
        };
    },
    methods: {
        novoHistorico() {
            // Abrir modal ou formulário para criar um novo registro de histórico
        },
        editarHistorico(id) {
            // Função para editar um registro de histórico
        },
        deletarHistorico(id) {
            // Função para deletar um registro de histórico
        },
        fetchHistoricos() {
            // Requisição para carregar os registros de histórico do backend
        },
    },
    mounted() {
        this.fetchHistoricos(); // Carrega os dados ao montar o componente
    },
};
</script>