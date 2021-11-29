import * as model from "../../../../../index"

export const configurations: model.Proxy.Configuration.Response.Json[] = [
	{
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
	},
	{
		card: {
			pan: "card.pan",
			csc: "card.csc",
			expires: "card.expires",
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
	},
]
