import mongoose from "mongoose";

const generatePatientId = () => {
    return Math.floor(10000 + Math.random() * 90000); 
};

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        patientId: {
            type: String,
            required: true,
            unique: true, 
            default: generatePatientId, 
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
