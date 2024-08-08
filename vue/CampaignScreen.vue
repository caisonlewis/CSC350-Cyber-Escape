<script setup>
/* eslint-disable */
    import * as gmf from '../js/gamedata_functions.js'

    // Alert for accessing unavaliable level
    function notCleared(event) {
        alert('Level cannot be accessed, clear the previous level first')
    };

    let userName = localStorage.getItem('username');
    gmf.getUserGameData(userName);
    const currentLvl = parseInt(localStorage.getItem('highestlvl'));
    let points = localStorage.getItem('points')

</script>

<template>
    <div><h2>Total Points: {{ points }}</h2></div>
<!-- The first level is always accessible -->
    <div id="lvl1" v-if="currentLvl === 1"><a href="./level1.html" class="button"> Level 1 </a></div>
    <div id="lvl1" v-else><a href="./level1.html" class="button" style="background-color: yellow;">Level 1</a></div>

    <!-- Level buttons change to yellow if they've been cleared -->
    <div id="lvl2" v-if="currentLvl === 2"><a href="./level2.html" class="button">Level 2</a></div>
    <div id="lvl2" v-else-if="currentLvl > 2"><a href="./level2.html" class="button" style="background-color: yellow;">Level 2</a></div>
    <div id="lvl2" v-else><a href="" @click="notCleared" class="button" style="background-color: red;">Level 2</a></div>

    <!-- These levels are not interally sequencial but they are practially -->
    <div id="lvl3" v-if="currentLvl === 3"><a href="./level3.html" class="button">Level 3</a></div>
    <div id="lvl3" v-else-if="currentLvl > 3"><a href="./level3.html" class="button" style="background-color: yellow;">Level 3</a></div>
    <div id="lvl3" v-else><a href="" @click="notCleared" class="button" style="background-color: red;">Level 3</a></div>


    <div><a href="../index.html" class="button">Return to Home</a></div>

</template>
