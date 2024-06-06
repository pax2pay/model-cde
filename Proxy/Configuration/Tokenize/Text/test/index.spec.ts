import { pax2pay } from "../../../../../index"
import { configurations } from "./configurations"
import { dataset } from "./dataset"

describe("@pax2pay/model.Proxy.Configuration.Tokenize.Text", () => {
	it("extract", async () => {
		const data = dataset["generic"]
		const config = configurations["expires"]
		expect(pax2pay.cde.Proxy.Configuration.Tokenize.Text.is(config)).toBeTruthy()

		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Text.extract(config, data)
		expect(card).toMatchObject({
			pan: "1234123412341234",
			csc: "987",
			expires: [12, 24],
		})
	})

	it("process regular", async () => {
		const data = dataset["generic"]
		const config = configurations["expires"]
		expect(pax2pay.cde.Proxy.Configuration.Tokenize.Text.is(config)).toBeTruthy()

		const token = "1234121234/16/1224/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"

		const result = pax2pay.cde.Proxy.Configuration.Tokenize.Text.process(config, token, data)
		const expected =
			"<card>\n\t<cardNumber>123412******1234</cardNumber>\n\t<csc></csc>\n\t<someOtherInfo>random information</someOtherInfo>\n\t<expires>12/24</expires>\n</card>"
		expect(result).toEqual(expected)
	})

	it("process double field", async () => {
		const data = dataset["doubleNumber"]
		const config = configurations["expires"]
		expect(pax2pay.cde.Proxy.Configuration.Tokenize.Text.is(config)).toBeTruthy()

		const token = "1234121234/16/1224/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"

		const result = pax2pay.cde.Proxy.Configuration.Tokenize.Text.process(config, token, data)
		const expected =
			"<card>\n\t<cardNumber>123412******1234</cardNumber>\n\t<csc></csc>\n\t<someOtherInfo>random information</someOtherInfo>\n\t<cardNumber>123412******1234</cardNumber>\n\t<expires>12/24</expires>\n</card>"
		expect(result).toEqual(expected)
	})
})
