function generatePassword() {
    return Math.random().toString(36).slice(-8).replace(/\./g, "_");
}

module.exports = {
    generatePassword,
};
