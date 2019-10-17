# Validators

Set of custom validation functions. You can read the documentation here: [https://bojko108.github.io/validators/](https://bojko108.github.io/validators/)

## How to install

```
yarn add bojko108/validators
```

## How to use

### Get a validator

```js
import { getValidator } from 'validators';

const validator1 = getValidator({ precision: 10 });
validator1({ coords: { accuracy: 4 } }); // => true

const validator2 = getValidator({ between: [1, 4] });
validator2(1); // => true
```

### Add a custom validator

```js
import { addValidator } from 'validators';

const validator = addValidator('test', value => {
  // test the value and return true or false
});
validator(value);
```

## Tests

Check [tests](https://github.com/bojko108/validators/tree/master/tests) for more examples.

## License

transformations is [MIT](https://github.com/bojko108/validators/tree/master/LICENSE) License @ bojko108
