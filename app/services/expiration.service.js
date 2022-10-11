class ExpirationService {

    static getDaysToExpiration (actualDate, expirationDate){  
        const diff = (expirationDate * 1000) - actualDate;
        let daysToExpiration = Math.ceil(diff/(1000*60*60*24));

        if(daysToExpiration < 0){
            daysToExpiration = -1;
        }        
        
        return daysToExpiration;
    }

    static calculateStatus(expiration){
        
        const actualTimestamp = Date.now();
        const expirationTimestamp = expiration.ExpirationDate;
        
        const daysToExpiration = this.getDaysToExpiration(actualTimestamp, expirationTimestamp);
        
        let status = "ok"  

        if(daysToExpiration == -1){
            status = "expirated";
        }        
        
        if(daysToExpiration <= 21 && daysToExpiration >= 0){ 
            status = "warning"
        }      
        
        return status;
    }

   
}

module.exports = ExpirationService;