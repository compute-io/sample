'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	validate = require( './validate.js' );


/** FUNCTION sample( x[, opts])
* Samples elements from an array.
*
* @param {Array} x - array to sample elements from
* @param {Object} opts - function options
* @param {Number} [opts.size=x.length] - sample size
* @param {Array} [opts.probs=[1/x.length,...,1/x.length]] - element probabilities
* @param {Boolean} [opts.replace=true] - boolean indicating if to sample with replacement
* @returns {Array} new array with elements sampled from x
**/
function sample( x, options ){

	if ( !isArrayLike( x ) ) {
		throw new TypeError( 'sample()::invalid input argument. First argument must be an array-like object. Value: `' + x + '`.' );
	}

	var opts = {},
		err,
		size,
		nElems = x.length,
		aliasArr,
		probArr,
		probs,
		small = [],
		large = [],
		l, g,
		xcopy,
		side,
		ret,
		i;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( opts.size ) {
		if ( opts.replace === false && opts.size > x.length ) {
			throw new TypeError( 'sample()::invalid input option. Size option must be smaller or equal to the length of `x` when repeat option is set to false. Value: `' + opts.size + '`.' );
		}
		size = opts.size;
	} else {
		size = x.length;
	}
	if ( opts.probs ) {
		probs = [];
		for ( i = 0; i < size; i++ ) {
			probs[ i ] = opts.probs[ i ];
			probs[ i ] *= size;
			if ( probs[ i ] < 1 ) {
				small.push( i );
			} else {
				large.push( i );
			}
		}
		aliasArr = new Array( nElems );
		probArr = new Array( nElems );
		while ( small.length !== 0 && large.length !== 0 ) {
			l = small.shift();
			g = large.shift();
			probArr[ l ] = probs[ l ];
			aliasArr[ l ] = g;
			probs[ g ] = probs[ g ] + probs[ l ] - 1;
			if ( probs[ g ] < 1 ) {
				small.push( g );
			} else {
				large.push( g );
			}
		}
		while ( large.length !== 0 ) {
			g = large.shift();
			probArr[ g ] = 1;
		}
		while ( small.length !== 0 ) {
			l = small.shift();
			probArr[ l ] = 1;
		}

		ret = [];
		for ( i = 0; i < size; i++ ) {
			side = Math.floor( nElems * Math.random() );
			if ( Math.random() > 1 - probArr[ i ] ) {
				ret[ i ] = x[ side ];
			} else {
				ret[ i ] = x[ aliasArr[ side ] ];
			}
		}
		return ret;
	}
	// CASE 2: No Probs supplied, all elements equally likely
	if ( opts.replace !== false ) {
		ret = [];
		for ( i = 0; i < size; i++ ) {
			side = Math.floor( nElems * Math.random() );
			ret[ i ] = x[ side ];
		}
	} else {
		xcopy = x.slice();
		ret = [];
		for ( i = 0; i < size; i++ ) {
			side = Math.floor( xcopy.length * Math.random() );
			ret[ i ] = xcopy.splice( side, 1 );
		}
	}
	return ret;
} // end FUNCTION sample()


// EXPORTS //

module.exports = sample;
