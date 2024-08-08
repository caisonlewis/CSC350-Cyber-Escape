/* eslint-disable */
// //Daily Quiz Screen
// //Victoria Saunders 
// //processes the logic for the daily challenge screen 


// class Quiz {



//     MultipleChoiceQuestion(questions) {
//         this.questions = questions;
//     }

//     takeQuiz() {
//         //sets the score to 0, iterates through the questions to print them out, checks if the question is right
//         let score = 0;
//         for (let q of questions) {
//             console.log(q);
//             let response = prompt();
//             if (q.isCorrect(response)) {
//                 score++;
//             }
//         }

//         return score / questions.length;
//     }
// }

class MultipleChoiceQuestion {
    //handles MC and True false questions
    //takes text and prints it on the screen and then compares user response to see if it is correct
    constructor (questionText, answers, indexOfCorrectAnswer) {
        this.questionText = questionText;
        this.answers = answers;
        this.indexOfCorrectAnswer = indexOfCorrectAnswer;
    }

    toString() {
        let result = questionText;
        for(let i = 0; i < answers.length; i++) {
            result += "\n\t" + (i+1) + ") " + answers[i];
        }
        return result;
    }
}

class Answer{

    constructor(response){
        this.response = response;
    }



    answerFeedback(response){
        //checks if answer is right or wrong
        //either user got it correct or incorrect

        if (parseInt(response) == indexOfCorrectAnswer + 1){
            console.log("Congratulations! You got it right and have earned points!")
            return response
        }
        else {
            console.log("You are wrong.")
            return response
        }

    }


}

class User {
    //defines a user since this class does not have access to the user yet
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }

    toString() {
        return this.name + "(" + this.email + ")";
    }
}

export {MultipleChoiceQuestion, Answer, User}