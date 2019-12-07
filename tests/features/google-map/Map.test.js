import React from 'react';
import { shallow } from 'enzyme';
import { Map } from '../../../src/features/google-map/Map';

describe('google-map/Map', () => {
  it('renders node with correct class name', () => {
    const props = {
      googleMap: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Map {...props} />
    );

    expect(
      renderedComponent.find('.google-map-map').length
    ).toBe(1);
  });
});
