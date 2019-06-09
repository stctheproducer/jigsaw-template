let mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
let build = require('./tasks/build.js');
require('laravel-mix-purgecss');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');
mix.webpackConfig({
	plugins: [
		build.jigsaw,
		build.browserSync(),
		build.watch([
			'source/**/*.md',
			'source/**/*.php',
			'source/**/*.scss',
			'!source/**/_tmp/*'
		])
	]
});

mix
	.js('source/_assets/js/main.js', 'js')
	.sass('source/_assets/sass/main.scss', 'css')
	.options({
		processCssUrls: false,
		postCss: [tailwindcss('./tailwind.config.js')]
	})
	.purgeCss({
		folders: ['source'],
		extensions: ['html', 'js', 'php', 'vue'],
		// Other options are passed through to Purgecss
		whitelistPatterns: [/language/, /hljs/]
	})
	.version();
