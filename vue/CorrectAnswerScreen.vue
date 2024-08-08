<template>
    <div>
        <h2>Your correct, {{ username }}!</h2>
        <button @click="nextQuestion">Next Question</button>
    </div>
</template>

<script setup>

const username = localStorage.getItem('username')

function nextQuestion () {
  // Implement logic to fetch and display the next question
  // console.log('Next question clicked');
}
</script>
