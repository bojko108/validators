import { assert } from 'chai';
import { getValidator } from '../src/index';

describe('Tests for GIS Validators', () => {
  it('Test "maxDistance" validator', () => {
    const validator = getValidator({ name: 'maxDistance', validValue: 100 });
    let p1, p2;

    p1 = [0, 0];
    p2 = [0, 100];
    assert.isTrue(validator.validate(p1, p2));

    p1 = [0, 0];
    p2 = [0, 200];
    assert.isFalse(validator.validate(p1, p2));

    p1 = [325763.7233, 450358.7089];
    p2 = [325758.0054, 450367.7143];
    assert.isTrue(validator.validate(p1, p2));

    p1 = [325763.7233, 450358.7089];
    p2 = [325724.1967, 450516.2508];
    assert.isFalse(validator.validate(p1, p2));

    p1 = [42.680026, 23.336611];
    p2 = [42.678803, 23.338928];
    assert.isFalse(validator.validate(p1, p2, true));

    p1 = [42.678748, 23.338703];
    p2 = [42.678803, 23.338928];
    assert.isTrue(validator.validate(p1, p2, true));
  });

  it('Test "precision" validator', () => {
    const validator = getValidator({ name: 'precision', validValue: 10 });
    assert.isTrue(validator.validate({ coords: { accuracy: 4 } }));
    assert.isTrue(validator.validate({ accuracy: 10 }));
    assert.isFalse(validator.validate({ accuracy: 12 }));
  });
});
