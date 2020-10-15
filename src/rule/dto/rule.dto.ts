export class CreateRuleDTO {
    readonly fee_type: number;
    readonly to_date: number;
    readonly from_date: number;
    readonly priority: number;
    readonly active: boolean;
    readonly name: string;
    readonly description: string;
    readonly type: string;
    readonly event: string;
    readonly conditions: string;
}