import js from "@eslint/js"
import prettierRecommended from "eslint-plugin-prettier/recommended"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

export default tseslint.config(
	{
		ignores: ["node_modules/**", "dist/**", "transpiled/**", "**/*.js", "Card/Expires/index.ts"],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	prettierRecommended,
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			curly: ["error", "all"],
			// Prettier formatting rules
			"prettier/prettier": [
				"warn",
				{
					semi: false,
					singleQuote: false,
					tabWidth: 2,
					trailingComma: "es5",
				},
			],
			// TypeScript rules
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					args: "none",
					varsIgnorePattern: "h",
				},
			],
			"@typescript-eslint/explicit-module-boundary-types": "off",
			// JS rules
			"prefer-const": "warn",
			"no-case-declarations": "off",
			"no-inner-declarations": "off",
			// Import sorting
			"sort-imports": "off",
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						[
							"@stencil/core",
							"cryptly",
							"flagly",
							"gracely",
							"isoly",
							"paramly",
							"selectively",
							"langly",
							"tidily",
							"uply",
							"authly",
							"persistly",
							"servly",
							"servly-azure",
							"smoothly",
							"^\\u0000",
							"^@?\\w",
							"^",
							"^\\.",
						],
					],
				},
			],
		},
	}
)
