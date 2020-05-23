import React from 'react';
import { shallow } from 'enzyme';
import { InlinePhotos } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlinePhotos />);
  expect(renderedComponent.find('.cause-inline-photos').length).toBe(1);
});
