import { Pattern } from "../../../../Pattern"
import { Base } from "./Base"

export interface MonthYear extends Base {
	month: Pattern
	year: Pattern
}
export namespace MonthYear {
	export function is(value: MonthYear | any): value is MonthYear {
		return (
			typeof value == "object" &&
			value.month &&
			Pattern.is(value.month) &&
			value.year &&
			Pattern.is(value.year) &&
			Base.is(value)
		)
	}
}
