import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import NavBar from '../NavBar';

describe('NavBar component', () => {
    test('renders logo and navigation links', () => {
      render(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      );
  
      // Kiểm tra xem logo có hiển thị không
      const logoElement = screen.getByAltText('motion-assists-logo');
      expect(logoElement).toBeInTheDocument();
  
      // Kiểm tra xem tiêu đề "Motion Blogs" có hiển thị không
      const titleElement = screen.getByText('Motion Blogs');
      expect(titleElement).toBeInTheDocument();
    });
  
    test('navigation links have correct destinations', () => {
      render(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      );
    })
});