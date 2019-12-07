import React from 'react';
import { shallow } from 'enzyme';
import { PigeonMap } from '../../../src/features/map/PigeonMap';

describe('map/PigeonMap', () => {
  it('renders node with correct class name', () => {
    const props = {
      map: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PigeonMap {...props} />
    );

    expect(
      renderedComponent.find('.map-pigeon-map').length
    ).toBe(1);
  });
});
