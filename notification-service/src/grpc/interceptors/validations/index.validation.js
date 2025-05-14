module.exports.getFirstErrorMessage = (validator) => {
    try {
        const firstErrorKey = Object.keys(validator.errors)[0];
        if (firstErrorKey) {
            return validator.errors[firstErrorKey].message; // This now returns the key
        }
        return null;
    } catch (error) {
        return null;
    }
};
