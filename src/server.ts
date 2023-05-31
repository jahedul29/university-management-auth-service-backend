import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function bootstrap(){
    try{
        await mongoose.connect(config.database_url as string);
        console.log('Database connected');
        app.listen(config.port, ()=> {
            console.log(`Application listening on port ${config.port}`)
        })
    }catch(err){
        console.log('Failed to connect database', err);
    }
};

bootstrap();