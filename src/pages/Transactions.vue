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
      item-value="uuid"
      show-expand
    >
      <template #top>
        <v-toolbar flat color="pink">
          <v-toolbar-title class="font-weight-bold">Transaksi</v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.data-table-expand="{ expand, isExpanded }">
        <v-icon class="cursor-pointer" @click.stop="expand(!isExpanded)">
          {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </template>

      <!-- Row utama -->
      <template #item.jumlah="{ item }">
        <strong>Rp {{ Number(item.jumlah).toLocaleString('id-ID') }}</strong>
      </template>

      <!-- Row detail (expandable) -->
      <template #expanded-row="{ item }">
        <td :colspan="headers.length">
          <v-card class="ma-2 pa-4" style="border: 2px solid black; background-color: #fff;">
            <p><strong>Pembayaran:</strong> {{ item.pembayaran }}</p>
            <p><strong>Jenis:</strong> {{ item.jenis }}</p>
            <p><strong>Pemasukan:</strong> Rp {{ Number(item.pemasukan || 0).toLocaleString('id-ID') }}</p>
            <p><strong>Pengeluaran:</strong> Rp {{ Number(item.pengeluaran || 0).toLocaleString('id-ID') }}</p>
            <p><strong>Catatan:</strong> {{ item.catatan }}</p>
            <p><strong>Sumber Dana:</strong> {{ item['Sumber Dana'] }}</p>
            <p><strong>User:</strong> {{ item.user }}</p>
            <p><strong>UUID:</strong> {{ item.uuid }}</p>
            <p><strong>Dibuat:</strong> {{ item.created_at }}</p>
            <p><strong>Diupdate:</strong> {{ item.updated_at }}</p>
          </v-card>
        </td>
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
const error = ref(null)

const headers = [
  { title: 'Tanggal', key: 'tanggal' },
  { title: 'Kategori', key: 'kategori' },
  { title: 'Jumlah', key: 'jumlah' },
  { title: '', key: 'data-table-expand' }, // tombol expand
]

const fetchData = async () => {
  const token = localStorage.getItem('token')

  try {
    const res = await fetch('https://e-moneytracker.vercel.app/api/sheets', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) throw new Error('Gagal mengambil data transaksi')

    const json = await res.json()

    // Ubah array 2D jadi array of object
    const mapped = json.data.map(row => ({
      no: row[0],
      tanggal: row[1],
      kategori: row[2],
      pembayaran: row[3],
      jenis: row[4],
      pemasukan: row[5],
      pengeluaran: row[6],
      jumlah: row[7],
      catatan: row[8],
      sumber_dana: row[9],
      month: row[10],
      user: row[11] || '-',
      uuid: row[12] || '-',
      created_at: row[13] || '-',
      updated_at: row[14] || '-',
    }))

    transactions.value = mapped
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}


onMounted(fetchData)
</script>



<!-- 

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
 -->

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
