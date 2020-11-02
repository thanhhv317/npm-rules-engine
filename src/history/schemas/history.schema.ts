import { Schema } from 'mongoose';

export const HistorySchema = new Schema({
    rule_id: String,
    update_persion: String,
    column: String,
    data: String,
}, {
    timestamps: true,
})