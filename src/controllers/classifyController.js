const { getNumberProperties, fetchFunFact } = require('../services/numberService');
const { validateNumber } = require('../utils/validator');

exports.classifyNumber = async (req, res) => {
    // Validate the input number from query parameters
    const number = validateNumber(req.query.number);

    // If the input is not a valid number, return an error response
    if (number === "alphabet") {
        return res.status(400).json({ number, error: true }); // Ensure response follows the required format
    }

    // Get numerical properties (e.g., prime, perfect, Armstrong) and classification tags
    const properties = getNumberProperties(number);

    // Fetch a fun fact about the number
    const funFact = await fetchFunFact(number);

    // Return the classification and details about the number
    res.json({
        number,
        is_prime: properties.isPrime,
        is_perfect: properties.isPerfect,
        properties: properties.tags,
        digit_sum: properties.digitSum,
        fun_fact: funFact
    });
};
