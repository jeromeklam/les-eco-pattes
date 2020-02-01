import React from 'react';
import { shallow } from 'enzyme';
import { InlineMapDocuments } from '../../../src/features/site/InlineMapDocuments';

describe('site/InlineMapDocuments', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineMapDocuments {...props} />
    );

    expect(
      renderedComponent.find('.site-inline-map-documents').length
    ).toBe(1);
  });
});
