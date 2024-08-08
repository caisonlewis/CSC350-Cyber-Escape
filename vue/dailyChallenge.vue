<!-- Vue Logic Section -->
/* eslint-disable */
<script setup>
// Import the reactive function from Vue
import { ref, onMounted } from 'vue'

// Initialize the fetchQuestion function on component mount

// Define reactive variables for question details and error messages
let questionText;
let questionType;
var correctanswer;
// Either our server or the file doesn't enjoy reactive variables that much. Good luck.
const questionError = ref('')
const fetchTFAnswer = (answerid) => {
    const questionid = 2;
    getTFDatabase(answerid, questionid).then(updateTFAnswer)
        .catch(handleError);
};

const getTFDatabase = (answerid, questionid) => {
    return fetch('http://localhost:3000/TrueFalseAnswers/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answerid, questionid }) // Pass both answerid and questionid
    }).then(response => response.json());
};

const updateTFAnswer = (data) => {
    const questionCorrect = data.TrueFalseAnswer.is_correct;

    if (questionCorrect === 1) {
        correctanswer = data.TrueFalseAnswer.answer_id;
    }
};
const fetchanswer = (answerid) => {
    const questionid = 1
    getdatabaseanswers(answerid, questionid)// This function only calls Multiple Choice Answers.
        .then(updateanswerVariables)
        .catch(handleError)
}
/**
 * Depending on if your question is mutliple choice or true/false, another function will need to be made.
 * Change the url to TrueFalseAnswers/answer, but everything else should be the same.
 * @param {integer} answerid
 * @param {integer} questionid
 */
const getdatabaseanswers = (answerid, questionid) => {
    return fetch('http://localhost:3000/MultipleChoiceAnswers/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answerid, questionid }) // Pass both answerid and questionid
    }).then(response => response.json())
}
/**
 * Updates the button variables.
 * @param {*} data
 */
const updateanswerVariables = (data) => {
    const answertext = data.MultipleChoiceAnswer.answer_text
    const questionIndex = data.MultipleChoiceAnswer.answer_id
    const questionCorrect = data.MultipleChoiceAnswer.is_correct
    if (questionCorrect === 1) {
        correctanswer = data.MultipleChoiceAnswer.answer_id;
    }
    const toChange = 'choice' + questionIndex
    // get question text to choice 1
    document.getElementById(toChange).innerText = answertext
}

/**
 * Handles errors that occur during the fetch operation.
 * @param {Error} error - The error object.
 */
const handleError = (error) => {
    console.error('Error:', error)
    alert('An error occurred. Please try again.')
}

/**
 * Placeholder function for handling answer submission.
 */
function submitAnswer(choice) {
    if (choice === correctanswer) {
        alert("Correct! Congratulations!")
        window.location.href = "../html/index.html";
    } else {
        alert("Incorrect! Try again!");
    }
}
/**
 * Toggles the display of question blocks based on the question type.
 */
const toggleQuestionBlocks = () => {
    const multipleChoiceBlock = document.getElementById('multiple_choice')
    const trueFalseBlock = document.getElementById('trueFalse')
    const errorsBlock = document.getElementById('errors')

    // Hide all blocks initially
    multipleChoiceBlock.style.display = 'none'
    trueFalseBlock.style.display = 'none'
    errorsBlock.style.display = 'none'

    // Show the appropriate block based on the question type
    if (questionType === 'multiple_choice') {
        for (let index = 1; index < 5; index++) {
            fetchanswer(index)
        }
        multipleChoiceBlock.style.display = 'block'
    } else if (questionType === 'trueFalse') {
        fetchTFAnswer(1)
        fetchTFAnswer(2)
        trueFalseBlock.style.display = 'block'
    } else {
        errorsBlock.style.display = 'block'
    }
}
/**
 * Updates the reactive variables based on the fetched data.
 * @param {Object} data - The fetched question data.
 */
const updateVariables = (data) => {
    questionText = data.question.question_text
    questionType = data.question.question_type

    // Show/hide question blocks based on the question type
    toggleQuestionBlocks()

    // Update the displayed question text
    document.getElementById('question_text').innerText = questionText
}

/**
 * Fetches user settings from the server.
 * @param {number} id - ID of the question to fetch.
 * @returns {Promise<Object>} - Promise representing the fetched question data.
 */
const fetchUserSettings = (id) => {
    return fetch('http://localhost:3000/questions/gamequestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }).then(response => response.json())
}

/**
 * Fetches the question data from the server based on the provided ID.
 */
const fetchQuestion = () => {
    const id = 1// ID used for fetching the question

    if (id) {
        fetchUserSettings(id)
            .then(updateVariables)
            .catch(handleError)
    }
}

onMounted(fetchQuestion)

</script>

<!-- Template Section -->
<template>
    <div id="app" class="container">
        <div class="content">
            <h1>Daily Challenge</h1>
            <p class="daily-challenge">Select the correct answer.</p>

            <!-- Display the question from the database -->
            <p id="question_text"></p>

            <!-- Display choice buttons based on the question type -->
            <div id="trueFalse">
                <button @click="submitAnswer(1)">True</button>
                <button @click="submitAnswer(2)">False</button>
            </div>
            <div id="multiple_choice">
                <button id="choice1" @click="submitAnswer(1)"></button>
                <button id="choice2" @click="submitAnswer(2)"></button><br>
                <button id="choice3" @click="submitAnswer(3)"></button>
                <button id="choice4" @click="submitAnswer(4)"></button>
            </div>
            <div id="errors">
                <!-- Display a message if the question type is not recognized -->
                <p>Question type not recognized.</p>
            </div>

            <!-- Submit button -->
            <button @click="questionText = 'hello'">Submit</button>

            <!-- Display error message if there's an error -->
            <p v-if="questionError" class="error">{{ questionError }}</p>
        </div>
    </div>
</template>
