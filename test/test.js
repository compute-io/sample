/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	sample = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-sample', function tests() {

	it( 'should export a function', function test() {
		expect( sample ).to.be.a( 'function' );
	});

	it( 'should throw an error if first argument is not array-like', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				sample( value );
			};
		}
	});

	it( 'should throw an error if provided a size larger than the array length when sampling without replacement', function test() {
		expect( badValue ).to.throw( TypeError );
		function badValue( ) {
			sample( [1,2,3,4,5,6], {
				'replace': false,
				'size': 7
			});
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		expect( badValue ).to.throw( TypeError );
		function badValue( ) {
			sample( [1,2,3,4,5,6], {
				'size': -1
			});
		}
	});

});
