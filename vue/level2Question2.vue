<template>
    <div id="campaign"> 
        <div class="secure-code-matching">
        <h1>Secure Code Matching</h1>
        <p>Match each insecure code snippet with its corresponding secure version.</p>
    
        <div v-for="(pair, index) in codePairs" :key="index" class="pair">
            <div class="snippet">
            <h3>Insecure Code</h3>
            <pre>{{ pair.insecure }}</pre>
            </div>
            <div class="snippet">
            <h3>Secure Code</h3>
            <pre>{{ pair.secure }}</pre>
            </div>
        </div>
    
        <button @click="checkAnswers">Check Answers</button>
        <p v-if="showResults">
            <span v-if="correctAnswers === codePairs.length">All correct! Well done!</span>
            <span v-else>Incorrect answers: {{ incorrectAnswers }}</span>
        </p>
        </div>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        codePairs: [
          { insecure: "$email = $_POST['email'];", secure: "$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);" },
          { insecure: "$password = $_POST['password'];", secure: "$password = password_hash($_POST['password'], PASSWORD_DEFAULT);" },
          // Add more pairs as needed
        ],
        userAnswers: Array.from({ length: this.codePairs.length }, () => ''),
        showResults: false,
        correctAnswers: 0,
        incorrectAnswers: ''
      };
    },
    methods: {
      checkAnswers() {
        this.correctAnswers = 0;
        this.incorrectAnswers = '';
        for (let i = 0; i < this.codePairs.length; i++) {
          if (this.userAnswers[i] === 'secure') {
            this.correctAnswers++;
          } else {
            this.incorrectAnswers += (i + 1) + ', ';
          }
        }
        this.showResults = true;
      }
    }
  };
  </script>
  
  <style scoped>
  .secure-code-matching {
    text-align: center;
  }
  
  .pair {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .snippet {
    flex: 1;
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>