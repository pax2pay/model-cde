import { Json } from "../index"
export const configurations = {
	monthYear: {
		type: "json",
		url: "asd123",
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
		type: "json",
		url: "asd123",
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
		type: "json",
		url: "asd123",
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
		type: "json",
		url: "asd123",
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
		type: "json",
		url: "asd123",
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
		type: "json",
		url: "asd123",
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
} as Record<string, Json>
