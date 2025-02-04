const axios = require('axios');

// Function to check if a number is prime
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is a perfect number
function isPerfect(num) {
    let sum = 1; // Start with 1 since it's a divisor for every number
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i + (i === num / i ? 0 : num / i); // Add both divisors if they are different
        }
    }
    return sum === num && num !== 1; // A perfect number equals the sum of its proper divisors
}

// Function to check if a number is an Armstrong number
function isArmstrong(num) {
    const digits = num.toString().split('').map(Number); // Convert number to an array of its digits
    const power = digits.length; // The number of digits determines the exponent
    return digits.reduce((sum, d) => sum + Math.pow(d, power), 0) === num; // Sum of each digit raised to the power should equal the number
}

// Function to get different properties of a number
function getNumberProperties(num) {
    return {
        isPrime: isPrime(num), 
        isPerfect: isPerfect(num), 
        digitSum: num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0), 
        tags: [
            isArmstrong(num) ? 'armstrong' : null, 
            num % 2 === 0 ? 'even' : 'odd' 
        ].filter(Boolean) 
    };
}

// Function to fetch a fun fact about a number
async function fetchFunFact(num) {
    // If it's an Armstrong number, return a breakdown of why
    if (isArmstrong(num)) {
        return `${num} is an Armstrong number because ${getArmstrongBreakdown(num)} = ${num}`;
    } 
    // If it's a Perfect number, return an explanation
    if (isPerfect(num)) {
        return `${num} is a Perfect number because the sum of its divisors equals ${num}`;
    } 
    // If it's a Prime number, return an explanation
    if (isPrime(num)) {
        return `${num} is a Prime number because it has exactly two divisors: 1 and itself.`;
    } 
    
    // If it's none of the above, fetch a fun fact from an API
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math`);
        return response.data;
    } catch (error) {
        return "Fun fact not available."; // Handle any API errors
    }
}

// Function to generate an Armstrong number breakdown for better understanding
function getArmstrongBreakdown(num) {
    const digits = num.toString().split('').map(Number); // Get individual digits of the number
    const power = digits.length; // Get the number of digits
    return digits.map(d => `${d}^${power}`).join(' + '); // Format the breakdown as a sum of powers
}

module.exports = { getNumberProperties, fetchFunFact, isPrime, isArmstrong, isPerfect };
