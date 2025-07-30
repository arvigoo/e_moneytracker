<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h4 font-weight-bold">Halo, ini dashboard keuanganmu 💸</h1>
        <v-btn color="error" class="mt-4" @click="logout">Logout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
