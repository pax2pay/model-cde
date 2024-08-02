import { Pattern } from "."

export abstract class BasePattern {
	abstract extract(data: string, pattern: Pattern): string

	abstract apply(data: any, pattern: Pattern, value: any): string
}
