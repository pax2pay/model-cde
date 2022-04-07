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

export const jsons = [
	{
		card: {
			pan: "pan",
			csc: "csc",
			month: "expires[0]",
			year: "expires[1]",
		},
		set: [
			{
				find: "pan",
				value: "$(masked)",
			},
			"csc",
			{
				find: "token",
				value: "$(token)",
			},
		],
	},
	{
		card: {
			pan: "pan",
			csc: "csc",
			month: "expires[0]",
			year: "expires[1]",
		},
		set: [
			{
				find: "pan",
				value: "$(masked)",
			},
			"csc",
			{
				find: "token",
				value: "$(token)",
			},
		],
	},
	{
		card: {
			pan: "card.cardNumber",
			csc: "card.cvv",
			month: "card.expireMonth",
			year: "card.expireYear",
		},
		set: [
			{
				find: "card.cardNumber",
				value: "$(masked)",
			},
			{ find: "card.cvv", value: "***" },
			{
				find: "token",
				value: "$(token)",
			},
		],
	},
	{
		card: {
			pan: "pan",
			csc: "csc",
			month: "expires[0]",
			year: "expires[1]",
		},
		set: [
			{
				find: "masked",
				value: "$(masked)",
			},
			"csc",
			"pan",
			{
				find: "token",
				value: "$(token)",
			},
		],
	},
	{
		card: {
			pan: "body.cardNumber",
			csc: "body.cvv",
			month: "body.expiryDateMonth",
			year: "body.expiryDateYear",
		},
		set: [
			{
				find: "cardNumber",
				value: "$(masked)",
			},
			"cvv",
			{
				find: "token",
				value: "$(token)",
			},
		],
	},
	{
		card: {
			pan: "pan",
			csc: "cvv2",
		},
		set: [
			{
				find: "pan",
				value: "$(masked)",
			},
			"cvv2",
			{
				find: "token",
				value: "$(token)",
			},
			{
				find: "encrypted",
				value: "$(encrypted)",
			},
		],
	},
	{
		card: {
			pan: "pan",
			csc: "cvv2",
		},
		set: [
			{
				find: "pan",
				value: "$(token)",
			},
			{
				find: "cvv2",
				value: "***",
			},
		],
	},
	{
		card: {
			pan: "pan",
			csc: "cvv2",
		},
		set: [
			{
				find: "pan",
				value: "$(token)/pan",
			},
			{
				find: "cvv2",
				value: "$(token)/csc",
			},
		],
	},
	{
		card: {
			pan: "card.pan",
			csc: "card.csc",
		},
		set: [
			{
				find: "card.pan",
				value: "$(masked)",
			},
			"card.csc",
		],
	},
]
