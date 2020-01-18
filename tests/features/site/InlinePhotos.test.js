import React from 'react';
import { shallow } from 'enzyme';
import { InlinePhotos } from '../../../src/features/site/InlinePhotos';

describe('site/InlinePhotos', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlinePhotos {...props} />
    );

    expect(
      renderedComponent.find('.site-inline-photos').length
    ).toBe(1);
  });
});
