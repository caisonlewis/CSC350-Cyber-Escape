<script setup>
/* eslint-disable */
import { User } from '../js/user.js';

// Initialize user object
const user = new User();
const pwdFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
/**
 * Fetch user settings from server and update display information.
 */
const setDisplayInfo = () => {
    const username = localStorage.getItem('username');

    if (username) {
        fetchUserSettings(username)
            .then(updateUserInfo)
            .catch(handleError);
    } else {
        alert("You haven't created an account yet!");
        window.location.href = "../html/SignUp.html";
    }
};

/**
 * Fetch user settings from server.
 * @param {string} username - User's username.
 * @returns {Promise<Object>} - Promise representing the fetched data.
 */
const fetchUserSettings = (username) => {
    return fetch('http://localhost:3000/user/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    }).then(response => response.json());
};

/**
 * Update user information on the UI.
 * @param {Object} data - User data received from the server.
 */
const updateUserInfo = (data) => {
    user.setUsername(data.user.username);
    user.setEmail(data.user.email);
    user.setPassword(data.user.password);
    user.setMaxLevel(data.user.highestlvl);
    user.setPoints(data.user.points);

    document.getElementById("username").innerText = user.getUsername();
    document.getElementById("email").innerText = user.getEmail();
    document.getElementById("Level").innerText = "Highest Level: " + user.getMaxLevel();
    document.getElementById("Points").innerText = "Total Points: " + user.getPoints();
};

/**
 * Handle fetch errors.
 * @param {Error} error - Error object.
 */
const handleError = (error) => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
};

/**
 * Display input for changing username or email.
 * @param {string} toChange - 'username' or 'email'.
 */
const changeUsernameEmail = (toChange) => {
    document.getElementById(`${toChange}_input`).style.display = "block";
};

/**
 * Submit changes to username or email.
 * @param {string} toChange - 'username' or 'email'.
 */
const submitUsernameEmail = (toChange) => {
    const text = document.getElementById(`${toChange}_text`).value;

    if (toChange === "username") {
        updateUserField("username", text);
    } else if (toChange === "email") {
        updateUserField("email", text);
    }
};

/**
 * Update user field on the server and UI.
 * @param {string} field - Field to update ('username' or 'email').
 * @param {string} value - New value for the field.
 */
const updateUserField = (field, value) => {
    const requestBody = {
        username: field === "username" ? value : user.getUsername(),
        email: field === "email" ? value : user.getEmail()
    };

    fetch('http://localhost:3000/user/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById(toChange).innerHTML = field === "username" ? user.getUsername() : user.getEmail();
            document.getElementById("username_input").style.display = "none";
            document.getElementById("email_input").style.display = "none";
        })
        .catch(handleError);
};

/**
 * Show the respective displays for the password entry forms.
 */
function showPasswordInput() {
    document.getElementById("enterPwd_text").style.display = "block";
    document.getElementById("enterPwd_confirm").style.display = "block";
}

/**
 * Display the respective displays for various text inputs.
 * @param {int} pwd - The id of the text file to update.
 */
function listen(pwd) {
    switch (pwd) {
        case 1:
            if (document.getElementById("pwd1").value != user.getPassword()) {
                document.getElementById("alert").style.display = "block";
            } else {
                document.getElementById("checkPwdText").style.display = "block";
            }
            break;
        case 2:
            var format;
            var match;
            if (!pwdFormat.test(document.getElementById("pwd2").value)) {
                document.getElementById("alert3").style.display = "block";
                format = false;
            } else {
                document.getElementById("alert3").style.display = "none";
                format = true;
            }
            if (document.getElementById("pwd2").value != document.getElementById("pwd3").value) {
                document.getElementById("alert2").style.display = "block";
                match = false;
            } else {
                document.getElementById("alert2").style.display = "none";
                match = true;
            }
            if (match && format) {
                document.getElementById("checkPwdConfirm").style.display = "inline-block";
            }
    }
}
/**
 * Confirm password process.
 * @param {*} cancel - IF cancel is 0, then cancel is true.
 */
function confirmChange(cancel) {
    if (cancel == 0) {
        document.getElementById("pwd1").value = "";
        document.getElementById("pwd2").value = "";
        document.getElementById("pwd3").value = "";
        document.getElementById("enterPwd_text").style.display = "none";
        document.getElementById("enterPwd_confirm").style.display = "none";
        document.getElementById("alert").style.display = "none";
        document.getElementById("alert2").style.display = "none";
        document.getElementById("alert3").style.display = "none";
        document.getElementById("checkPwdText").style.display = "none";
        document.getElementById("checkPwdConfirm").style.display = "none";

    } else {
        user.setPassword(document.getElementById("pwd2").value);
        fetch('http://localhost:3000/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toChange: "what", username: user.getPassword(), email: user.getEmail() })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(handleError);
        document.getElementById("pwd1").value = "";
        document.getElementById("pwd2").value = "";
        document.getElementById("pwd3").value = "";
        document.getElementById("enterPwd_text").style.display = "none";
        document.getElementById("enterPwd_confirm").style.display = "none";
        document.getElementById("alert").style.display = "none";
        document.getElementById("alert2").style.display = "none";
        document.getElementById("alert3").style.display = "none";
        document.getElementById("checkPwdText").style.display = "none";
        document.getElementById("checkPwdConfirm").style.display = "none";
        document.getElementById("confirmedPwd").style.display = "block";
    }
}
// Call setDisplayInfo when the component is mounted (page loads)
import { onMounted } from 'vue';
onMounted(setDisplayInfo);
</script>

<style>
#username_input,
#email_input {
    display: none
}

#enterPwd_text,
#enterPwd_confirm {
    display: none
}

#alert,
#alert2,
#alert3,
#confirmedPwd,
#emailAlert {
    display: none
}

#checkPwdText,
#checkPwdConfirm {
    display: none
}
</style>

<template>
    <h1>Profile Information</h1>
    <div>
        <h2 style="display:inline-block">Username: </h2>
        <p style="display:inline-block" id="username" data-cy="username"> {{ user.username }}</p>
        <a class="button" @click="changeUsernameEmail('username')">Change Username</a><br>
    </div>
    <div id="username_input">
        <h2>Enter new username:</h2>
        <input type="text" @input="listen(0)" id="username_text"><br>
        <span id="usernameAlert" style="color: red;">Please enter a valid username.</span><br>
        <a class="button" @click="submitUsernameEmail('username')">Enter</a><br>
    </div>
    <h2 style="display:inline-block">Email:</h2>
    <p style="display:inline-block" id="email">{{ user.getEmail() }}</p>
    <a class="button" @click="changeUsernameEmail('email')">Change Email</a><br>
    <div id="email_input">
        <h2>Enter new email:</h2>
        <input type="text" @input="listen(1)" id="email_text"><br>
        <span id="emailAlert" style="color: red;">Please enter a valid email.</span>
        <a class="button" id="email_enter" @click="submitUsernameEmail('email')">Enter</a><br>
    </div>
    <div>
        <h2 id="Password" style="display:inline-block">Password: </h2>
        <p style="display: inline-block">********</p>
        <a class="button" @click="showPasswordInput()">Change Password</a>
    </div>
    <h3 id="confirmedPwd">Password Changed Successfully!</h3>
    <div id="enterPwd_text">
        <label for="pwd1" id="label1">
            <h3>Current Password:</h3>
        </label>
        <input type="password" id="pwd1" name="first_pwd" @input="document.getElementById('alert').style.display = 'none';"><br>
    </div>
    <span id="alert" style="color: red;">Incorrect Password. Please try again.</span>
    <div id="enterPwd_confirm">
        <a class="button" style="background-color: red; display: inline-block" @click="confirmChange(0)">Cancel</a>
        <a class="button" id="enter" @click="listen(1)">Enter</a><br>
    </div>
    <div id="checkPwdText">
        <label for="pwd2" id="label2">
            <h3>New Password:</h3>
        </label>
        <input type="password" id="pwd2" name="new_pwd" @input="listen(2)"><br>
        <span id="alert3" style="color: red;">Please enter a valid password.</span>
        <label for="pwd3" id="label3">
            <h3>Confirm Password:</h3>
        </label>
        <input type="password" id="pwd3" name="confirm_pwd" @input="listen(2)"><br>
        <span id="alert2" style="color: red;">Passwords do not match.</span>
        <p id="notice" display="inline-block">Passwords must contain at least 8 letters, one Uppercase letter, one
            lowercase letter, one digit, and
            one special character.</p>
        <a class="button" style="background-color: red; display: inline-block" @click="confirmChange(0)">Cancel</a>
    </div>
    <div id="checkPwdConfirm">
        <a class="button" id="confirm" @click="confirmChange(1)">Confirm</a>
    </div>
    <div>
        <h1>Campaign Information</h1>
        <h2 id="Level" style="display:inline-block">Highest Level: {{ user.getMaxLevel() }}</h2><br>
        <h2 id="Points" style="display:inline-block">Point Total: {{ user.getPoints() }}</h2>
    </div>
    <div>
        <a class="button" href="../html/settings.html">Back</a>
        <a class="button" href="../index.html">Return Home</a>
    </div>
    <div>
        <a class="button" @click="deleteCampaign()" style="background-color: red">Delete Campaign</a>
    </div>
</template>