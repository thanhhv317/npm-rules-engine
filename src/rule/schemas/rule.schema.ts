import { timeStamp } from 'console';
import { Schema } from 'mongoose';

export const RuleSchema = new Schema({
    fee_type: Number,
    to_date: Number,
    from_date: Number,
    priority: Number,
    active: Boolean,
    name: String,
    description: String,
    type: String,
    event: String,
    conditions: String,
    userCreate: String,
}, {
    timestamps: true,
})