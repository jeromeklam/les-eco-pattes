import React from 'react';
import { shallow } from 'enzyme';
import { InlineDocuments } from '../../../src/features/contract/InlineDocuments';

describe('contract/InlineDocuments', () => {
  it('renders node with correct class name', () => {
    const props = {
      contract: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineDocuments {...props} />
    );

    expect(
      renderedComponent.find('.contract-inline-documents').length
    ).toBe(1);
  });
});
