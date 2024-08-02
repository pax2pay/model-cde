import { Xml } from "./../index"

export const configurations = {
	expires: {
		type: "text",
		url: "asd123",
		card: {
			pan: "cardNumber",
			csc: "csc",
			expires: "expires",
		},
		set: [
			{
				find: "cardNumber",
				value: "$(masked)",
			},
			"csc",
			{
				find: "token",
				value: "$(token)",
			},
		],
	},
} as Record<string, Xml>
