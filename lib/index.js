'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' );
var isPositiveInteger = require( 'validate.io-positive-integer' );
var floor = require( 'math-floor' );
var lcg = require( 'compute-lcg' );
var validate = require( './validate.js' );


// UNIFORM GENERATOR //

var RAND = lcg();


// SAMPLE //

/**
* FUNCTION sample( x[, opts] )
* 	Samples elements from an array.
*
* @param {Array} x - array to sample elements from
* @param {Object} [opts] - function options
* @param {Number} [opts.size=x.length] - sample size
* @param {Array} [opts.probs=[1/x.length,...,1/x.length]] - element probabilities
* @param {Boolean} [opts.replace=true] - boolean indicating if to sample with replacement
* @param {Number} [opts.seed] - integer-valued seed
* @returns {Array} new array with elements sampled from x
*/
function sample( x, options ) {
	var opts = {};
	var err;
	var size;
	var nElems = x.length;
	var aliasArr;
	var probArr;
	var probs;
	var psum;
	var small = [];
	var large = [];
	var l, g;
	var xcopy;
	var pos;
	var rand;
	var ret;
	var u;
	var i, j, k;
	var tmp;

	if ( !isArrayLike( x ) ) {
		throw new TypeError( 'invalid input argument. First argument must be an array-like object. Value: `' + x + '`.' );
	}

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( opts.seed ) {
		rand = lcg( opts.seed );
	} else {
		rand = RAND;
	}
	if ( opts.size ) {
		if ( opts.replace === false && opts.size > x.length ) {
			throw new TypeError( 'invalid input option. Size option must be smaller or equal to the length of `x` when repeat option is set to false. Value: `' + opts.size + '`.' );
		}
		size = opts.size;
	} else {
		size = x.length;
	}
	if ( opts.probs ) {
		if ( opts.replace !== false ) {
			/* Implementation of Vose's alias method. Adapted from
			discussion on http://keithschwarz.com/darts-dice-coins/.
			Reference:
				Vose, M. D. (1991). A linear algorithm for generating
				random numbers with a given distribution.
				IEEE Transactions on Software Engineering,
				17(9), 972–975. doi:10.1109/32.92917
			*/
			probs = [];
			for ( i = 0; i < nElems; i++ ) {
				probs[ i ] = opts.probs[ i ];
				probs[ i ] *= nElems;
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
				pos = floor( nElems * rand() );
				if ( rand() < probArr[ pos ] ) {
					ret[ i ] = x[ pos ];
				} else {
					ret[ i ] = x[ aliasArr[ pos ] ];
				}
			}
			return ret;
		} else {
			probs = [];
			for ( i = 0; i < nElems; i++ ) {
				probs[ i ] = opts.probs[ i ];
			}
			ret = [];
			for ( i = 0; i < size; i++ ) {
				u = rand();
				psum = 0;
				for ( j = 0; j < nElems; j++ ) {
					psum += probs[ j ];
					if ( u < psum ) {
						break;
					}
				}
				for ( k = 0; k < nElems; k++ ) {
					if ( k === j ) {
						continue;
					}
					probs[ k ] = probs[ k ] / ( 1 - probs[ j ] );
				}
				probs[ j ] = 0;
				ret.push( x[ j ] );
			}
			return ret;
		}
	}
	// CASE 2: No Probs supplied, all elements equally likely
	if ( opts.replace !== false ) {
		ret = [];
		for ( i = 0; i < size; i++ ) {
			pos = floor( nElems * rand() );
			ret[ i ] = x[ pos ];
		}
	} else {
		if ( size === nElems ) {
			return x;
		}
		/*
		Implementation of Knuth's version of Fisher–Yates shuffle.
		Reference:
			Knuth, D. E. (1973). The Art of Computer Programming:
			Seminumerical Algorithms. Reading MA. doi:10.2307/2283757
		*/
		xcopy = x.slice();
		for ( j = nElems - 1; j > 0; j-- ) {
			u = rand();
			k = floor( j * u );
			tmp = xcopy[ j ];
			xcopy[ j ] = xcopy[ k ];
			xcopy[ k ] = tmp;
		}
		ret = xcopy.slice( 0, size );
	}
	return ret;
} // end FUNCTION sample()


// EXPORTS //

module.exports = sample;

Object.defineProperty( module.exports, 'seed', {
	set: function ( newVal ) {
		if ( !isPositiveInteger( newVal ) ) {
			throw new TypeError( 'invalid value. Seed property must be a positive integer. Option: `' + newVal + '`.' );
		}
		RAND = lcg( newVal );
	}
});
