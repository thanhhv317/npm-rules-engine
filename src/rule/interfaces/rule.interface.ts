import { Document } from "mongoose";

export interface Rule extends Document {
    readonly name: string,
    readonly desciprtion: string,
    readonly status: string,
    readonly from: string,
    readonly to: string,
    readonly conditions: string,
    readonly actions: string,
    readonly data: string;
    readonly createdAt: Date
}