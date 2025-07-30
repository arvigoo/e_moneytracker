

<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">Daftar Transaksi</h2>

    <v-data-table
      :headers="headers"
      :items="transactions"
      :loading="loading"
      class="elevation-4"
      style="border: 4px solid black; background: pink;"
      mobile-breakpoint="600"
    >
      <template #top>
        <v-toolbar flat color="pink">
          <v-toolbar-title class="font-weight-bold">Transaksi</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-alert v-if="error" type="error" class="mt-4">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const transactions = ref([])
const loading = ref(true)

const fetchData = async () => {
  const token = localStorage.getItem('token')

  const res = await fetch('https://e-moneytracker.vercel.app/api/sheets', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    console.error('Unauthorized or Error')
    return
  }

  const json = await res.json()
  transactions.value = json.data
  loading.value = false
}

onMounted(() => {
  fetchData()
})
</script>


<!-- 
<script setup>
import { onMounted, ref } from 'vue'
import { API_BASE_URL } from '@/utils/apiBase.js'


const loading = ref(true)
const transactions = ref([])
const error = ref(null)

const headers = [
  { text: 'Tanggal', value: 1 },
  { text: 'Kategori', value: 2 },
  { text: 'Jenis', value: 4 },
  { text: 'Pemasukan', value: 5 },
  { text: 'Pengeluaran', value: 6 },
  { text: 'Jumlah', value: 7 },
  { text: 'Catatan', value: 8 },
]

const fetchData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sheets`)
    const json = await res.json()
    transactions.value = (json.data || []).map(row => ({
      1: row[1],
      2: row[2],
      4: row[4],
      5: row[5],
      6: row[6],
      7: row[7],
      8: row[8],
    }))
  } catch (err) {
    error.value = 'Gagal mengambil data transaksi.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script> -->
