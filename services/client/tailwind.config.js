/** @type {import('tailwindcss').Config} */

import tailwindSafelistGenerator from 'tailwind-safelist-generator'

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		'./safelist.txt'
	],
	theme: {
		extend: {},
	},
	plugins: [tailwindSafelistGenerator({
		path: 'safelist.txt',
		patterns: ['bg-{colors}'],
	})],
	important: true,
}

