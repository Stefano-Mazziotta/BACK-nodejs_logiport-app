function sendSuccessResponse (response, successMessage){
    response.status(successMessage.status);
    response.send(successMessage);
}

module.exports = sendSuccessResponse;