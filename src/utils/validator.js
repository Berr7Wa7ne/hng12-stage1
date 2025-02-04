exports.validateNumber = (num) => {
    // Check if the input is not a number or if it's not a whole number
    if (isNaN(num) || !Number.isInteger(parseFloat(num))) {
        return "alphabet"; // Return "alphabet" for invalid inputs 
    }

    // Convert the valid input to an integer and return it
    return parseInt(num, 10);
};
