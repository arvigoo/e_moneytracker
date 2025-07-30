<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" max-width="400">
      <v-card-title class="text-h5 font-weight-bold">Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          prepend-icon="mdi-email"
          variant="outlined"
        />
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          prepend-icon="mdi-lock"
          variant="outlined"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = () => {
  if (!email.value || !password.value) {
    alert('Email dan password harus diisi.')
    return
  }

  // Simulasi login: simpan token dummy
  const dummyToken = 'token-simulated-123'
  localStorage.setItem('token', dummyToken)

  // Redirect ke dashboard
  router.push('/dashboard')
}
</script>

<style scoped>
.v-card {
  border: 3px solid #ff69b4;
  border-radius: 20px;
  box-shadow: 8px 8px 0 #ff1493;
  background-color: #fff0f5;
}

.v-btn {
  font-weight: bold;
  text-transform: none;
  box-shadow: 4px 4px 0 #ff1493;
}
</style>
