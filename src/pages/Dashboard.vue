<template>
  <v-container>
    <v-btn color="black" @click="logout">Logout</v-btn>
    <v-btn color="black" to="/transactions">Lihat Transaksi</v-btn>

  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
