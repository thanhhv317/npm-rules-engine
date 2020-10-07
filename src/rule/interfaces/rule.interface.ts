import { Document } from "mongoose";

export interface Rule extends Document {
    readonly conditions: string,
    readonly actions: string,
    readonly createdAt: Date
}