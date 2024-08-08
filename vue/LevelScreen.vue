<template>
    <!-- Main container for the level screen -->
    <div>
        <!-- Save for Later button in the top left corner -->
        <button class="save-for-later" @click="saveForLater">Save for Later</button>

        <!-- Display username and point total in the top right corner -->
        <div class="user-info">
            <p>Username: {{ username }}</p>
            <p>Points: {{ displaypoints }}</p>
        </div>

        <!-- Display Question -->
        <h2>{{ questionData.question }}</h2>

        <!-- Display Answers -->
        <ul>
            <!-- Loop through each answer option -->
            <li v-for="(answer, index) in questionData.answers" :key="index">
                <!-- Radio button for selecting answer -->
                <input type="radio" :id="'answer'+index" :value="answer" v-model="selectedAnswer"
                :name="'answer'">
                <!-- Label for the answer option -->
                <label :for="'answer'+index">{{ answer }}</label>
            </li>
        </ul>

        <!-- Button to submit answer -->
        <button @click="checkAnswer">Submit Answer</button>

        <!-- Display answer message -->
        <p>{{ answerMessage }}</p>

        <!-- Correct answer screen (conditionally rendered) -->
        <CorrectAnswerScreen id="correct" v-if="correctAnswerSelected" />

        <!-- Cancel Quiz button -->
        <button @click="cancelQuiz">Cancel Quiz</button>
    </div>
</template>

<script setup>
/* eslint-disable */
    import { ref } from 'vue'

    //Functionality from this file needs to be eventually integrated into gamedata_functions.js then this import will be need to changed accordingly
    import * as gmf from '../js/point_tracking_example_functions.js'

    import CorrectAnswerScreen from './CorrectAnswerScreen.vue'

    // Define reactive variables
    const username = localStorage.getItem("username");
    let points = localStorage.getItem("points");
    const displaypoints = ref(points);

    let selectedAnswer = ref(null);
    let answerMessage = ref('');
    let correctAnswerSelected = ref(false);

    // Fetch question data from local storage
    const levelID = 1
    gmf.getQuestionData(levelID);
    const questionData = {
        question: localStorage.getItem('questionText'),
        answers: localStorage.getItem('questionAnswers').split(','),
        correctAnswer: localStorage.getItem('questionCorrectAnswer')
    };

    // Function to add points and update display
    async function addPoints() {
        const newpoints = parseInt(points) + 5;
        const response = await fetch('http://localhost:3000/user/updatepoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points: newpoints, username })
        });
        const data = await response.json();
        if (data.success) {
            points = newpoints.toString();
            displaypoints.value = points;
            localStorage.setItem("points", points);
        } else {
            console.error('Failed to update points:', data.message);
        }
    };

    // Function to check the selected answer
    function checkAnswer() {
        if (!selectedAnswer.value) {
            answerMessage.value = "Please select an answer.";
            return;
        }

        if (selectedAnswer.value === questionData.correctAnswer) {
            answerMessage.value = "Correct!";
            addPoints();
            correctAnswerSelected.value = true;
        } else {
            answerMessage.value = "Incorrect. Try again!";
        }
    }

    // Function to cancel the quiz and go back home
    function cancelQuiz() {
        // Set points to zero in local storage
        localStorage.setItem("points", "0");

        // Set points to zero in the database
        fetch('http://localhost:3000/user/updatepoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points: 0, username })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to home page
                    window.location.href = '../index.html';
                } else {
                    console.error('Failed to reset points:', data.message);
                }
            })
            .catch(error => {
                console.error('Error resetting points:', error);
            });
    }

    // Function to save quiz progress for later
    function saveForLater() {
        // Redirect to home page
        window.location.href = '../index.html';
    }
</script>

<style scoped>
    /* Styling for user info */
    .user-info {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    /* Styling for Save for Later button */
    .save-for-later {
        position: absolute;
        top: 10px;
        left: 10px;
    }
</style>
