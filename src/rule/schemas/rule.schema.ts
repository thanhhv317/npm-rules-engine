import { Schema } from 'mongoose';

export const RuleSchema = new Schema({
    conditions: String,
    actions: String,
    createdAt: { type: Date, default: Date.now }
})