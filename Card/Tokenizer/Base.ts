import { cryptly } from "cryptly"
import { Card } from "../index"

export abstract class Base {
	constructor(protected readonly encrypter: cryptly.Encrypter) {}

	abstract getKeyName(encrypted?: cryptly.Encrypter.Aes.Encrypted | cryptly.Encrypter.Rsa.Encrypted): Promise<string>

	abstract getSaltValue(encrypted: cryptly.Encrypter.Aes.Encrypted | cryptly.Encrypter.Rsa.Encrypted): Promise<string>

	async tokenize(card: Card): Promise<Card.Token | undefined> {
		const encrypted = await this.encrypter.encrypt(card.pan + ":" + card.csc)

		return (
			encrypted &&
			Card.Token.pack(
				card,
				await this.getKeyName(encrypted.key ? encrypted : undefined),
				encrypted.value,
				await this.getSaltValue(encrypted)
			)
		)
	}
}
