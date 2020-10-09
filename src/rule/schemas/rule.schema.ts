import { Schema } from 'mongoose';

export const RuleSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"]
    },
    from: Date,
    to: Date,
    conditions: String,
    actions: String,
    data: String,
    createdAt: { type: Date, default: Date.now }
})