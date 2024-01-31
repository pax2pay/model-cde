import { cryptly } from "cryptly"
import { Card } from ".."

export abstract class Base {
	constructor(protected readonly encrypter: cryptly.Encrypter) {}
	abstract decryptToken(unpacked: Card.Token.Unpacked): Promise<string | undefined>

	async detokenize(token: Card.Token): Promise<(Card & Card.Masked) | string | Card.Expires | number | undefined>
	async detokenize(
		masked: string,
		length: string,
		expires: string,
		key: string,
		value: string,
		salt: string
	): Promise<(Card & Card.Masked) | string | Card.Expires | number | undefined>
	async detokenize(
		masked: string,
		length: string,
		expires: string,
		key: string,
		value: string,
		salt: string,
		part: Card.Part
	): Promise<(Card & Card.Masked) | string | Card.Expires | number | undefined>
	async detokenize(
		masked: string,
		length: string,
		expires: string,
		key: string,
		value: string,
		salt: string,
		part: "year" | "month"
	): Promise<number | undefined>
	async detokenize(
		masked: string,
		length: string,
		expires: string,
		key: string,
		value: string,
		salt: string,
		part: "expires"
	): Promise<Card.Expires | undefined>
	async detokenize(
		masked: string,
		length: string,
		expires: string,
		key: string,
		value: string,
		salt: string,
		part: "pan" | "csc" | "masked"
	): Promise<string | undefined>
	async detokenize(
		token: string,
		...argument: string[]
	): Promise<(Card & Card.Masked) | Card.Masked | string | Card.Expires | number | undefined> {
		const unpacked = argument.length == 0 ? Card.Token.unpack(token) : Card.Token.unpack([token, ...argument])
		let result: (Card & Card.Masked) | Card.Masked | string | Card.Expires | number | undefined
		const fromUnpacked = await this.extractFromUnpackedToken(unpacked)
		if (fromUnpacked)
			result = !unpacked.part
				? fromUnpacked
				: unpacked.part == "month"
				? fromUnpacked.expires[0]
				: unpacked.part == "year"
				? fromUnpacked.expires[1]
				: (fromUnpacked as Partial<Card> & Card.Masked)[unpacked.part]
		return result
	}

	private async extractFromUnpackedToken(
		unpacked: Card.Token.Unpacked
	): Promise<Card.Masked | (Card & Card.Masked) | undefined> {
		let result: string | number | Card.Masked | (Card & Card.Masked) | Card.Expires | undefined
		if (this.encrypter) {
			const decrypted = await this.decryptToken(unpacked)
			if (decrypted == undefined)
				result = decrypted
			else {
				const [pan, csc] = decrypted.split(":")
				result = {
					pan,
					csc,
					...unpacked,
				}
			}
		} else
			result = unpacked
		return result
	}
}
