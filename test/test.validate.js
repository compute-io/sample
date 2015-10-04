/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( validate( {}, values[ i ] ) instanceof TypeError );
		}
	});

	it( 'should return an error if provided a replace option which is not a boolean primitive', function test() {
		var values, err;
		values = [
			-2,
			1,
			0,
			'5',
			[],
			new Boolean( true ),
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'replace': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a size option which is not a non-negative integer', function test() {
		var values, err;
		values = [
			-2,
			0.2,
			'5',
			[],
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'size': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a probs option which is not a probability array', function test() {
		var values, err;
		values = [
			-2,
			0.2,
			'5',
			[],
			[1,2,3],
			[-0.5,0.4,0.8,0.3],
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'probs': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a seed option which is not a positive integer', function test() {
		var values, err;

		values = [
			'5',
			-2,
			2.3,
			new Boolean( true ),
			false,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'seed': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return null if all options are valid', function test() {
		var err;

		err = validate( {}, {
			'size': 20,
			'replace': false,
			'seed': 23,
			'probs': [ 0.25, 0.25, 0.5 ]
		});

		assert.isNull( err );

		err = validate( {}, {
			'beep': true, // misc options
			'boop': 'bop'
		});

		assert.isNull( err );
	});

});
