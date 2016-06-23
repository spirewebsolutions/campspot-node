# campspot-node

#### Instructions to run the app:

First Install Dependencies:
```sh
npm install
```

How To Start The Application:
```sh
# requires gulp to be installed globally
npm i -g gulp
gulp serve
```

How To Execut Unit Tests
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

