import * as model from "../../../index"

describe("@pax2pay/model.Proxy.Configuration.Response", () => {
	it("set ", () => {
		const configuration: model.Proxy.Configuration.Response.Json = {
			card: {
				pan: "card.pan",
				csc: "card.csc",
				month: "card.expires[0]",
				year: "card.expires[1]",
			},
			set: [
				{
					find: "card.pan",
					value: "$(masked)",
				},
				"card.csc",
				{
					find: "card.token",
					value: "$(token)",
				},
			],
		}
		const data: any = {
			card: {
				pan: "4567890123457890",
				csc: "987",
				expires: [2, 22],
			},
		}
		const card = model.Proxy.Configuration.Response.Json.extract(configuration, data)
		expect(card).toEqual(data.card)
		const token: model.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = model.Proxy.Configuration.Response.Json.process(configuration, token, data)
		expect(processed).toEqual({
			card: {
				expires: [2, 22],
				pan: "456789******7890",
				token: "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ",
			},
		})
	})
})
