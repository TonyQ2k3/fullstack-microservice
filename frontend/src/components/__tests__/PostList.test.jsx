import React from 'react';
import { render } from '@testing-library/react';
import PostList from '../PostList';

jest.mock('react-router-dom', () => ({
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('TicketList Component', () => {
    test('renders without crashing', () => {
        render(<PostList />);
    });

    test('displays no open tickets message when there are no tickets', () => {
        const { getByText } = render(<PostList />);
    });

    test('displays tickets correctly', () => {
        const posts = [
            {
                _id: '1',
                title: 'Sample Post 1',
                body: 'This is a sample body.',
                username: 'Sample User 1'
            },
            {
                _id: '2',
                title: 'Sample Post 2',
                body: 'This is another sample body.',
                username: 'Sample User 2'
            },
        ];

        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(posts),
                ok: true,
            })
        );

        const { getByText } = render(<PostList />);

        posts.forEach(post => {
        });
    });
});
