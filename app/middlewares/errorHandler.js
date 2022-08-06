function errorHandler(error, req, res, next){
    let errorStatus = error.status;
    let errorMessage = error.message;
    
    res.status(errorStatus);
    res.send({"error": true, "message": errorMessage});
}

module.exports = errorHandler;