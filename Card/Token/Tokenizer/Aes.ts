import { cryptly } from "cryptly"
import { Base } from "./Base"

export class AesTokenizer extends Base {
	constructor(protected readonly encrypter: cryptly.Encrypter.Aes) {
		super(encrypter)
	}

	protected async getSaltValue(encrypted: cryptly.Encrypter.Aes.Encrypted): Promise<string> {
		return encrypted.salt
	}

	protected async getKeyName(encrypted?: cryptly.Encrypter.Aes.Encrypted): Promise<string> {
		return encrypted?.key ?? ""
	}
}
