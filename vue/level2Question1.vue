<template>
    <div>
      <h1>Password Cracker</h1>
      <div v-if="!gameOver">
        <p v-if="!showHint">{{ currentInstruction }}</p>
        <p v-if="showHint">Hint: {{ hint }}</p>
        <input type="text" v-model="guess" :disabled="timeLeft <= 0" />
        <button @click="checkGuess" :disabled="timeLeft <= 0">Submit</button>
        <button @click="giveHint" :disabled="hintIndex === 3 || timeLeft <= 0">Hint</button>
        <p v-if="showResult">{{ result }}</p>
        <p v-if="timeLeft > 0">Time left: {{ timeLeft }} seconds</p>
        <p v-else>Time's up!</p>
        <button @click="nextQuestion" :disabled="!showResult || timeLeft > 0">Next Password</button>
      </div>
      <div v-else>
        <p>Game Over!</p>
        <p>Your final score: {{ score }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        passwords: ["password", "123456", "123456789", "qwerty", "abc123"],
        instructions: [
          "It's often used by people who want something easy to remember",
          "A common and straightforward numerical sequence.",
          "Guess a series of numbers that are consecutive.",
          "Guess a simple keyboard pattern.",
          "Guess a combination of letters followed by numbers."
        ],
        hints: [
          ["It starts with p", "It ends with d", "It has a length of 8 characters"],
          ["Start from 1 and keep going", "Has a length of 6 characters", "It's a very simple sequence"],
          ["Similar to the last question", "Has a length of 9 characters", "Start from 123 and keep going"],
          ["Try a pattern on the keyboard", "Starts with q", "Has a length of 6 characters"],
          ["Starts with a", "Has a length of 6 characters", "The first number in the sequence is 1"]
        ],
        currentPasswordIndex: 0,
        hintIndex: 0,
        guess: "",
        showHint: false,
        result: "",
        timeLeft: 30,
        gameOver: false,
        score: 0
      };
    },
    methods: {
      checkGuess() {
        if (this.guess.toLowerCase() === this.passwords[this.currentPasswordIndex]) {
          this.result = "Correct!";
          this.score++;
        } else {
          this.result = "Incorrect. Try again or ask for a hint.";
        }
      },
      nextQuestion() {
        this.currentPasswordIndex++;
        this.hintIndex = 0;
        this.guess = "";
        this.result = "";
        this.showHint = false;
        this.timeLeft = 30;
        if (this.currentPasswordIndex >= this.passwords.length) {
          this.gameOver = true;
        }
      },
      startTimer() {
        const timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            clearInterval(timer);
          }
        }, 1000);
      },
      giveHint() {
        if (this.hintIndex < 3) {
          this.showHint = true;
          this.hintIndex++;
        } else {
          this.result = "You've already used all hints!";
        }
      }
    },
    mounted() {
      this.startTimer();
    },
    computed: {
      hint() {
        return this.hints[this.currentPasswordIndex][this.hintIndex - 1];
      },
      currentInstruction() {
        return this.instructions[this.currentPasswordIndex];
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  