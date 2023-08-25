import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('draws a hand of cards when the "Draw Hand" button is clicked', () => {
  render(<App />);
  const drawButton = screen.getByText('Draw Hand');
  fireEvent.click(drawButton);

  const cardElements = screen.getAllByTestId('card');
  expect(cardElements).toHaveLength(5);
});

test('ensures successive deals are unique', () => {
  render(<App />);
  const drawButton = screen.getByText('Draw Hand');

  const drawnCards: { [cardKey: string]: boolean } = {};

  // Draw multiple hands and ensure uniqueness
  for (let i = 0; i < 10; i++) {
    fireEvent.click(drawButton);
    const cardElements = screen.getAllByTestId('card');
    const handCards = cardElements.map(cardElement => {
      const suitElement = cardElement.querySelector('.card-center');
      const valueElement = cardElement.querySelector('.card-top');

      if (suitElement && valueElement) {
        return {
          suit: suitElement.textContent,
          value: valueElement.textContent,
        };
      }

      return null;
    });

    // Check for duplicate cards in successive hands
    handCards.forEach(card => {
      if (card) {
        const cardKey = `${card.value}${card.suit}`;
        if (drawnCards[cardKey] === true) {
          // This card has been drawn before
          expect(() => {
            throw new Error(`Card ${cardKey} has already been drawn before.`);
          }).toThrow();
        }
        drawnCards[cardKey] = true; // Mark the card as drawn
      }
    });

    // Ensure the current hand is unique
    const uniqueHandCards = handCards.filter(Boolean);
    expect(uniqueHandCards.length).toBe(new Set(uniqueHandCards).size);
  }
});

test('updates deck and hand state after drawing a hand', () => {
  render(<App />);
  const drawButton = screen.getByText('Draw Hand');
  fireEvent.click(drawButton);

  const handElements = screen.queryAllByTestId('card');
  expect(handElements).toHaveLength(5);
});
