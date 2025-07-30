<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 100vh; background-color: #ffe4ea;"
  >
    <v-card
      class="pa-6"
      width="400"
      style="
        border: 4px solid black;
        box-shadow: 8px 8px 0px black;
        background-color: white;
      "
    >
      <h2 class="text-h5 mb-4 text-center font-weight-bold" style="color: #e91e63;">
        🔐 Login ke E-Money Tracker
      </h2>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="username"
          label="Username"
          outlined
          color="pink"
          class="mb-3"
          style="border: 2px solid black;"
          required
        />

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          color="pink"
          class="mb-3"
          style="border: 2px solid black;"
          required
        />

        <v-btn
          type="submit"
          color="pink"
          block
          :loading="loading"
          style="border: 2px solid black; font-weight: bold;"
        >
          Login
        </v-btn>

        <v-alert
          v-if="error"
          type="error"
          class="mt-4"
          style="border: 2px solid black; background-color: #ffcdd2; color: black;"
        >
          {{ error }}
        </v-alert>
      </v-form>
    </v-card>
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
