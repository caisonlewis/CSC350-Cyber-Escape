<template>
    <div class="word-scramble-game">
      <h1>Cybersecurity Word Scramble</h1>
      <p>Unscramble the letters to reveal a cybersecurity-related word!</p>
      <div class="scrambled-word">
        <!-- Display scrambled word -->
        <div v-for="(letter, index) in scrambledWord" :key="index" class="letter" @dragstart="onDragStart($event, index)" draggable="true">{{ letter }}</div>
      </div>
      <div class="drop-zone" @dragover.prevent @drop="onDrop">{{ droppedLetters.join('') }}</div>
    
      <button @click="getHint">Hint</button>
      <button @click="submitWord">Submit</button>
      <button @click="undo">Undo</button>
      <button @click="reset">Reset</button>
      <button @click="shuffleLetters">Shuffle</button>
      <p v-if="hint">Hint: {{ hint }}</p>
      <!-- Modal for choosing the next action after the last word -->
      <div v-if="showNextActionModal" class="modal">
        <div class="modal-content">
          <p>Congratulations! You have answered all words correctly.</p>
          <p>What would you like to do next?</p>
          <button @click="goToHomeScreen">Go to Home Screen</button>
          <button @click="goToLevel2">Go to Level 2</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        words: ['firewall', 'encryption', 'password', 'virus', 'phishing'],
        hints: ['Network security barrier', 'Data protection method', 'Secret code', 'Malicious software', 'Fraudulent email'],
        currentWordIndex: 0,
        scrambledWord: '',
        originalWord: '',
        droppedLetters: [],
        hint: '',
        showNextActionModal: false, // Flag to control the visibility of the modal
        lastWordCorrect: false // Flag to indicate if the last word was answered correctly
      };
    },
    mounted() {
      this.nextWord();
    },
    methods: {
      // Generate a scrambled word
      scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5);
      },
      // Load the next word
      nextWord() {
        if (this.currentWordIndex >= this.words.length) {
          this.currentWordIndex = 0;
        }
        this.originalWord = this.words[this.currentWordIndex];
        this.scrambledWord = this.scrambleWord(this.originalWord);
        this.droppedLetters = [];
        this.hint = '';
        this.currentWordIndex++;
      },
      // Drag start event handler
      onDragStart(event, index) {
        event.dataTransfer.setData('text/plain', index);
      },
      // Drop event handler
      onDrop(event) {
        const index = event.dataTransfer.getData('text/plain');
        const letter = this.scrambledWord[index];
        this.droppedLetters.push(letter);
        this.scrambledWord.splice(index, 1);
      },
      // Get a hint for the current word
      getHint() {
        this.hint = this.hints[this.currentWordIndex - 1];
      },
      // Submit the word and check if it's correct
      submitWord() {
        const submittedWord = this.droppedLetters.join('');
        if (submittedWord === this.originalWord) {
          alert('Correct!');
          if (this.currentWordIndex === this.words.length) {
            this.lastWordCorrect = true;
            this.showNextActionModal = true;
          } else {
            this.nextWord();
          }
        } else {
          alert('Incorrect. Try again.');
        }
      },
      // Undo the last action
      undo() {
        if (this.droppedLetters.length > 0) {
          const lastLetter = this.droppedLetters.pop();
          this.scrambledWord.push(lastLetter);
        }
      },
      // Reset the game
      reset() {
        this.currentWordIndex = 0;
        this.nextWord();
      },
      // Shuffle the remaining letters
      shuffleLetters() {
        const remainingLetters = this.scrambledWord.concat(this.droppedLetters);
        const shuffledLetters = remainingLetters.sort(() => Math.random() - 0.5);
        this.scrambledWord = shuffledLetters.filter(letter => !this.droppedLetters.includes(letter));
      },
      // Go to the home screen
      goToHomeScreen() {
        // Redirect to the home screen HTML page
        window.location.href = 'campaign_basic.html';
      },
      // Go to level 2
      goToLevel2() {
        // Redirect to the level 2 HTML page
        window.location.href = 'level2Question1.html'; 
      }
    }
  };
  </script>
  
  <style scoped>
  .word-scramble-game {
    text-align: center;
    margin-top: 50px;
    width: 80%; /* Adjust width as needed */
    margin: 0 auto; /* Center the game horizontally */
  }
  
  .scrambled-word {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .letter {
    display: inline-block;
    padding: 20px; /* Increase padding for letters */
    font-size: 24px; /* Increase font size for letters */
    background-color: #f0f0f0;
    margin: 10px; /* Increase margin for letters */
    cursor: move;
  }
  
  .drop-zone {
    border: 4px dashed #000; /* Increase border thickness for drop zone */
    padding: 40px; /* Increase padding for drop zone */
    margin-bottom: 20px;
    font-size: 24px; /* Increase font size for dropped letters */
  }
  
  button {
    margin: 10px; /* Increase margin for buttons */
    font-size: 18px; /* Increase font size for buttons */
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  </style>
  