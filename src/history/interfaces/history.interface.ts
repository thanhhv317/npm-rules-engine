import { Document } from "mongoose";

export interface HistoryUpdate extends Document {
    readonly rule_id: String;
    readonly update_persion: String;
    readonly column: String;
    readonly data: String;
}