import React from 'react';
import { shallow } from 'enzyme';
import { SiteMarker } from '../../../src/features/map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SiteMarker />);
  expect(renderedComponent.find('.map-site-marker').length).toBe(1);
});
