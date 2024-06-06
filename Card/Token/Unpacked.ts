import { isly } from "isly"
import { Masked } from "../Masked"
import { Part } from "../Part"

export type Unpacked = Masked & {
	key: string
	encrypted: string
	salt: string
	part?: Part
}
export namespace Unpacked {
	export const type = Masked.type.extend<Unpacked>({
		key: isly.string(),
		encrypted: isly.string(),
		salt: isly.string(),
		part: Part.type.optional(),
	})
}
