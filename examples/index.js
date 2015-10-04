'use strict';

var sample = require( './../lib' ),
	x,
	out;

// Set seed:
sample.seed = 23;

// By default, sample uniformly with replacement:
x = [ 'a', 'b', 'c', 'd' ];
console.log( 'By default, sample uniformly with replacement:' );
out = sample( x, {
	size: 20
});
console.log( out );

// Sample with replacment with custom probabilities:
x = [ 'a', 'b', 'c', 'd' ];
console.log( 'Sample with replacment with custom probabilities:' );
out = sample( x, {
	probs: [ 0.1, 0.1, 0.2, 0.6 ],
	size: 10
});
console.log( out );

// Sample without replacment 
