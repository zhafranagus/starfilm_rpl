/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

module.exports = {
	content: ['./views/**/*.{html,ejs}'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Nunito', ...fontFamily.serif],
				display: ['Poetsen One', ...fontFamily.serif],
			},
			
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['cupcake'],
	},
};
