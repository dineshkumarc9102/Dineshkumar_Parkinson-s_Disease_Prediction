import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        patientId: {
            type: String,
            required: true,
        },
        symptoms: {
            UPDRS: { type: Number },
            Tremor: { type: Number },
            FunctionalAssessment: { type: Number },
            MoCA: { type: Number },
            Rigidity: { type: Number },
        },
        result: {
            type: String,
            required: true,
        },
        probability: {
            type: Number,
            required: true,
          },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const History = mongoose.model('History', historySchema);

export default History;