import * as React from 'react';
import * as enzyme from 'enzyme';
import Header from '../header';

it('renders without crashing', () => {
    const _ = enzyme.shallow(<Header />);
});
