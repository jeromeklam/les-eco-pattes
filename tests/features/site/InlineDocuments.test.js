import React from 'react';
import { shallow } from 'enzyme';
import { InlineDocuments } from '../../../src/features/site/InlineDocuments';

describe('site/InlineDocuments', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineDocuments {...props} />
    );

    expect(
      renderedComponent.find('.site-inline-documents').length
    ).toBe(1);
  });
});
