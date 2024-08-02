import { Plain } from "./../index"

export const configurations = {
	expires: {
		type: "plain",
		entryDelimiter: "&",
		equalsDelimiter: "=",
		url: "asd123",
		card: {
			pan: "cardnumber",
			csc: "csc",
			expires: "expiry",
		},
		set: [
			{
				find: "cardnumber",
				value: "$(masked)",
			},
			"csc",
			{
				find: "token",
				value: "$(token)",
			},
			{
				find: "asd",
				value: "$(token)",
			},
		],
	},
} as Record<string, Plain>
