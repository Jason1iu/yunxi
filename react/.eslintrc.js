module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:@typescript-eslint/recommended",
		"eslint:recommended",
		"plugin:react/recommended"
	],
	plugins: [
		"@typescript-eslint",
		"react"
	],
	env: {
		browser: true,
		es6: true,
		node: true,
		jquery: true
	},
	settings: {             //自动发现React的版本，从而进行规范react代码
		react: {
			pragma: "React",
			version: "detect"
		}
	},
	/**
	 * "off" or 0 - turn the rule off
	 * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
	 * "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
	 */
	rules: {
		"@typescript-eslint/no-var-requires": 0,
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/camelcase": 0,
		"@typescript-eslint/no-inferrable-types": 0,
		"@typescript-eslint/member-delimiter-style": 0,
		"@typescript-eslint/no-use-before-define": 0,
		"@typescript-eslint/interface-name-prefix": 0,
		"@typescript-eslint/type-annotation-spacing": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false, "argsIgnorePattern": "^_" }],
		"no-mixed-spaces-and-tabs": 0,
		"react/display-name": 0,
		"react/no-find-dom-node": 0,
		"react/prop-types": 0,
		"no-useless-escape": 0,
		"no-non-null-assertion": 0,
		"no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false, "argsIgnorePattern": "^_" }],
	},
	globals: {
		"JiaGrid": true,
		"document": true,
		"window": true,
		"fetch": true,
		"Event": true,
		"jquery": true,
		"window.contextPath": true,
		"REACT_APP_SERVICE_URI": true,
	}
}