// This file loads the database from the disk and initializes it if necessary.
/* eslint-disable */
import Database from 'better-sqlite3';
// This next line will create a file to store the database in. This file should not be in Git.
const db = new Database('database.db', {verbose: console.log});

// Create tables. You may want to call this when the server starts.
export const createTables = () => {
    const users = `
    CREATE TABLE IF NOT EXISTS users (
        email      STRING  PRIMARY KEY,
        username   STRING  NOT NULL,
        password   STRING  NOT NULL,
        points     INTEGER DEFAULT (0) NOT NULL,
        hints      INTEGER DEFAULT (0) NOT NULL,
        highestlvl INTEGER DEFAULT (1) NOT NULL 
    );
    CREATE TABLE IF NOT EXISTS questions (
        question_id   INTEGER PRIMARY KEY,
        question_text TEXT    NOT NULL,
        question_type TEXT    NOT NULL
    );
    CREATE TABLE IF NOT EXISTS MultipleChoiceAnswers (
        answer_id   INTEGER PRIMARY KEY,
        question_id INTEGER REFERENCES questions (question_id) 
                            NOT NULL,
        answer_text TEXT    NOT NULL,
        is_correct  INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS TrueFalseAnswers (
        answer_id   INTEGER PRIMARY KEY,
        question_id         REFERENCES questions (question_id) 
                            NOT NULL,
        answer_text TEXT    NOT NULL,
        is_correct  INTEGER NOT NULL
    );
    

    `;
    try {
        db.exec(users);
        /* This would be a good spot to insert some dummy data to initialize your tables for 
        testing with the app.*/
        console.log("Tables created.");
    } catch (error) {
        console.error("Error creating tables: ", error);
        throw error; /* Rethrow any errors back to the server to it can handle accordingly, e.g., 
        by sending a 400 or 500 response to the client.*/
    }

};

// This function will add a user.
export const addUser = (username, email, password) => {
    const insertUserQuery = `INSERT INTO users (email, username, password, points, hints, highestlvl) VALUES (?, ?, ?, 0,0,1)`;
    db.prepare(insertUserQuery).run(email, username, password);
};

// This function will retrieve a user by username
export const getUserByUsername = (username) => {
    const getUserQuery = `SELECT * FROM users WHERE username = ?`;
    return db.prepare(getUserQuery).get(username);
};

// Gets points given a username
export const getPointsByUsername = (username) => {
    const getPointsQuery = `SELECT points FROM users WHERE username = ?`;
    return db.prepare(getPointsQuery).get(username);
};

// Gets hints given a username
export const getHintsByUsername = (username) => {
    const getHintsQuery = `SELECT hints FROM users WHERE username = ?`;
    return db.prepare(getHintsQuery).get(username);
};

// Gets highest level given a username
export const getLvlByUsername = (username) => {
    const getLvlQuery = `SELECT highestlvl FROM users WHERE username = ?`;
    return db.prepare(getLvlQuery).get(username);
};
// Updates username given an email
const setUsernameByEmail = (email, username) => {
    const setEmailCall = `UPDATE users SET username = ? WHERE email = ?`;
    return db.prepare(setEmailCall).run(username, email);
};
// Updates email given a username
const setEmailByUsername = (email, username) => {
    const setEmailCall = `UPDATE users SET email = ? WHERE username = ?`;
    return db.prepare(setEmailCall).run(email, username);
};

const setPasswordByEmail = (email, password)=>{
    const setPasswordCall = 'UPDATE users SET password = ? where email = ?';
    return db.prepare(setPasswordCall).run(password, email);
}

// Updates points given a username
export const setPointsByUsername = (points, username) => {
    const setPointsCall = `UPDATE users SET points = ? WHERE username = ?`;
    return db.prepare(setPointsCall).run(points, username);
};

// Updates level given a username
export const setLevelByUsername = (highestlvl, username) => {
    const setLevelCall = `UPDATE users SET highestlvl = ? WHERE username = ?`;
    return db.prepare(setLevelCall).run(highestlvl, username);
};

// Gets question
export const getQuestion = (questionId) => {
    const getQuestionQuery = `SELECT * FROM questions WHERE CAST (question_id AS FLOAT) = ?`;
    return db.prepare(getQuestionQuery).get(questionId);
};

// does get multiple choice answer for a given question ID
/**
 * Copy and paste this function, but change MultipleChoiceAnswers to TrueFalseAnswers
 * @param {string} answerId 
 * @param {string} questionId 
 * @returns 
 */
export const getMultipleChoiceAnswer = (answerId, questionId) => {
    const getQuestionQuery = `SELECT * FROM MultipleChoiceAnswers WHERE CAST (answer_id AS FLOAT) = ? AND CAST (question_id AS FLOAT) = ?`;
    return db.prepare(getQuestionQuery).get(answerId, questionId);
};

export const getTrueFalseAnswer = (answerId, questionId) => {
    const getQuestionQuery = `SELECT * FROM TrueFalseAnswers WHERE CAST (answer_id AS FLOAT) = ? AND CAST (question_id AS FLOAT) = ?`;
    return db.prepare(getQuestionQuery).get(answerId, questionId);
};
// Gets leaderboard data sorted by points
export const getLeaderboard = () => {
    const getLeaderboardQuery = `SELECT username, points FROM users ORDER BY points DESC`;
    return db.prepare(getLeaderboardQuery).all();
};
