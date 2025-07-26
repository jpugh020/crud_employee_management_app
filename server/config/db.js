import mongoose from 'mongoose';

export default async function connectDB() {
try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {dbName: "Employees"});
    console.log(`Database is connected. Host is: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
}
}