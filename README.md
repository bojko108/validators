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

const validator1 = getValidator({ name: 'precision' validValue: 10 });
validator1.validate({ coords: { accuracy: 4 } }); // => true

const validator2 = getValidator({ name: 'between', validValue: [1, 4] });
validator2.validate(1); // => true
```

### Add a custom validator

```js
import { addValidator } from 'validators';

const validator = addValidator({
  name: 'exact',
  validValue: 1,
  validate: value => {
    return value === validValue;
  }
});
validator.validate(value);
```

## Validators

Here is a list of all predefined validators. You can use them by calling `getValidator({ name: <validatorName> })`. All custom validators added by `addValidator()` will be available in `getValidator()`. An error is thrown if a validator already exists and you try to redefine it with `addValidator()`.

### Validators

- `isDefined` - returns `true` if the value is defined. Returns `false` for `undefined` and `null`.
- `isString` - returns `true` if the value is `string`.
- `isArray` - returns `true` if the value type is `array`.
- `isNumber` - returns `true` if the value type is `number`.
- `isInteger` - returns `true` if the value is an integer `number`.
- `isBoolean` - returns `true` if the value type is `boolean`.
- `isFunction` - returns `true` if the value type is `function`.
- `matches` - validates **String**. Returns `true` if the tested value matches a regular expression.

```js
import { matches } from 'validators/src/validators.js';

// any special characters in the regular expression must be escaped when passed to "matches" method
matches('^(DJ|OT)\\d{6,7}$')('DJ123456'); // true
```

- `min` - validates length of **Array** or **String**. Returns `true` if the length is greater than or equal to the valid value.
- `max` - validates length of **Array** or **String**. Returns `true` if the length is less than or equal to the valid value.
- `contain` - validates **Array** or **String**. Returns `true` if the valid value contains tested value. Opposite of `notContain`.
- `notContain` - validates **Array** or **String**. Returns `true` if the valid value does not contain tested value. Opposite of `contain`.
- `like` - validates **String**. Returns `true` if the tested value is equal to the valid value. Opposite of `notLike`.
- `notLike` - validates **String**. Returns `true` if the tested value is not equal to the valid value. Opposite of `like`.
- `equal` - validates **Number**. Returns `true` if the tested value is equal to the valid value. Opposite of `notEqual`.
- `notEqual` - validates **String**. Returns `true` if the tested value is not equal to the valid value. Opposite of `equal`.
- `between` - validates **Number**. Returns `true` if the tested value is in the range of the valid value. Opposite of `notBetween`.
- `notBetween` - validates strings. Returns `true` if the tested value is not in the range of the valid value. Opposite of `between`.
- `inValues` - validates **Number** or **String**. Returns `true` if the tested value is present in valid value array. Opposite of `notInValues`.
- `notInValues` - validates **Number** or **String**. Returns `true` if the tested value is not present in valid value array. Opposite of `inValues`.
- `greaterThan` - validates **Number**. Returns `true` if the tested value is greater than the valid value. Opposite of `lessThan`.
- `greaterThanOrEqual` - validates **Number**. Returns `true` if the tested value is greater than or equal to the valid value.
- `lessThan` - validates **Number**. Returns `true` if the tested value is less than the valid value. Opposite of `greaterThan`.
- `lessThanOrEqual` - validates **Number**. Returns `true` if the tested value is less than or equal to the valid value.

### Gis Validators

- `precision` - validates the accuracy of a [Location](https://docs.expo.io/versions/latest/sdk/location/#type-location) object.
- `maxDistance` - calculates distance between two points and returns `true` if it's less than or equal to the valid value. The distance is calculated using eucledian formula. If you use geographic coordinates, you can pass a third parameter to tell the function that the distance should be calculated in meters instead of decimal degrees:

```js
import { maxDistance } from 'validators/src/gisValidators.js';

const validValue = 100; // in meters
const p1 = [42.678748, 23.338703]; // in decimal degrees
const p2 = [42.678803, 23.338928]; // in decimal degrees

// pass true so the distance can be calculated in meters before compared to the valid value
maxDistance(validValue)(p1, p2, true);
```

- `codeInDomain` - validates **Number** or **String**. Returns `true` if the tested value is present in the domain as a value.
- `valueInDomain` - validates **Number** or **String**. Returns `true` if the tested value is present in the domain as a code.

## Tests

Check [tests](https://github.com/bojko108/validators/tree/master/tests) for more examples.

## License

transformations is [MIT](https://github.com/bojko108/validators/tree/master/LICENSE) License @ bojko108
