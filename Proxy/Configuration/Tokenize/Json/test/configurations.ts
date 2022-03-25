export const configurations = {
	monthYear: {
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
	expires: {
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
	noExpires: {
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
			{
				find: "card.token",
				value: "$(token)",
			},
		],
	},
	encrypted: {
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
				value: "$(encrypted)",
			},
		],
	},
	maskedAndEncrypted: {
		card: {
			pan: "card.pan",
			csc: "card.csc",
			month: "card.expires[0]",
			year: "card.expires[1]",
		},
		set: [
			{
				find: "card.pan",
				value: "$(maskedAndEncrypted)",
			},
			"card.csc",
		],
	},
	modulrToken: {
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
}
