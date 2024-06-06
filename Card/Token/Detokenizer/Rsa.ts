import { cryptly } from "cryptly"
import { Card } from "../index"
import { Base } from "./Base"

export class Rsa extends Base {
	constructor(protected readonly encrypter: cryptly.Encrypter.Rsa) {
		super(encrypter)
	}

	async decryptToken(unpacked: Card.Token.Unpacked): Promise<string | undefined> {
		return this.encrypter.decrypt(unpacked.encrypted)
	}
}
