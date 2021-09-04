import React from 'react';
import { shallow } from 'enzyme';
import { PortalLoader } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PortalLoader />);
  expect(renderedComponent.find('.ui-portal-loader').length).toBe(1);
});
