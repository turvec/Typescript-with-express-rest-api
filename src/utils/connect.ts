import mongoose from 'mongoose';
import config from 'config';

async function connect() {
    const dbUri = config.get<string>('dbUri');

    try{
        await mongoose.connect(dbUri);
        console.log("connected db");
    }catch(err){
        console.log("connected failed");
        process.exit(1);
    }
}

export default connect;