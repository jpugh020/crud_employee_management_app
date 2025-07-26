import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;


const EmployeeSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    hired: {
        type: Date,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true
    }
}, {collection: "Employees"});

export default mongoose.model('EmployeeModel', EmployeeSchema);