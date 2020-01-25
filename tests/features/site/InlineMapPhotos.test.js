import React from 'react';
import { shallow } from 'enzyme';
import { InlineMapPhotos } from '../../../src/features/site/InlineMapPhotos';

describe('site/InlineMapPhotos', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineMapPhotos {...props} />
    );

    expect(
      renderedComponent.find('.site-inline-map-photos').length
    ).toBe(1);
  });
});
