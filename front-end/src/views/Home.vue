<template>
    <v-container class="d-flex flex-column align-center justify-center fill-height pa-4">
        <!-- Header centralizado com estilo moderno -->
        <v-card elevation="3" class="mb-6 text-center" color="primary" dark>
            <v-card-title>
                <h1 class="text-h3 white--text">Bem-vindo à Agenda de Remédios</h1>
            </v-card-title>
        </v-card>

        <!-- Seções de CRUD em cards centralizados -->
        <v-row dense justify="center">
            <!-- Prescrições -->
            <v-col cols="12" md="6" lg="4">
                <v-card outlined elevation="2" class="mb-4">
                    <v-card-title class="text-h6 font-weight-bold">
                        Prescrições
                    </v-card-title>
                    <v-card-text>
                        Gerencie suas prescrições.
                        <PrescricaoCrud />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="success" dark block @click="newPrescription">
                            Nova Prescrição
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <!-- Remédios -->
            <v-col cols="12" md="6" lg="4">
                <v-card outlined elevation="2" class="mb-4">
                    <v-card-title class="text-h6 font-weight-bold">
                        Remédios
                    </v-card-title>
                    <v-card-text>
                        Gerencie seus remédios.
                        <RemedioCrud />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="info" dark block @click="newMedicine">
                            Novo Remédio
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <!-- Histórico de Prescrições -->
            <v-col cols="12" md="8">
                <v-card outlined elevation="2" class="mb-4">
                    <v-card-title class="text-h6 font-weight-bold">
                        Histórico de Prescrições
                    </v-card-title>
                    <v-card-text>
                        Acompanhe seu histórico.
                        <HistoricoCrud />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" dark block @click="newHistory">
                            Novo Registro de Histórico
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PrescricaoCrud from "@/views/PrescricaoCrud.vue";
import RemedioCrud from "@/views/RemedioCrud.vue";
import HistoricoCrud from "@/views/HistoricoCrud.vue";

export default {
    components: {
        PrescricaoCrud,
        RemedioCrud,
        HistoricoCrud,
    },
    methods: {
        newPrescription() {
            console.log("Nova Prescrição criada");
        },
        newMedicine() {
            console.log("Novo Remédio adicionado");
        },
        newHistory() {
            console.log("Novo Histórico registrado");
        },
    },
};
</script>

<style scoped>
/* Estilo moderno e centralizado */
.fill-height {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.v-card {
    border-radius: 16px;
}

.v-card-title {
    text-align: center;
    color: #424242;
}
</style>