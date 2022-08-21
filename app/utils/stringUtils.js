const stringUtils = {
    
    cleanLineBreak: (string) => {
        string = string.replace(/(\r\n|\n|\r)/gm, "");
        string = string.replace(/\s\s+/g, ' ');

        return string;
    }
}

module.exports = stringUtils;