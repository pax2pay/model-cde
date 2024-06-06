import { cryptly } from "cryptly"
import * as gracely from "gracely"
import { pax2pay } from "../index"

describe("@pax2pay/model.Card", () => {
	it("is", () =>
		expect(
			pax2pay.cde.Card.is({
				pan: "4111111111111111",
				csc: "987",
				expires: [2, 22],
			})
		).toEqual(true))

	it("is, expiry [0,0]", () =>
		expect(
			pax2pay.cde.Card.is({
				pan: "5555555555555555",
				csc: "333",
				expires: [0, 0],
			})
		).toEqual(true))
})

describe("@pax2pay/pax2pay.cde.Card.Tokenizer + Detokenizer", () => {
	it("Rsa tokenize + detokenize", async () => {
		const encrypter = cryptly.Encrypter.Rsa.generate(2048)
		const tokenizer = new pax2pay.cde.Card.Tokenizer.Rsa(encrypter)
		const token = await tokenizer.tokenize({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 21],
		})
		if (gracely.Error.is(token))
			fail(token.error)
		else if (!token)
			fail()
		else {
			expect(pax2pay.cde.Card.Token.is(token)).toEqual(true)
			expect(pax2pay.cde.Card.Token.unpack(token).salt).toEqual("0")
			const detokenizer = new pax2pay.cde.Card.Detokenizer.Rsa(encrypter)
			const card = token && (await detokenizer.detokenize(token))
			expect(card).toMatchObject({
				pan: "4567890123457890",
				masked: "456789******7890",
				csc: "987",
				expires: [2, 21],
			})
		}
	})
})
