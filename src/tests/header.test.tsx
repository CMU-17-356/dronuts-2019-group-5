import * as React from 'react';
import * as enzyme from 'enzyme';
import Header from '../components/header';

it('renders without crashing', () => {
    const _ = enzyme.shallow(<Header />);
});
