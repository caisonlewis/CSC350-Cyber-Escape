/* eslint-disable */
// Import necessary modules
// Define the User class
class User {
    constructor(email, username, password, maxLevel, points) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.maxLevel = maxLevel;
        this.points = points;
    }
    setEmail(newValue){
        this.email = newValue;
    }
    setUsername(newValue){
        this.username = newValue;
    }
    setPassword(newValue){
        this.password = newValue;
    }
    setMaxLevel(newValue){
        this.maxLevel = newValue;
    }
    setPoints(newValue){
        this.points=newValue;
    }
    getEmail(){
        return this.email;
    }
    getUsername(){
        return this.username;
    }
    getPassword(){
        return this.password;
    }
    getMaxLevel(){
        return this.maxLevel;
    }
    getPoints(){
        return this.points;
    }
    // This function will retrieve a user by their username

    // Method to load user from localStorage
    static loadFromLocalStorage() {
        const username = localStorage.getItem('username') || 'initialUser'; // Default to 'initialUser' if username not found
        const points = parseInt(localStorage.getItem('points')) || 0; // Default to 0 if points not found or not a valid number
        return new User(username, points);
    }
}

// Export the getUserByUsername and getUserByEmail functions
export { User };

