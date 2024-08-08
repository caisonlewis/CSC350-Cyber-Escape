// Import necessary modules
/* eslint-disable */
import express from 'express'; // needed for webserver
import cors from 'cors'; // for handling cross-origin requests
import * as db from './database.mjs'; // for database functions

// Set up the Express webserver
const app = express();

// Used to parse JSON requests
app.use(express.json());

// Configure CORS to allow requests from the specified origin
app.use(cors());
const options = {
    origin: ['http://localhost:5173'] // Allow requests from localhost:5173
};
app.use(cors(options));

// Create the database tables if they don't exist already
db.createTables();

// Handler for POST requests to create a new user account
app.post('/user/create', (req, res) => {
    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    try {
        // Call the addUser function from the database module to add a new user
        db.addUser(username, email, password);
        // Send a success response if the user account was created successfully
        res.status(200).json({ message: 'Account created successfully' });
    } catch (error) {
        // If an error occurs during user creation, send a 500 error response
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Error creating account. Please try again.' });
    }
});

// Handler for POST requests to handle user login
app.post('/user/login', (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    try {
        // Retrieve user information from the database based on the username
        const user = db.getUserByUsername(username);
        // If no user is found with the provided username, send a 404 error response
        if (!user) {
            res.status(404).json({ message: 'User not found', success: false });
            return;
        }

        // If the provided password does not match the stored password, send a 401 error response
        if (user.password !== password) {
            res.status(401).json({ message: 'Incorrect password', success: false });
            return;
        }

        // If login is successful, send a success response
        res.status(200).json({ message: 'Login successful', success: true });
    } catch (error) {
        // If an error occurs during login, send a 500 error response
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in. Please try again.', success: false });
    }
});

app.post('/user/settings', (req, res) => {
    // Extract username and password from the request body
    const { username } = req.body;
    try {
        // Retrieve user information from the database based on the username
        const user = db.getUserByUsername(username);
        // If no user is found with the provided username, send a 404 error response
        if (!user) {
            res.status(404).json({ message: 'User not found', success: false });
            return;
        }
        // If login is successful, send a success response
        res.status(200).json({ user: user, success: true });
    } catch (error) {
        // If an error occurs during login, send a 500 error response
        console.error('Error getting settings:', error);
        res.status(500).json({ message: 'Error. Please try again.', success: false });
    }
});
app.post('/user/update', (req, res) => {
    // Extract username and password from the request body
    const { toChange, username, email } = req.body;
    try {
        // Retrieve user information from the database based on the username
        if (toChange === "email") {
            db.setEmailByUsername(email, username)
        } else if (toChange === "username") {
            db.setUsernameByEmail(email, username)
        } else {
            db.setPasswordByEmail(email, username)
        }
        // If no user is found with the provided username, send a 404 error response
        // If login is successful, send a success response
        res.status(200).json({ success: true });
    } catch (error) {
        // If an error occurs during login, send a 500 error response
        console.error('Error getting settings:', error);
        res.status(500).json({ message: 'Error. Please try again.', success: false });
    }
});

// Route for getting user's game info
app.post('/user/gamedata', (req, res) => {
    const { username } = req.body;

    try {
        // Call DB functions to get relevant data
        const points = db.getPointsByUsername(username);
        const hints = db.getHintsByUsername(username);
        const highestlvl = db.getLvlByUsername(username);

        res.status(200).json({ points: points, hints: hints, highestlvl: highestlvl, success: true });
    } catch (error) {
        console.error('Error retrieving game data: ', error);
        // Failing to connect to the DB returns default values
        res.status(500).json({ message: 'Error retrieving game data. Please try again.', points: 0, hints: 0, highestlvl: 1, success: false });
    }
});

//route for getting level data 
app.post('/questions/gamequestions', (req, res) => {
    const { id } = req.body;

    try {
        // Call DB functions to get relevant data
        const questions = db.getQuestion(id);

        res.status(200).json({ question: questions, success: true});
    } catch (error) {
        console.error('Error retrieving question data: ', error);
        // Failing to connect to the DB returns default values
        res.status(500).json({ message: 'Error retrieving question data. Please try again.', questionText: "Error", questionType: "Error", success: false });
    }
});

// Not sure why this duplicate function was here
// // Route for getting user's game info
// app.post('/user/updatepoints', (req, res) => {
//     const { points, username } = req.body;

//     try {
//         // Call DB functions to get relevant data
//         db.setPointsByUsername(points, username);

//         console.log('new points: %d', points);

//         res.status(200).json({ points: points, success: true });
//     } catch (error) {
//         console.error('Error retrieving game data: ', error);
//         // Failing to connect to the DB returns default values
//         res.status(500).json({ message: 'Error retrieving game data. Please try again.', points: points, success: false });
//     }
// });

// Route for updating user's points
app.post('/user/updatepoints', (req, res) => {
    const { points, username } = req.body;

    try {
        // Call the setPointsByUsername function from the database module to update user's points
        db.setPointsByUsername(points, username);

        // Send a success response if the points were updated successfully
        res.status(200).json({ message: 'Points updated successfully', success: true });
    } catch (error) {
        // If an error occurs during points update, send a 500 error response
        console.error('Error updating points:', error);
        res.status(500).json({ message: 'Error updating points. Please try again.', success: false });
    }
});

// Route for updating user's level
app.post('/user/updatelevel', (req, res) => {
    const { highestlvl, username } = req.body;

    try {
        // Call the setPointsByUsername function from the database module to update user's points
        db.setLevelByUsername(highestlvl, username);

        // Send a success response if the points were updated successfully
        res.status(200).json({ message: 'Points updated successfully', success: true });
    } catch (error) {
        // If an error occurs during points update, send a 500 error response
        console.error('Error updating points:', error);
        res.status(500).json({ message: 'Error updating points. Please try again.', success: false });
    }
});

// Route for fetching leaderboard data
app.get('/leaderboard', (req, res) => {
    try {
        const leaderboardData = db.getLeaderboard(); // Implement this function in database.mjs
        res.status(200).json(leaderboardData);
    } catch (error) {
        console.error('Error fetching leaderboard data: ', error);
        res.status(500).json({ message: 'Error fetching leaderboard data. Please try again.', success: false });
    }
});
/**
 * Change MultipleChoiceAnswers to TrueFalseAnswers, getMultipleChoiceAnswer to whatever you chose.
 */
app.post('/MultipleChoiceAnswers/answer', (req, res) => {
    const { answerid, questionid } = req.body;

    try {
        // Call DB functions to get relevant data
        const answers = db.getMultipleChoiceAnswer(answerid, questionid);

        res.status(200).json({ MultipleChoiceAnswer: answers, success: true });
    } catch (error) {
        console.error('Error retrieving answer data: ', error);
        // Failing to connect to the DB returns default values
        res.status(500).json({ message: 'Error retrieving answer data. Please try again.', questionText: "Error", questionType: "Error", success: false });
    }
});

app.post('/TrueFalseAnswers/answer', (req, res) => {
    const { answerid, questionid } = req.body;

    try {
        // Call DB functions to get relevant data
        const answers = db.getTrueFalseAnswer(answerid, questionid);

        res.status(200).json({ TrueFalseAnswer: answers, success: true });
    } catch (error) {
        console.error('Error retrieving answer data: ', error);
        // Failing to connect to the DB returns default values
        res.status(500).json({ message: 'Error retrieving answer data. Please try again.', questionText: "Error", questionType: "Error", success: false });
    }
});
// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000; // Use environment port or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
