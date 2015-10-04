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

	it( 'should by default sample with replacement', function test() {

	});

	it( 'should negatively validate', function test() {

	});

});
