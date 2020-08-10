import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/agenda/DefaultPage';

describe('agenda/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      agenda: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.agenda-default-page').length
    ).toBe(1);
  });
});
