import { isly } from "isly"

export interface Public {
	public: string
}
export namespace Public {
	export const type = isly.object<Public>({ public: isly.string() }, "pax2pay.cde.Key.Public")
	export const is = type.is
	export const flaw = type.flaw
}
