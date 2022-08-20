const stringUtils = {
    
    cleanLineBreak: (str) => {
        return str.replace(/(\r\n|\n|\r)/gm, "");
    }
}

module.exports = stringUtils;