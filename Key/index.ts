import { cryptly } from "cryptly"
import { isly } from "isly"
import { Private as KeyPrivate } from "./Private"
import { Public as KeyPublic } from "./Public"

export type Key = Key.Private | Key.Public

export namespace Key {
	export type Private = KeyPrivate
	export const Private = KeyPrivate
	export async function generate(): Promise<Key | undefined> {
		const result = await (await cryptly.Encrypter.Rsa.generate(2048)).export()
		return Key.is(result) ? result : undefined
	}

	export type Public = KeyPublic
	export const Public = KeyPublic
	export const type = isly.named("pax2pay.cde.Key", isly.union<Key>(Private.type, Public.type))
	export const is = type.is
	export const flaw = type.flaw
}
