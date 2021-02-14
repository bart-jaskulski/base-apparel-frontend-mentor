const path = require( 'path' );
const postcssImport = require( 'postcss-import' )
const postcssNormalize = require( 'postcss-normalize' )
const postcssPresetEnv = require( 'postcss-preset-env' )
const postcssCombineMediaQuery = require( 'postcss-combine-media-query' )
const postcssPxToRem = require( 'postcss-pxtorem' )

module.exports = {
	plugins: [
		postcssImport(
			postcssNormalize().postcssImport( {
				path: [ path.resolve( __dirname, 'src/css' ) ]
			} )
		),
		postcssPresetEnv( {
			importFrom: path.resolve( __dirname, 'src/css/_custom-media.css' ),
			autoprefixer: {
				'grid': false,
			},
			features: {
				"custom-media-queries": true,
				"custom-properties": true,
				"nesting-rules": true
			},
		} ),
		postcssCombineMediaQuery(),
		postcssPxToRem( {
			rootValue: 16
		} ),
	]
}
