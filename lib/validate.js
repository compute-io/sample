'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive'),
	isObject = require( 'validate.io-object' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isProbabilityArray = require( 'validate.io-probability-array' );


// VALIDATE //

/**
* FUNCTION validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.size] - sample size
* @param {Array} [options.probs] - element probabilities
* @param {Boolean} [options.replace] - boolean indicating if to sample with replacement
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'sample()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'size' ) ) {
		opts.size = options.size;
		if ( !isNonNegativeInteger( opts.size ) ) {
			return new TypeError( 'sample()::invalid option. Size option must be a non-negeative integer. Option: `' + opts.size + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'probs' ) ) {
		opts.probs = options.probs;
		if ( !isProbabilityArray( opts.probs ) ) {
			return new TypeError( 'sample()::invalid option. Probs option must be an array with elements summing to one. Option: `' + opts.probs + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'replace' ) ) {
		opts.replace = options.replace;
		if ( !isBoolean( opts.replace ) ) {
			return new TypeError( 'sample()::invalid option. Replace option must be a boolean primitive. Option: `' + opts.replace + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()

// EXPORTS //

module.exports = validate;
