import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../mocks/mockFetch';
import App from './App';

let windowFetchSpy;

beforeEach(() => {
  windowFetchSpy = jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks()
});

test('testing home page rendering', () => {
  render(<App />);
  expect(screen.getByText(/You searched these words today/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Conversation/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Composer/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Optimizer/i)).toBeInTheDocument();
  expect(screen.getByText(/Hello! How can I help you?/i)).toBeInTheDocument();
  expect(screen.getByText(/Have a chat with AI. Try to include your new words./i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search a word/i)).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'Look up'})).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'OK'})).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'Clear'})).toBeInTheDocument();
});

test('testing search a word', async () => {
  render(<App />);

  // fill up the search box with the word 'entry'
  const searchingInput = screen.getByPlaceholderText('Search a word');
  fireEvent.change(searchingInput, {target: {value: 'gelato'}})
  expect(searchingInput.value).toBe('gelato');

  // click the search button
  const getSearchButton = screen.getByRole('button', {name: 'Look up'});
  expect(getSearchButton).toBeEnabled();
  userEvent.click(getSearchButton);

  // verify fetch response
  expect(windowFetchSpy).toHaveBeenCalled();
  expect(windowFetchSpy).toHaveBeenCalledWith('https://www.dictionaryapi.com/api/v3/references/collegiate/json/gelato?key=c1f42caf-a67f-46b9-aba6-e14c23e777e5');
  expect(await screen.findByText('noun')).toBeVisible();
  expect(screen.getByText(/a soft rich ice cream containing little or no air/i)).toBeVisible();
  expect(screen.getByText('gelato')).toBeVisible(); // check if searched word 'gelato' shows up
  
})

test('testing game page', async () => {
  render(<App />);

  // click GAME button
  const getGameNav = screen.getByRole('link', {name: 'GAME'})
  expect(getGameNav).toHaveAttribute('href', '/game');
  userEvent.click(getGameNav);

  // very GAME page
  expect(screen.getByRole('button', {name: 'Start A Game'})).toBeDisabled();
  expect(screen.getByText('This is a simple word game that has 2 player involved: a host and a guest. Each player has a a turn to come up a new word based on the previous word that is given by the opponent. The new word has to have exactly 1 letter different from the given one. The game is like this:')).toBeInTheDocument();
})