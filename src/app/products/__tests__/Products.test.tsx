import React from 'react';

import { render } from 'tests';

import { Products } from '../components/Products';

describe('Products', () => {
  test('Displays page header', async () => {
    const { getByText } = render(<Products />);

    expect(getByText('Products page')).toBeInTheDocument();
  });
});
