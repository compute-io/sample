'use strict';

var sample = require( './../lib' ),
	x,
	out;

// Set seed:
sample.seed = 13;

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
x = [ 'a', 'b', 'c', 'd' ];
console.log( 'Sample without replacment:' );
out = sample( x, {
	size: 3,
	replace: false
});
console.log( out );

// Sample without replacment when (initial) probabilities are non-uniform
x = [1,2,3,4,5,6];
console.log( 'Sample without replacment (with custom probabilities):' );
out = sample( x, {
	probs: [0.1,0.1,0.1,0.1,0.1,0.5],
	size: 3,
	replace: false
});
console.log( out );
