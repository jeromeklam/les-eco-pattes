import React from 'react';
import { shallow } from 'enzyme';
import { ImageGallery } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ImageGallery />);
  expect(renderedComponent.find('.icons-image-gallery').length).toBe(1);
});
