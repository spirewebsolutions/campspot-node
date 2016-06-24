# campspot-node

#### Instructions to run the app:

First, clone this git repository
```sh
git clone --depth=1 https://github.com/spirewebsolutions/campspot-node.git campspot-node
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
gulp serve
```

How To Execute Unit Tests
```sh
# run tests
gulp mocha

# get coverage for each file
gulp mocha --code-coverage-reporter text
```

Other gulp tasks:
```sh
# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp

# Lint code with ESLint
gulp lint
```

