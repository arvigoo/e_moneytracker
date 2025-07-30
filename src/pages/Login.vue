<template>
  <v-container>
    <v-form @submit.prevent="handleLogin">
      <v-text-field v-model="username" label="Username" outlined required />
      <v-text-field v-model="password" label="Password" type="password" outlined required />
      <v-btn type="submit" color="primary" block :loading="loading">Login</v-btn>
      <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  loading.value = true

  try {
    const res = await fetch('https://e-moneytracker.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    if (!res.ok) throw new Error('Username atau password salah')

    // Simpan username sebagai token sederhana (bisa diubah ke JWT kalau ada backend support)
    const userData = { username: username.value }
    localStorage.setItem('token', btoa(JSON.stringify(userData)))

    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
