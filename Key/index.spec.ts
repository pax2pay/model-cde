import { pax2pay } from "../index"

describe("pax2pay.cde.Key", () => {
	it("generate", async () => {
		expect(await pax2pay.cde.Key.generate()).toMatchObject({
			private: expect.stringMatching(/^MIIE[a-zA-z0-9+/=]{1600,1680}$/),
			public: expect.stringMatching(/^MIIB[a-zA-z0-9+/=]{370,390}$/),
		})
	})
})