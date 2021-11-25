export const dataset: any[] = [
	{
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		},
	},
	{
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: ["2", "22"],
		},
	},
	{
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "2-22",
		},
	},
	{
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "2.22",
		},
	},
	{
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "2/22",
		},
	},
	{
		card: {
			pan: "4567890123457890",
			csc: "987",
			expires: "222",
		},
	},
]
