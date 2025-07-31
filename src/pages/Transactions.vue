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
      :item-value="(_, i) => i"
      show-expand
    >
      <template #top>
        <v-toolbar flat color="pink">
          <v-toolbar-title class="font-weight-bold">Transaksi</v-toolbar-title>
        </v-toolbar>
      </template>

      <!-- Kolom Jumlah -->
      <template #item.jumlah="{ item }">
        <strong>Rp {{ parseAmount(item.jumlah) }}</strong>
      </template>

      <!-- Expand Row -->
      <template #expanded-row="{ item }">
        <td :colspan="headers.length">
          <v-card class="ma-2 pa-4" style="border: 2px solid black; background-color: #fff;">
            <p><strong>Pembayaran:</strong> {{ item.pembayaran }}</p>
            <p><strong>Jenis:</strong> {{ item.jenis }}</p>
            <p><strong>Pemasukan:</strong> Rp {{ parseAmount(item.pemasukan) }}</p>
            <p><strong>Pengeluaran:</strong> Rp {{ parseAmount(item.pengeluaran) }}</p>
            <p><strong>Catatan:</strong> {{ item.catatan }}</p>
            <p><strong>Sumber Dana:</strong> {{ item.sumber_dana }}</p>
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
  { title: '', key: 'data-table-expand' },
]

// Fungsi parsing angka dari string seperti Rp6.500.000
const parseAmount = (val) => {
  const cleaned = (val || '').toString().replace(/[^0-9,-]+/g, '').replace(',', '.')
  const num = parseFloat(cleaned)
  return isNaN(num) ? '0' : num.toLocaleString('id-ID')
}

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

    transactions.value = json.data.map(row => ({
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
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>
