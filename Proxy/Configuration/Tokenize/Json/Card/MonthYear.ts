import { Selector } from "../../../../Selector"
import { Base } from "./Base"

export interface MonthYear extends Base {
	month: Selector
	year: Selector
}
export namespace MonthYear {
	export function is(value: MonthYear | any): value is MonthYear {
		return (
			typeof value == "object" &&
			value.pan &&
			Selector.is(value.pan) &&
			value.csc &&
			Selector.is(value.csc) &&
			value.month &&
			Selector.is(value.month) &&
			value.year &&
			Selector.is(value.year)
		)
	}
}
