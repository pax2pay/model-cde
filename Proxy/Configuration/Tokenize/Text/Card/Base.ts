import { Pattern } from "../../../../Pattern"

export interface Base {
	pan: Pattern
	csc: Pattern | undefined
}
export namespace Base {
	export function is(value: Base | any): value is Base {
		return (
			typeof value == "object" &&
			value.pan &&
			Pattern.is(value.pan) &&
			((value.csc && Pattern.is(value.csc)) || value.csc == undefined)
		)
	}
}
