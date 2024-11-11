<template>
    <div>
        <h2>Prescrições</h2>
        <button @click="novaPrescricao">Nova Prescrição</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuário</th>
                    <th>Remédio</th>
                    <th>Observação</th>
                    <th>Frequência</th>
                    <th>Data Início</th>
                    <th>Data Fim</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="prescricao in prescricoes" :key="prescricao.id">
                    <td>{{ prescricao.id }}</td>
                    <td>{{ prescricao.usuario.nome }}</td>
                    <td>{{ prescricao.remedio.nome }}</td>
                    <td>{{ prescricao.observacao }}</td>
                    <td>{{ prescricao.frequencia }}</td>
                    <td>{{ prescricao.dt_inicio }}</td>
                    <td>{{ prescricao.dt_fim }}</td>
                    <td>{{ prescricao.status ? 'Ativo' : 'Inativo' }}</td>
                    <td>
                        <button @click="editarPrescricao(prescricao.id)">Editar</button>
                        <button @click="deletarPrescricao(prescricao.id)">Deletar</button>
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
            prescricoes: [], // Carregar dados de Prescrição aqui
        };
    },
    methods: {
        novaPrescricao() {
            // Abrir modal para nova prescrição
        },
        editarPrescricao(id) {
            // Função de edição de prescrição
        },
        deletarPrescricao(id) {
            // Função de deleção de prescrição
        },
    },
    mounted() {
        this.fetchPrescricoes();
    },
    methods: {
        fetchPrescricoes() {
            // Carregar prescrições do servidor
        },
    },
};
</script>