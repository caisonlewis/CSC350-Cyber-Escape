<template>
  <form name="signup-form" @submit.prevent="signup">
    <div class="container">
      <label for="sign" style="font-size: 25px;">Welcome to the sign up page!<br><br></label>
    </div>
    <div class="mb-3">
      <label for="email"><br>Email: <br></label>
      <input id="email" type="text" v-model="email" />
      <span v-if="emailError" class="error">{{ emailError }}</span>
      <span v-if="emailExistsError" class="error">{{ emailExistsError }}</span>
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
    <div class="mb-3">
      <label for="password_requirements" style="font-size: 11px;" class="indented-label">Password
        Requirements: <br></label>
      <label for="password_requirements" style="font-size: 10px;" class="indented-label">- 12
        Character Minimum<br></label>
      <label for="password_requirements" style="font-size: 10px;" class="indented-label">- 1
        number<br></label>
      <label for="password_requirements" style="font-size: 10px;" class="indented-label">- 1
        unique symbol (ex: $, &, @, #)<br></label>
      <label for="password_requirements" style="font-size: 10px;" class="indented-label">- 1
        uppercase letter<br><br><br></label>
    </div>
    <button class="btn btn-outline-dark" type="submit">Sign Up!</button>
  </form>
</template>

<script>
/* eslint-disable */
export default {
  name: 'SignupView',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
      emailExistsError: '', // Error message for existing email
    };
  },
  methods: {
    signup() {
      // Reset errors
      this.emailError = '';
      this.usernameError = '';
      this.passwordError = '';
      this.emailExistsError = ''; // Reset existing email error

      // Validate fields
      if (!this.email.trim()) {
        this.emailError = 'Email is required.';
      }
      if (!this.username.trim()) {
        this.usernameError = 'Username is required.';
      }
      if (!this.password.trim()) {
        this.passwordError = 'Password is required.';
      }

      // Check if email already exists (simulate asynchronous operation)
      if (this.email === 'existing@example.com') {
        this.emailExistsError = 'Email already exists.';
      }

      // Submit if no errors
      if (!this.emailError && !this.usernameError && !this.passwordError && !this.emailExistsError) {
        // Perform signup operation (e.g., send data to server)
        console.log('Signing up with:', this.email, this.username, this.password);
        // Reset fields after submission
        this.email = '';
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
    height: 10vh; /* Optional: Set the height of the container to fill the viewport */
  }
  .error {
    color: red;
  }
</style>
