export const dataset = {
	cardModelFormat: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		},
	},
	cardExpiryListString: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: ["2", "22"],
		},
	},
	cardExpiryStringDash: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "2-22",
		},
	},
	cardExpiryStringDot: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "2.22",
		},
	},
	cardExpiryStringSlash: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "2/22",
		},
	},
	cardExpiryStringConcat: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "222",
		},
	},
	cardExpiryListStringFullYear: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: ["2", "2022"],
		},
	},
	cardExpiryListFullYear: {
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 2022],
		},
	},
	cardNoExpiry: {
		card: {
			pan: "1234123412341234",
			csc: "123",
		},
	},
	cardModulrNames: {
		pan: "4567890123457890",
		cvv2: "987",
	},
}
