function errorHandler(error, req, res, next){
    let errorStatus = error.status || 500;
    let errorMessage = error.message;

    if (errorMessage.startsWith("jwt") || errorMessage === "invalid token"){
        errorStatus = 401;
    }
    
    res.status(errorStatus);
    res.send({"error": true, "message": errorMessage});
}

module.exports = errorHandler;