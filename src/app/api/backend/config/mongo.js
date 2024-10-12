import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const databaseUrl = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

const connectDatabase = async () => {
    try {
        await mongoose.connect(databaseUrl)

        console.log('Koneksi MongoDB berhasil.')
    } catch (error) {
        console.error('Gagal terhubung ke MongoDB:', error.message)
        process.exit(1)
    }
};
module.exports = connectDatabase;