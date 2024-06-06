import { cryptly } from "cryptly"
import type { Card } from "../../index"

export abstract class Base {
	constructor(protected readonly encrypter: cryptly.Encrypter) {}
	protected abstract getKeyName(
		encrypted?: cryptly.Encrypter.Aes.Encrypted | cryptly.Encrypter.Rsa.Encrypted
	): Promise<string>
	protected abstract getSaltValue(
		encrypted: cryptly.Encrypter.Aes.Encrypted | cryptly.Encrypter.Rsa.Encrypted
	): Promise<string>
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
