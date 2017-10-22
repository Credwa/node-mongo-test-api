let authenticated = false;

let authenticate = (authed) => {
    if(authed) {
        authenticated = authed;
    } else {
    }
    return authenticated;
};

module.exports = { authenticate };