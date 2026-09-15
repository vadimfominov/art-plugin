const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'blocks.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,  // ← Обрабатываем .js и .jsx
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'  // ← ДОБАВЛЯЕМ для JSX
						],
						plugins: [
							'@babel/plugin-syntax-jsx',
							'@babel/plugin-transform-react-jsx'  // ← ДОБАВЛЯЕМ
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'@wordpress/blocks': 'wp.blocks',
		'@wordpress/block-editor': 'wp.blockEditor',
		'@wordpress/components': 'wp.components',
		'@wordpress/element': 'wp.element',
		'@wordpress/i18n': 'wp.i18n',
		'@wordpress/data': 'wp.data',
		'@wordpress/hooks': 'wp.hooks',
		'@wordpress/date': 'wp.date',
		'@wordpress/api-fetch': 'wp.apiFetch',
	}
};