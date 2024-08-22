import mongoose ,{Document, Model, Schema} from "mongoose";
import bcrypt from 'bcryptjs';

const emailRegexPattern : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    avatar:{
        public_id:string;
        url:string;
    },
    role:string;
    isVerified:string;
    courses:Array<{courseId:string}>;
    comparePassword: (password:string) => Promise<boolean>;

};

const userSchema: Schema<IUser> = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        validate:{
            validator:function(value:string){
                return emailRegexPattern.test(value);
            }
        }
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minlength:[6, "Should have six characters"],
        select:false,
    },
    avatar:{
        public_id: String,
        url:String
    },

    
})