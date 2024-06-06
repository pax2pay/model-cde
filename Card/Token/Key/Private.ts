import { isly } from "isly"

export interface Private {
	private: string
}
export namespace Private {
	export const type = isly.object<Private>({ private: isly.string() }, "pax2pay.cde.Key.Private")
	export const is = type.is
	export const flaw = type.flaw
}
