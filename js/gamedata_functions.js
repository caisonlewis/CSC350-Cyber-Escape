/* eslint-disable */
/**
 * Stores a user's game info in local storage
 * @param {*} username (str)
 * @returns nothing, sets local variables to retrieved DB values
 */
function getUserGameData(username) {
    fetch('http://localhost:3000/user/gamedata', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('points', data.points.points)
                localStorage.setItem('hints', data.hints.hints)
                localStorage.setItem('highestlvl', data.highestlvl.highestlvl)
            }
        })
    return;
}

/**
 * Takes in a given question and sets the variables in local files
 * @param {*} questionId 
 * @returns None, output is stored in localStorage
 */
function getQuestionData(questionId) {
    fetch('http://localhost:3000/user/gamequestions', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ questionId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('questionText', data.questionText)
                localStorage.setItem('questionType', data.questionType)
            }
        })
    return;
}
/**
 * Changes a specified user's points to input value
 * @param {int} points 
 * @param {string} username 
 * Returns none function is used to change values in the DB
*/
function updatePoints(points, username) {
    fetch('http://localhost:3000/user/updatepoints', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        // parseInt is ensuring points is an int
        body: JSON.stringify({ points: parseInt(points), username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the local value to new point total
                localStorage.setItem('points', points)
            }
        })
        .catch(error => {
            console.error('Error occured trying to update points:', error);
            alert('An error occurred. Please try again.');
        });
}

/**
 * Changes a specified user's highestlvl to input value
 * @param {int} highestlvl 
 * @param {string} username 
 * Returns none function is used to change values in the DB
*/
function updateLevel(highestlvl, username) {
    fetch('http://localhost:3000/user/updatelevel', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ highestlvl: parseInt(highestlvl), username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the local value to new value
                localStorage.setItem('highestlvl', highestlvl)
            }
        })
        .catch(error => {
            console.error('Error occured trying to update progress:', error);
            alert('An error occurred. Please try again.');
        });
}


export { getUserGameData, updatePoints, getQuestionData, updateLevel }