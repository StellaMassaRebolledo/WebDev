//To start to connect my db. This is the address to my cluster. Do not use it in production, don't expose your credentials

let DB_CONNECTION = "mongodb+srv://SMassa:HtH3HdJywrd1XWno@cluster002.ayqg5.mongodb.net/comp229002"

//Database Setup - Loading Mongoose 
let mongoose = require ('mongoose');

module.exports= function(){
    
    //Connect to the DB. Starting connection
    mongoose.connect (DB_CONNECTION);

    //instance of the connection to 
    let mongoDB = mongoose.connection; 

    //setting up listeners
    mongoDB.on ('error', console.error.bind(console, 'Connection Error: '));
    mongoDB.once ('open', () => {
        console.log ('Connected to Mongo DB...');
        })

    return mongoDB;    

}


