export const configurations = {
	expires: {
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
}
