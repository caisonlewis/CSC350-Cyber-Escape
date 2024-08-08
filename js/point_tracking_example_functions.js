/* eslint-disable */
// Simulated user data
let userData = {
    username: 'exampleUser',
    points: 0
};

// example question just for working with point logic
const questionData = {
    1: {
        question: "Which of the following is a common method used in social engineering attacks?",
        answers: ["Phishing", "Firewall", "Encryption", "Antivirus"],
        correctAnswer: "Phishing"
    }
};

// Function to update points in the database
export function updatePoints(points, username) {
    try {
        // Simulate updating points in the database
        userData.points = points;

        // Return updated points
        return userData.points;
    } catch (error) {
        console.error('Error updating points:', error);
        throw error;
    }
}

// Function to fetch question data from the database
export function getQuestionData(levelID) {
    try {
        // Simulate fetching question data from the database
        const data = questionData[levelID];

        // Store question data in local storage
        localStorage.setItem('questionText', data.question);
        localStorage.setItem('questionAnswers', data.answers.join(','));
        localStorage.setItem('questionCorrectAnswer', data.correctAnswer);

        return data;
    } catch (error) {
        console.error('Error fetching question data:', error);
        throw error;
    }
}


