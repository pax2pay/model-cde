import { isly } from "isly"

export namespace Key {
	export interface Public {
		public: string
	}
	export namespace Public {
		export const type = isly.object<Public>({ public: isly.string() }, "pax2pay.cde.Key.Public")
		export const is = type.is
		export const flaw = type.flaw
	}
	export interface Private {
		private: string
	}
	export namespace Private {
		export const type = isly.object<Private>({ private: isly.string() }, "pax2pay.cde.Key.Private")
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = isly.named("pax2pay.cde.Key", isly.union<Key>(Public.type, Private.type))
	export const is = type.is
	export const flaw = type.flaw
}
