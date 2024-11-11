<template>
    <div class="home">
        <!-- Header centralizado com estilo moderno -->
        <header class="header">
            <h1>Bem-vindo à Agenda de Remédios</h1>
            <p>Gerencie suas prescrições, remédios e agendamentos de forma fácil e rápida.</p>
        </header>

        <!-- Seções de CRUD em cards centralizados -->
        <section class="crud-sections">
            <!-- Prescrições -->
            <div class="card">
                <h2>Prescrições</h2>
                <p>Gerencie suas prescrições.</p>
                <PrescricaoCrud />
                <button class="action-button" @click="navigateTo('prescricoes')">Nova Prescrição</button>
            </div>

            <!-- Remédios -->
            <div class="card">
                <h2>Remédios</h2>
                <p>Gerencie seus remédios.</p>
                <RemedioCrud />
                <button class="action-button" @click="navigateTo('remedios')">Novo Remédio</button>
            </div>

            <!-- Histórico de Prescrições -->
            <div class="card">
                <h2>Histórico de Prescrições</h2>
                <p>Acompanhe seu histórico.</p>
                <HistoricoCrud />
                <button class="action-button" @click="navigateTo('historico')">Novo Registro de Histórico</button>
            </div>

            <!-- Agendamentos -->
            <div class="card">
                <h2>Agendamentos</h2>
                <p>Agende suas consultas e lembretes de medicação.</p>
                <button class="action-button" @click="navigateTo('agendamentos')">Novo Agendamento</button>
            </div>
        </section>
    </div>
</template>

<script>
import PrescricaoCrud from "@/views/crud/PrescricaoCrud.vue";
import RemedioCrud from "@/views/crud/RemedioCrud.vue";
import HistoricoCrud from "@/views/crud/HistoricoCrud.vue";

export default {
    components: {
        PrescricaoCrud,
        RemedioCrud,
        HistoricoCrud,
    },
    methods: {
        navigateTo(view) {
            this.$router.push(`/${view}`);
        },
    },
};
</script>

<style scoped>
.home {
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    color: #007f4d;
    margin-bottom: 2rem;
}

.crud-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.card {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.card h2 {
    color: #007f4d;
}

.card p {
    margin: 1rem 0;
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
</style>