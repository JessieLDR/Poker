import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';

interface CardInfo {
  suit: string;
  value: string;
}

function App() {
  const [deck, setDeck] = useState<CardInfo[]>([]);
  const [hand, setHand] = useState<CardInfo[]>([]);

  const suits = ['Clubs', 'Hearts', 'Spades', 'Diamonds'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const drawHand = () => {
    const newDeck = [];
    for (const suit of suits) {
      for (const value of values) {
        newDeck.push({ suit, value });
      }
    }

    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    const drawnHand = newDeck.slice(0, 5);

    setDeck(newDeck.slice(5));
    setHand(drawnHand);
  };

  return (
    <div className="table">
      <div className="card-container" data-testid="hand">
        {hand.map((card, index) => (
          <Card key={index} suit={card.suit} value={card.value} data-testid="card" />
        ))}
      </div>
      <div className="button-container">
        <button onClick={drawHand}>Draw Hand</button>
      </div>
      <div className="deck-container" data-testid="deck">
        {/* Render deck elements here */}
      </div>
    </div>
  );
}

export default App;
