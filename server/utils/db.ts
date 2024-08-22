
require("dotenv").config();
import mongoose from 'mongoose';

const dbUrl:string = process.env.DB_URL || '';

const connectDB = async () =>{
    try {
    await mongoose.connect(dbUrl).then((data:any) =>{
        console.log(`Database is connected with port ${data.connection.host}`)
    })
    }catch (error:any){
        console.log(error.message);
        setTimeout(connectDB, 5000);

    }
}
export default connectDB;