import { cryptly } from "cryptly"
import { isly } from "isly"
import { Private as KeyPrivate } from "./Private"
import { Public as KeyPublic } from "./Public"

export type Key = Key.Private & Key.Public

export namespace Key {
	export type Private = KeyPrivate
	export const Private = KeyPrivate
	export type Public = KeyPublic
	export const Public = KeyPublic

	export const type = isly.named("pax2pay.cde.Key", isly.intersection<Key, Private, Public>(Private.type, Public.type))
	export const is = type.is
	export const flaw = type.flaw

	export async function generate(): Promise<Key | undefined> {
		const result = await (await cryptly.Encrypter.Rsa.generate(2048)).export()
		return Key.is(result) ? result : undefined
	}
	export function getName(key: Key.Public): string {
		// take a piece in the middle of the key (because keys start and end the same), 43 here,
		// remove anything that's not a letter and take the first 4 from there and pad if needed
		return (
			"RSA" +
			key.public
				.substring(43)
				.replaceAll(/[/+=0-9]/g, "")
				.substring(0, 4)
				.padEnd(4, "Z")
		)
	}
}
