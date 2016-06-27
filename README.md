# campspot-node

#### Instructions to run the app:

First, clone this git repository
```sh
git clone --depth=1 https://github.com/virtualadrian/campspot-node campspot-node
cd campspot-node
```


Restore packages and dependencies
```sh
npm install
```


How To Start The Application:
```sh
# requires gulp to be installed globally
npm i -g gulp

# run the api - this should open a browser with an API runner
gulp serve
```

Running 'gulp serve' will also open the API runner, and extra docs:

![API Runner](https://octodex.github.com/images/yaktocat.png)

There is also additional information about the approach in the following PDF:

[Approach Document and Explanation](http://github.com)

How To Execute Unit Tests
```sh
# run tests
gulp mocha

# run tests without linting
gulp mocha --nolint
```


Other gulp tasks:
```sh
# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp

# Lint code with ESLint
gulp lint
```

