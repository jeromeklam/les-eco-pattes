import React from 'react';
import { shallow } from 'enzyme';
import { ImageModal } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ImageModal />);
  expect(renderedComponent.find('.ui-image-modal').length).toBe(1);
});
