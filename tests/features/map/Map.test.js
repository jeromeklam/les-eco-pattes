import React from 'react';
import { shallow } from 'enzyme';
import { Map } from '../../../src/features/map/Map';

describe('map/Map', () => {
  it('renders node with correct class name', () => {
    const props = {
      map: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Map {...props} />
    );

    expect(
      renderedComponent.find('.map-map').length
    ).toBe(1);
  });
});
