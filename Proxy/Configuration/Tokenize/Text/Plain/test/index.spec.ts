import { pax2pay } from "../../../../../../index"
import { configurations } from "./configurations"
import { dataset } from "./dataset"

describe("@pax2pay/pax2pay.cde.Proxy.Configuration.Tokenize.TextPlain", () => {
	it("extract", async () => {
		const data = dataset["generic"]
		const config = configurations["expires"]
		expect(pax2pay.cde.Proxy.Configuration.Tokenize.Text.Plain.is(config)).toBeTruthy()

		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Text.extract(config, data)
		expect(card).toMatchObject({
			pan: "1234123412341234",
			csc: "789",
			expires: [9, 25],
		})
	})

	it("process regular", async () => {
		const data = dataset["generic"]
		const config = configurations["expires"]
		expect(pax2pay.cde.Proxy.Configuration.Tokenize.Text.Plain.is(config)).toBeTruthy()

		const token = "1234121234/16/1224/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"

		const result = pax2pay.cde.Proxy.Configuration.Tokenize.Text.process(config, token, data)
		const expected = "cardnumber=123412******1234&csc=&asd=" + token + "&expiry=0925"
		expect(result).toEqual(expected)
	})

	it("process double field", async () => {
		const data = dataset["doubleNumber"]
		const config = configurations["expires"]
		expect(pax2pay.cde.Proxy.Configuration.Tokenize.Text.Plain.is(config)).toBeTruthy()

		const token = "1234121234/16/1224/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"

		const result = pax2pay.cde.Proxy.Configuration.Tokenize.Text.process(config, token, data)
		const expected = "cardnumber=123412******1234&csc=&cardnumber=123412******1234&asd=" + token + "&expiry=0925"
		expect(result).toEqual(expected)
	})
})
