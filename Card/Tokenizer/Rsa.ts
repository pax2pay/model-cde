import { cryptly } from "cryptly"
import { Key } from "../../Key"
import { Base } from "./Base"

export class Rsa extends Base {
	constructor(protected readonly encrypter: cryptly.Encrypter.Rsa) {
		super(encrypter)
	}
	async getSaltValue(): Promise<string> {
		return "0"
	}
	async getKeyName(): Promise<string> {
		const key = await this.encrypter.export("public")
		return key ? Key.getName({ public: key }) : ""
	}
}
