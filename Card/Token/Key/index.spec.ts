import { pax2pay } from "../../../index"

const key = {
	public:
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1WgPyVvGPQ2LDFpopTtDfqDkS09uNF28u5oQK4KpeOvsWtsRM0vBEU5/BbzcniB1RmoptrM/ueyrnCEKYtSLUkPpRXg7GLD8+uThjL4ueCNJICW8SM7zl8SR6JCHizoMwY4Et2ZpjoMmhoj5CjM8EyJMPskANOdsOTlqjsyx8wy8HwxWT7DwNY3eNDMNBTX5OTa2tCOp9Uw9QmuOu5WHgrb7W6yhmc66qFJzXq/sSL5wQ9J7LWsXPqzXeSGbRPdEssEOhEA5JRigVkY9ZzrsZxiyRc/iE1R4tE8oYllyzp4wr1kfFIrFyupW9YFSREroFRRJWJcJfVxBHzyu9ND90QIDAQAB",
	private:
		"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVaA/JW8Y9DYsMWmilO0N+oORLT240Xby7mhArgql46+xa2xEzS8ERTn8FvNyeIHVGaim2sz+57KucIQpi1ItSQ+lFeDsYsPz65OGMvi54I0kgJbxIzvOXxJHokIeLOgzBjgS3ZmmOgyaGiPkKMzwTIkw+yQA052w5OWqOzLHzDLwfDFZPsPA1jd40Mw0FNfk5Nra0I6n1TD1Ca467lYeCtvtbrKGZzrqoUnNer+xIvnBD0nstaxc+rNd5IZtE90SywQ6EQDklGKBWRj1nOuxnGLJFz+ITVHi0TyhiWXLOnjCvWR8UisXK6lb1gVJESugVFElYlwl9XEEfPK700P3RAgMBAAECggEAVXI/k+ePpcVk7dLLQJFMkoiYMAFDRmtb1J+4prs/4P9RmQVKy0ejK6tK18DJcvTbEBEU16bItsho4/AkyPKCQDOZ1Ktxug6vlEONfb1uPMMgFeOWEm7ugM9/fmdUJi5diigzgj1auWmQxOBWGrvt61lZvu/bCdO5dOYk4L1b6MzuznJtpEb8j4uSdrjv86pLOMvRbDsA9LUQnM7C8lUS5xP3u14dzmIdC5+RHwbbdgu3u2e7h9a+vygPyQ0hfy9R+zJqV9vuPgCsGV4Fa8WqzDjNDDOmxGnAJLV1B9WsRDIU48V95X5MD8T2ZZQMRj30ThAPBki8tmpIhLtKjjST0wKBgQDwAwjBWP8k3ILkvFWPho3+uzSBxZgpRpCe07qcKmFV7myfqfhUcm8FyB6j4JFof2hkSeUIoQmHtbCqhPAnjajPJydsgbYGSdW8OfuYLGRirEYEPSCbPOHCpQXmyxk4TiULRhOS26OtM70hXtsOtJ2XBYPAuZrB+LX0mdI/AkU3fwKBgQDjn1JG7xGq0QFQ6FeRsYBnnHiXtb8pzJm0RvEk0ak2ql1OVwULY6MMI95Ibk9ZHrQXT7sqhk9rMf5TzQJmFr2XjeOO0T7UEFbThmuLX7HsYzRD/LUU74GHpDgLYRbGUKp2INDPzna91yQYfvZwfn/fhrXBqla7OMcl0H6G2/byrwKBgQCLUKePW3JWWi0cSnm7otXfS5jxztlA9DXUC4BhT3RKZeflUcrUccwh5gRrCVo99t6IgCASvy8B+CPBBwNDYkXfYJHQuQYIZmlLJbj1nqbyY58MrNK1aUR+MD3ZtoBAH5P/FEEeWKGMUuDwctfilFJ5K/lLMDE1cIFlprfUXSQCTwKBgBeTdO4r7OSIaV578jYA8I/KwSLVjEtECdeGUYvCu4gR9UAb+0XGuCiVvnw6ELXmXDjd5UDuUGOF9hWv8kOor1J3O86bFarZVmTqU1FIRCF71PoFvqvAcuYduEBVegpoaH97vqUHeX0IP5DZ9aSJNa1tQn4gqoMRym68PZ6yQc25AoGAJ6X+YpLB/I2k+H+NFRkaFHUzobcx3IQ/GEchlaG4syVqA4xzaRsOW5EgOkRlw2qyXKDtGqJ6HSwHyEuUx2ipgEHNYPHTfKLo098h8AFFB0pk8pHIy0MA/nobnI5a/vyhMrnvjcUMWRHwLW6fNSjtbykS5ce9A5YaCQKVUHRmmiQ=",
}

describe("pax2pay.cde.Key", () => {
	it("generate", async () =>
		expect(await pax2pay.cde.Key.generate()).toMatchObject({
			private: expect.stringMatching(/^MIIE[a-zA-z0-9+/=]{1600,1680}$/),
			public: expect.stringMatching(/^MIIB[a-zA-z0-9+/=]{370,390}$/),
		}))
	it("getName", async () => expect(await pax2pay.cde.Key.getName(key)).toMatchInlineSnapshot(`"RSAAWgP"`))

	it("test actual key names", async () => {
		expect(await pax2pay.cde.Key.getName({ public: pax2pay.cde.PublicKeys.test })).toEqual(
			pax2pay.cde.PublicKeys.testName
		)
		expect(await pax2pay.cde.Key.getName({ public: pax2pay.cde.PublicKeys.prod })).toEqual(
			pax2pay.cde.PublicKeys.prodName
		)
	})
})
