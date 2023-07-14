<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import axios from '@axios'
import { usePDF } from 'vue3-pdfmake'
import JsonCSV from 'vue-json-csv'
import JsonExcel from 'vue-json-excel3'
import Datetime from '@/libs/Datetime'

const pdfmake = usePDF({
  autoInstallVFS: true,
})

interface ParamsPesquisa {
  start: string
  end: string
  queue: string
  agent_number: string
}
type Pesquisa = (params: ParamsPesquisa) => any
const dt = new Datetime()

const header = ref([
  { title: 'Agentes', align: 'start', sortable: false, key: 'agent_number' },
  { title: 'Agentes Name', key: 'agent_name' },
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
  start: '', end: '', queue: '', agent_number: '',
})

const panel = ref(['pesquisa'])
const open = ref(true)
const search = ref(true)

const desserts = ref([])

const pesquisa: Pesquisa = async (params: ParamsPesquisa) => {
  axios.defaults.headers.common.ApiKey = localStorage.getItem('apikey')
  let qs: string = params.start !== '' ? `?start=${params.start}` : '?'
  qs += params.end !== '' ? `&end=${params.end}` : ''
  qs += params.queue !== '' ? `&queue=${params.queue}` : ''
  qs += params.agent_number !== '' ? `&agent+number=${params.agent_number}` : ''
  axios.get(`/agents_reports${qs}`, {
    headers: {
      'ApiKey': localStorage.getItem('apikey'),
      'Content-Type': 'application/json',

    },
  }).then(response => {
    desserts.value = response.data
    search.value = false
    panel.value = []
    open.value = false
  }).catch(error => { console.log(error) })
}

const onGenPDF = (params: string[]) => {
  const dados = []

  const headers = [
    { text: 'Agentes', style: 'tableHeader' },
    { text: 'Agentes Name', style: 'tableHeader' },
    { text: 'Data Login', style: 'tableHeader' },
    { text: 'Tempo total logado', style: 'tableHeader' },
    { text: 'Tempo contratado', style: 'tableHeader' },
    { text: 'Hora Extra', style: 'tableHeader' },
    { text: 'Máximo Hora Extra', style: 'tableHeader' },
    { text: 'Hora Extra válida', style: 'tableHeader' },
    { text: 'Tempo logado válido', style: 'tableHeader' },
    { text: 'Chamadas', style: 'tableHeader' },
  ]

  for (let index = 0; index < params.length; index++) {
    if (index === 0) {
      // coloca cabecalho
      dados.push(headers)
    }

    const linha = params[index]

    const d = [
      { text: linha.agent_number },
      { text: linha.agent_name },
      { text: dt.toFormatSlash(linha.date_login) },
      { text: linha.time_all_login },
      { text: linha.time_hired },
      { text: linha.extra_hour },
      { text: linha.maximum_overtime },
      { text: linha.valid_overtime },
      { text: linha.valid_login_time },
      { text: linha.calls },
    ]

    dados.push(d)
  }

  // desserts.value.forEach(async (param: string) => {
  //   console.log('dados em percusor', param)

  //   const d = await Object.values(param)

  //   dados.push(d)
  // })

  console.log('dados ', dados)

  const ContentPdf = {
    content: [{
      style: 'tableExample',
      table: {
        headerRows: 1,
        body: dados,
      },
      layout: 'lightHorizontalLines',
      fontSize: 8,
      margin: [0, 1, 0, 1],
    }],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 8,
        bold: true,
        margin: [0, 1, 0, 5],
      },
      tableExample: {
        margin: [0, 1, 0, 0],
      },
      tableHeader: {
        bold: true,
        fontSize: 8,
        color: 'black',
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
    footer(currentPage, pageCount: any) {
      return {
        columns: [
          `Vonix - Gerado em ${dt.now()}`,
          { text: `${currentPage.toString()} de ${pageCount}`, alignment: 'right' },
        ],
        margin: [3, 28, 3, 3],
        fontSize: 8,

      }
    },
    header() {
      // you can apply any logic and return any valid pdfmake element
      return [{
        columns: [
          {
            text: 'Resultado Tempo Total Falado (Agente)',
            decoration: 'underline',
          },
          {
            image: 'data:image/png;base64,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',
            width: 16,
          },
        ],
        margin: [3, 2, 3, 3],
        fontSize: 16,
        style: 'header',
      }]
    },
    pageSize: 'A4',
    pageOrientation: 'landscape',
    margin: [3, 3, 3, 3],
  }

  pdfmake.createPdf(ContentPdf).download('relatorioFaturamento.pdf')
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
            <VExpansionPanel value="pesquisa">
              <VExpansionPanelTitle>
                <VRow
                  v-if="open"
                  no-gutters
                >
                  <VCol
                    cols="12"
                    class="d-flex justify-start"
                  >
                    <span>Pesquise primeiro por data!</span>
                  </VCol>
                </VRow>
                <VRow
                  v-else
                  no-gutters
                >
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
                      <span v-if="open">Pesquise primeiro por data?</span>
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
                  <VCol cols="6">
                    <VTextField
                      v-model="trip.start"
                      label="Data Inicio"
                      type="date"
                    />
                  </VCol>

                  <VCol cols="6">
                    <VTextField
                      v-model="trip.end"
                      label="Data Fim"
                      type="date"
                    />
                  </VCol>
                  <!--
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
                  -->
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
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="6">
              <span>Relatório de Faturamento</span>
            </VCol>
            <VCol
              cols="6"
              class="text--secondary"
            >
              <div
                v-if="!search"
                class="d-flex flex-row-reverse"
              >
                <VBtn
                  size="small"
                  variant="outlined"
                  class="ml-2"
                  @click="onGenPDF(desserts)"
                >
                  <VIcon icon="mdi-file-pdf" />
                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    PDF
                  </VTooltip>
                </VBtn>
                <JsonExcel
                  :data="desserts"
                  worksheet="relatorioFaturamento"
                  name="RelrioFaturamentoato.xls"
                  class="m-0"
                >
                  <VBtn
                    size="small"
                    variant="outlined"
                    class="ml-2"
                  >
                    <VIcon icon="mdi-microsoft-excel" />
                    <VTooltip
                      activator="parent"
                      location="top"
                    >
                      EXCEL
                    </VTooltip>
                  </VBtn>
                </JsonExcel>
                <JsonCSV
                  :data="desserts"
                  name="relatorioFaturamento.csv"
                  :fields="header"
                  :labels="header"
                  class="m-0"
                >
                  <VBtn
                    size="small"
                    variant="outlined"
                    class="ml-2"
                  >
                    <VIcon icon="mdi-file-delimited-outline" />
                    <VTooltip
                      activator="parent"
                      location="top"
                    >
                      CSV
                    </VTooltip>
                  </VBtn>
                </JsonCSV>
              </div>
            </VCol>
          </VRow>
        </VCardTitle>
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
          >
            <template #item.date_login="{ item }">
              <VChip>
                {{ dt.toFormatSlash(item.columns.date_login) }}
              </VChip>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
