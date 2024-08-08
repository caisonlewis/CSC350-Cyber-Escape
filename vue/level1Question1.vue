<template>
  <div class="suspicious-email-game">
    <!-- Arrow button to navigate back to the home page -->
    <button class="back-button" @click="goToHomePage">&#8592;</button>
    
    <img src="../assets/doordash_email_scam.jpg" alt="Suspicious Email Image" />
    <!-- Display the question -->
    <p>{{ question }}</p>

    <!-- Define clickable areas -->
    <div id="button1" class="clickable-area" @click="checkResponse('Top Left')">Top Left</div>
    <div id="button2" class="clickable-area" @click="checkResponse('Top Right')">Top Right</div>
    <div id="button3" class="clickable-area" @click="checkResponse('Bottom Left')">Bottom Left</div>
    <div id="button4" class="clickable-area" @click="checkResponse('Bottom Right')">Bottom Right</div>

    <!-- Display response to the user -->
    <p v-if="response">{{ response }}</p>
  
    <!-- Next button -->
    <button @click="goToNextPage" :disabled="response === null || !isAnswerCorrect">Next Game</button>
    
  </div>
</template>

<script>
/* eslint-disable */
import * as gmf from '../js/gamedata_functions.js'
const userName = localStorage.getItem('username')
gmf.getUserGameData(userName);
const currentLevel = localStorage.getItem('highestlvl');
let levelPoints = 1;
const totalPoints = localStorage.getItem('points');
export default {
  data() {
    return {
      questions: [
        {
          question: 'Which area of the email seems suspicious?',
          correctAnswer: 'Top Left',
          responseCorrect: 'Good job! You identified the suspicious area.',
          responseIncorrect: 'Incorrect! The suspicious area is not here. Look for phishing links or unusual sender.',
          nextHtml: 'level1Question2.html' // Define path for the next HTML file
        },
      ],
      currentQuestionIndex: 0,
      question: null,
      response: null, // Variable to hold the response message
      isAnswerCorrect: false // Variable to track if the user's answer is correct
    };
  },

  mounted() {
    this.loadQuestion();
  },

  methods: {
    loadQuestion() {
      this.question = this.questions[this.currentQuestionIndex].question;
      this.response = null;
      this.isAnswerCorrect = false; // Reset the flag when loading a new question
    },

    // Function to handle user clicks and check the response
    checkResponse(area) {
      // Implement your logic to determine if the user's action was correct
      // For example, you can check the clicked area and compare it to the correct answer
      if (area === 'Top Left') {
        // If this is the user's current level, give them points for clearing and add to their levels
        if (currentLevel === "1") {
          gmf.updateLevel("2", userName);
          localStorage.setItem('highestlvl', 2);
          
          levelPoints = 1 + parseInt(totalPoints);
          gmf.updatePoints(levelPoints, userName);
          localStorage.setItem('points', levelPoints);
        }
        this.response = 'Good job! You identified the suspicious area.';

      } else {
        // Handle invalid navigation (e.g., display an error message)
        console.log('Invalid navigation: Answer the question correctly first.');
      }
    },

    // Function to navigate back to the home page
    goToHomePage() {
      // Implement logic to navigate back to the home page
      console.log('Navigating back to the home page...');
    }
  }
};
</script>

<style scoped>
.suspicious-email-game {
  text-align: center;
}

.clickable-area {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid #000;
  cursor: pointer;
}

.clickable-area:hover {
  background-color: #f0f0f0;
}

.suspicious-email-game p {
  margin-top: 20px;
  font-weight: bold;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
}
</style>
