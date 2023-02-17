const dbModels = require('../../app/db');
const loggingMiddleware = (db) =>
    (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const headers = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;
        // Persist this info on DB
        const loggingData ={
            action: originalUrl,
            header: headers,
            ip: ip
        }
        dbModels.logging.create(loggingData,(err,result)=>{
            if(err){
                console.log('Error insertando en bd',err)
            }
        })
        next();
    }

module.exports = loggingMiddleware;