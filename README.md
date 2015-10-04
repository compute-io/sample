Sample
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Sample elements from an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays).


## Installation

``` bash
$ npm install compute-sample
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var sample = require( 'compute-sample' );
```

#### sample( x[, opts] )

Sample elements from an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays). By default, elements are being drawing with replacement from `x` to form an output array of the same length as `x`.

``` javascript
var out;

// Set seed
sample.seed = 2;

out = sample( [ 'a', 'b', 'c' ] );
// returns [ 'a', 'a', 'c' ]

out = sample( [ 3, 6, 9 ] );
// returns [ 3, 3, 6 ]

```

The function accepts the following `options`:

*	__size__: sample size. Default: `x.length`.
*	__probs__: array of element probabilities. Default: `[1/x.length,...,1/x.length]`.
*	__replace__: boolean indicating if to sample with replacement from elements of `x`. Default: `true`.
*	__seed__: positive integer used as a seed to initialize the generator. If not supplied, uniformly distributed random numbers are generated via an underlying generator seedable by setting the `seed` property of the exported function.

To generate a sample of a different size than the input array, set the `size` option.

```javascript
var out;

out = sample( [ 3, 6, 9 ], {
	'size': 10
});
// returns [ 6, 3, 9, 9, 9, 6, 9, 6, 9, 3 ]

out = sample( [ 0, 1 ], {
	'size': 20
});
// returns [ 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0 ]

```

To draw a sample *without* replacement, set the `replace` option to `false`. Notice that in this case, the `size` option cannot be set to an integer larger than the number of elements in `x`.

```javascript
var out;

out = sample( [1,2,3,4,5,6], {
	'replace': false,
	'size': 3
});
// returns [ 6, 1, 5 ]

out = sample( [ 0, 1 ], {
	'replace': false
});
// returns [ 0, 1 ]

```

Use the `probs` option to supply an array of probabilities in cases where the elements in `x` are not equally likely to be drawn. The option expects an array of non-negative values which sum to one. When sampling *without* replacement from `x`, `probs` denotes the initial element probabilities which are then updated after each draw.

```javascript
var out,
	x;

x = [ 1, 2, 3, 4, 5, 6 ];
out = sample( x, {
	'probs': [ 0.1, 0.1, 0.1, 0.1, 0.1, 0.5 ]
});
// returns [ 5, 6, 6, 5, 6, 4 ]

x = [ 1, 2, 3, 4, 5, 6 ];
out = sample( x, {
	'probs': [ 0.1, 0.1, 0.1, 0.1, 0.1, 0.5 ],
	'size': 3,
	'replace': false
});
// returns [ 6, 4, 1 ]

```

To be able to reproduce the generated samples, set the `seed` option to a positive integer.

``` javascript
var out;

out = sample( [1,2,3,4,5], {
	'seed': 2
});
// returns [ 2, 2, 5, 2, 1 ]

out = sample( [1,2,3,4,5], {
    'seed': 2
});
// returns [ 2, 2, 5, 2, 1 ]

```

If no `seed` option is supplied, each function call uses a common underlying uniform number generator. A positive-integer seed for this underlying generator can be supplied by setting the seed property of the exported function.

```javascript
var out;

sample.seed = 11;

out = sample( [ 'a', 'b', 'c' ] );
// returns [ 'a', 'b', 'c' ]

out = sample( [ 3, 6, 9 ] );
// returns [ 6, 9, 6 ]

sample.seed = 11;

out = sample( [ 'a', 'b', 'c' ] );
// returns [ 'a', 'b', 'c' ]

out = sample( [ 3, 6, 9 ] );
// returns [ 6, 9, 6 ]

```


## Examples

``` javascript
var sample = require( 'compute-sample' ),
	x,
	out;

// Set seed:
sample.seed = 13;

// By default, sample uniformly with replacement:
x = [ 'a', 'b', 'c', 'd' ];
out = sample( x, {
	size: 20
});

// Sample with replacment with custom probabilities:
x = [ 'a', 'b', 'c', 'd' ];
out = sample( x, {
	probs: [ 0.1, 0.1, 0.2, 0.6 ],
	size: 10
});

// Sample without replacment
x = [ 'a', 'b', 'c', 'd' ];
out = sample( x, {
	size: 3,
	replace: false
});

// Sample without replacment when (initial) probabilities are non-uniform
x = [1,2,3,4,5,6];
out = sample( x, {
	probs: [ 0.1, 0.1, 0.1, 0.1, 0.1, 0.5 ],
	size: 3,
	replace: false
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-sample.svg
[npm-url]: https://npmjs.org/package/distributions-sample

[travis-image]: http://img.shields.io/travis/compute-io/sample/master.svg
[travis-url]: https://travis-ci.org/compute-io/sample

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/sample/master.svg
[codecov-url]: https://codecov.io/github/compute-io/sample?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/sample.svg
[dependencies-url]: https://david-dm.org/compute-io/sample

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/sample.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/sample

[github-issues-image]:  http://img.shields.io/github/issues/compute-io/sample.svg
[github-issues-url]: https://github.com/compute-io/sample/issues
