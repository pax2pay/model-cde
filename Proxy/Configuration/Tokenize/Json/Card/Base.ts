import { Selector } from "../../../../Selector"

export interface Base {
	pan: Selector
	csc: Selector
}
export namespace Base {
	export function is(value: Base | any): value is Base {
		return typeof value == "object" && value.pan && Selector.is(value.pan) && value.csc && Selector.is(value.csc)
	}
}
