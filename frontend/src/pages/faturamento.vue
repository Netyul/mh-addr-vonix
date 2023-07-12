<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import axios from '@axios'

const header = ref([
  { title: 'Agentes', align: 'start', sortable: false, key: 'agent_number' },
  { title: 'Agentes Name', key: 'Agent_name' },
  { title: 'Data Login', key: 'date_login' },
  { title: 'Tempo total logado', key: 'time_all_login' },
  { title: 'Tempo contratado', key: 'time_hired' },
  { title: 'Hora Extra', key: 'extra_hour' },
  { title: 'Máximo Hora Extra', key: 'maximum_overtime' },
  { title: 'Hora Extra válida', key: 'valid_overtime' },
  { title: 'Tempo logado válido', key: 'valid_login_time' },
  { title: 'Chamadas', key: 'calls' },
])

const trip = ref({
  start: '', end: '',
})

const panel = ref(true)
const open = ref(false)
const search = ref(true)

const desserts = ref([])

const pesquisa = async (params: any) => {
  axios.get('/agents_reports', params).then(response => {
    desserts.value = response.data
    search.value = false
    panel.value = false
  }).catch(error => { console.log(error) })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Pesquisa">
        <VCardText>
          <VExpansionPanels
            v-model="panel"
            variant="inset"
            class="my-4"
          >
            <VExpansionPanel :value="panel">
              <VExpansionPanelTitle v-slot="{ open }">
                <VRow no-gutters>
                  <VCol
                    cols="4"
                    class="d-flex justify-start"
                  >
                    Fila: {{ trip.queue || 'Nenhuma fila selecionada' }}
                  </VCol>
                  <VCol
                    cols="8"
                    class="text--secondary"
                  >
                    <VFadeTransition leave-absolute>
                      <span v-if="open">When do you want to travel?</span>
                      <VRow
                        v-else
                        no-gutters
                        style="width: 100%"
                      >
                        <VCol
                          cols="6"
                          class="d-flex justify-start"
                        >
                          Data Inicio: {{ trip.start || 'Não Selecionado' }}
                        </VCol>
                        <VCol
                          cols="6"
                          class="d-flex justify-start"
                        >
                          Data Fim: {{ trip.end || 'Não Selecionado' }}
                        </VCol>
                      </VRow>
                    </VFadeTransition>
                  </VCol>
                </VRow>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VRow m-3>
                  <VCol cols="3">
                    <VTextField
                      v-model="trip.start"
                      label="Data Inicio"
                      type="date"
                    />
                  </VCol>

                  <VCol cols="3">
                    <VTextField
                      v-model="trip.end"
                      label="Data Fim"
                      type="date"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="trip.queue"
                      label="Fila"
                      type="text"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="trip.agent_number"
                      label="Agent Numero"
                      type="text"
                    />
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12">
                    <VBtn
                      label="Pesquisa"
                      color="primary"
                      prepend-icon="mdi-select-search"
                      @click="pesquisa(trip)"
                    >
                      Pesquisa
                    </VBtn>
                  </VCol>
                </VRow>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard title="Relatório de Faturamento">
        <VCardText>
          <div v-if="search">
            <span>Nada por aqui</span>
          </div>
          <VDataTable
            v-else
            :headers="header"
            :items="desserts"
            :sort-by="[{ key: 'calories', order: 'asc' }, { key: 'fat', order: 'desc' }]"
            multi-sort
            class="elevation-1"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
