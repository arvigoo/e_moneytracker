<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">📊 Transaksi</h2>

    <v-data-table
      :headers="headers"
      :items="transactions"
      :loading="loading"
      item-value="UUID"
      show-expand
      class="elevation-4"
    >
      <template #top>
        <v-toolbar flat color="pink">
          <v-toolbar-title class="font-weight-bold text-black">Daftar Transaksi</v-toolbar-title>
          <v-spacer />
          <v-progress-circular v-if="loading" indeterminate color="primary" />
        </v-toolbar>
      </template>

      <!-- Format Jumlah -->
      <template #item.JUMLAH="{ item }">
        <span class="font-weight-bold text-blue-darken-3">
          Rp{{ Number(item.JUMLAH || 0).toLocaleString('id-ID') }}
        </span>
      </template>

      <!-- Expandable content -->
      <template #expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <v-card flat class="pa-4 bg-grey-lighten-4">
              <p><strong>Jenis:</strong> {{ item.JENIS }}</p>
              <p><strong>Pemasukan:</strong> Rp{{ Number(item.PEMASUKAN || 0).toLocaleString('id-ID') }}</p>
              <p><strong>Pengeluaran:</strong> Rp{{ Number(item.PENGELUARAN || 0).toLocaleString('id-ID') }}</p>
              <p><strong>Catatan:</strong> {{ item.CATATAN }}</p>
              <p><strong>Sumber Dana:</strong> {{ item['Sumber Dana'] }}</p>
              <p><strong>User:</strong> {{ item.USER }}</p>
              <p><strong>Created At:</strong> {{ item.CREATED_AT }}</p>
              <p><strong>Updated At:</strong> {{ item.UPDATED_AT }}</p>
            </v-card>
          </td>
        </tr>
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
  { text: 'Tanggal', value: 'TANGGAL' },
  { text: 'Kategori', value: 'KATEGORI' },
  { text: 'Jumlah', value: 'JUMLAH' },
  { text: '', value: 'data-table-expand' } // untuk tombol expand
]

const fetchData = async () => {
  const token = localStorage.getItem('token')

  try {
    const res = await fetch('https://e-moneytracker.vercel.app/api/sheets', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) throw new Error('Gagal memuat data')

    const json = await res.json()
    transactions.value = json.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>
