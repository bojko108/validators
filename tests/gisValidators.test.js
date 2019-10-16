import { assert } from 'chai';
import { getValidator } from '../src/index';

describe('Tests for GIS Validators', () => {
  it('Test "maxDistance" validator', () => {
    let validator = getValidator({ maxDistance: 100 });
    let p1, p2;

    p1 = [0, 0];
    p2 = [0, 100];
    assert.isTrue(validator(p1, p2));

    p1 = [0, 0];
    p2 = [0, 200];
    assert.isFalse(validator(p1, p2));

    p1 = [325763.7233, 450358.7089];
    p2 = [325758.0054, 450367.7143];
    assert.isTrue(validator(p1, p2));

    p1 = [325763.7233, 450358.7089];
    p2 = [325724.1967, 450516.2508];
    assert.isFalse(validator(p1, p2));

    validator = getValidator({ maxDistance: 100 });
    p1 = [42.680026, 23.336611];
    p2 = [42.678803, 23.338928];
    assert.isFalse(validator(p1, p2, true));

    validator = getValidator({ maxDistance: 100 });
    p1 = [42.678748, 23.338703];
    p2 = [42.678803, 23.338928];
    assert.isTrue(validator(p1, p2, true));
  });
});
