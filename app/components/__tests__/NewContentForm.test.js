import React from 'react';
import { shallow } from 'enzyme';

import NewContentForm from '../NewContentForm';

describe('Component: NewContentForm', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NewContentForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
