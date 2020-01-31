import React from 'react';
import { shallow } from 'enzyme';
import { InlineDocuments } from '../../../src/features/cause/InlineDocuments';

describe('cause/InlineDocuments', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineDocuments {...props} />
    );

    expect(
      renderedComponent.find('.cause-inline-documents').length
    ).toBe(1);
  });
});
