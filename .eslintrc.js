module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"array-bracket-newline": [
			"error",
			"consistent"
		],
		"array-bracket-spacing": [
			"error",
			"never"
		],
		"block-spacing": [
			"error",
			"always"
		],
		"comma-dangle": [
			"error"
		],
		"indent": [
			"error",
			"tab"
		],
		"no-async-promise-executor": [
			"warn"
		],
		"no-console": [
			"off"
		],
		"no-shadow-restricted-names": [
			"error"
		],
		"no-var": [
			"error"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"prefer-destructuring": [
			"error",
			{
				"array": true,
				"object": true
			},
			{
				"enforceForRenamedProperties": false
			}
		],
		"quotes": [
			"error",
			"double"
		],
		"require-atomic-updates": [
			"error"
		],
		"semi": [
			"error",
			"always"
		],
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}
		]
	}
};
