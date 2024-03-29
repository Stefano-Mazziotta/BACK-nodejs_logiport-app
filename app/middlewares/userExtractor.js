const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    const authorization = request.get('authorization');
    let token = "";

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if ( !token || !decodedToken ){
        return response.status(401).json({ error: "Token missing or invalid" });
    }

    const { id: userId } = decodedToken;
    request.userIdLogin = userId;

    next();
}