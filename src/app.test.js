import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Board from './Board'

test('Login Button Appears, and does not log in unless username is entered', ()=> {
    const result = render(<App />);
    const loginButtonElement = screen.getByText('Log In');
    expect(loginButtonElement).toBeInTheDocument();
    fireEvent.click(loginButtonElement)
    expect(loginButtonElement).toBeInTheDocument();
}
);

test('Show Leaderboard button appears when user logs in, and make sure login button disappears', ()=> {
    const result = render(<App />);
    const loginButtonElement = screen.getByText('Log In');
    const enterUsername = screen.getByPlaceholderText('username');
    fireEvent.change(enterUsername, { target: { value: 'perbhat' }});
    fireEvent.click(loginButtonElement);
    expect(loginButtonElement).not.toBeInTheDocument();
    const leaderBoardButton = screen.getByText('Leaderboard');
    expect(leaderBoardButton).toBeVisible();
    
});

test('BoardD does not appear if only one user is logged in', ()=> {
    const result = render(<App />);
    const loginButtonElement = screen.getByText('Log In');
    const enterUsername = screen.getByPlaceholderText('username');
    fireEvent.change(enterUsername, { target: { value: 'perbhat' }});
    fireEvent.click(loginButtonElement);
    expect(loginButtonElement).not.toBeInTheDocument();
    const board = screen.queryByTestId('tictacboard')
    const leaderBoardButton = screen.getByText('Leaderboard');
    expect(board).not.toBeInTheDocument();
    expect(leaderBoardButton).toBeInTheDocument()
});