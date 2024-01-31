import { cryptly } from "cryptly"
import { Base } from "./Base"

export class Rsa extends Base {
	constructor(protected readonly encrypter: cryptly.Encrypter.Rsa) {
		super(encrypter)
	}

	async getSaltValue(): Promise<string> {
		return "0"
	}

	async getKeyName(): Promise<string> {
		let result: string
		const publicKey = await this.encrypter.export("public")

		if (publicKey)
			//take a piece in the middle of the key (because keys start and end the same), 43 here,
			//remove anything that's not a letter and take the first 4 from there and pad if needed
			result =
				"RSA" +
				publicKey
					.substring(43)
					.replaceAll(/[/+=0-9]/g, "")
					.substring(0, 4)
					.padEnd(4, "Z")
		else
			result = ""
		return result
	}
}
