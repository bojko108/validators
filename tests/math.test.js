import { assert } from 'chai';
import { toDegrees, toRadians, metersToDegrees, degreesToMeters, getDistance } from '../src/math';

describe('Tests for Math functions', () => {
  it('Test "toDegrees"', () => {
    let radians = 0;
    let degrees = toDegrees(radians);
    assert.equal(degrees, 0);

    radians = Math.PI / 2;
    degrees = toDegrees(radians);
    assert.equal(degrees, 90);

    radians = Math.PI;
    degrees = toDegrees(radians);
    assert.equal(degrees, 180);

    radians = 2 * Math.PI;
    degrees = toDegrees(radians);
    assert.equal(degrees, 360);
  });

  it('Test "toRadians"', () => {
    let degrees = 0;
    let radians = toRadians(degrees);
    assert.equal(radians, 0);

    degrees = 90;
    radians = toRadians(degrees);
    assert.equal(radians, Math.PI / 2);

    degrees = 180;
    radians = toRadians(degrees);
    assert.equal(radians, Math.PI);

    degrees = 360;
    radians = toRadians(degrees);
    assert.equal(radians, 2 * Math.PI);
  });

  it('Test "metersToDegrees"', () => {
    let meters = 111320;
    let degrees = metersToDegrees(meters);
    assert.equal(degrees, 1);

    degrees = metersToDegrees(meters, 45);
    assert.equal(degrees, 1.414213562373095);
  });

  it('Test "degreesToMeters"', () => {
    let degrees = 1;
    let meters = degreesToMeters(degrees);
    assert.equal(meters, 111320);

    meters = degreesToMeters(degrees, 45);
    assert.equal(meters, 78715.12688168648);
  });

  it('Test "getDistance"', () => {
    let p1 = [0, 0],
      p2 = [0, 100],
      distance = 100;
    assert.equal(getDistance(p1, p2), distance);

    p1 = [325763.7233, 450358.7089];
    p2 = [325758.0054, 450367.7143];
    distance = 10.667315012187876;
    assert.equal(getDistance(p1, p2), distance);

    p1 = [42.680026, 23.336611];
    p2 = [42.678803, 23.338928];
    distance = 0.002619965266941615;
    assert.equal(getDistance(p1, p2), distance);

    p1 = [42.680026, 23.336611];
    p2 = [42.678803, 23.338928];
    distance = 267.7929454170398;
    let calculatedDistance = getDistance(p1, p2);
    calculatedDistance = degreesToMeters(calculatedDistance, (p1[1] + p2[1]) / 2);
    assert.equal(calculatedDistance, distance);
  });
});
