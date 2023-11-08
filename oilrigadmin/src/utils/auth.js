function checkLoggedIn() {
    var token = localStorage.getItem("token");
    // If there's no token, they are not logged in
    if (!token) {
        return false;
    }
    // Check the expiration time of the token to see if it's expired
    token = JSON.parse(atob(token.split(".")[1]));
    var exp = token.exp;
    var now = Date.now() / 1000;
    if (now > exp) {
        localStorage.removeItem("token");
        return false;
    } else {
        return true;
    }
}

module.exports = {
    checkLoggedIn,
};
