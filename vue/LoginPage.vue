<template>
  <form name="login-form" @submit.prevent="login">
    <div class="container">
      <label for="sign" style="font-size: 25px;">Welcome to the login page!<br><br></label>
    </div>
    <div class="mb-3">
      <label for="username"><br>Username: <br></label>
      <input id="username" type="text" v-model="username" />
      <span v-if="usernameError" class="error">{{ usernameError }}</span>
    </div>
    <div class="mb-3">
      <label for="password"><br>Password: <br></label>
      <input id="password" type="password" v-model="password" />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>
    </div>

    <button class="btn btn-outline-dark" type="submit">Login!</button>
  </form>
</template>

<script>
/* eslint-disable */
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    };
  },
  methods: {
    login() {
      // Reset errors
      this.usernameError = '';
      this.passwordError = '';

      // Validate fields
      if (!this.username.trim()) {
        this.usernameError = 'Username is required.';
      }
      if (!this.password.trim()) {
        this.passwordError = 'Password is required.';
      }

      // Submit if no errors
      if (!this.usernameError && !this.passwordError) {
        // Perform login operation (e.g., send data to server)
        console.log('Logging in with:', this.username, this.password);
        // Reset fields after submission
        this.username = '';
        this.password = '';
      }
    },
  },
};
</script>

<style>
  .indented-label {
    margin-left: 20px;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh; 
  }
  .error {
    color: red;
  }
</style>
