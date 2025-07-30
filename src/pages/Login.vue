<template>
  <v-container>
    <v-form @submit.prevent="handleLogin">
      <v-text-field v-model="token" label="Token" outlined required />
      <v-btn type="submit" color="primary" block>Login</v-btn>
      <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const token = ref('')
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  try {
    const res = await fetch('https://e-moneytracker-lmal8wu22-arif-vigos-projects.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token.value })
    })

    if (!res.ok) throw new Error('Token salah')

    localStorage.setItem('token', token.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>
