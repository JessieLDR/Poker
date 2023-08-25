// Card.tsx
import React from 'react';

interface CardProps {
  suit: string;
  value: string;
}

const Card: React.FC<CardProps> = ({ suit, value }) => {
  const suitIcon = getSuitIcon(suit);

  return (
    <div className={`card ${suit.toLowerCase()}`} data-testid="card">
      <div className="card-content">
        <div className="card-top">{value}</div>
        <div className="card-center">{suitIcon}</div>
      </div>
    </div>
  );
};

function getSuitIcon(suit: string) {
  switch (suit) {
    case 'Clubs':
      return '♣';
    case 'Hearts':
      return '♥';
    case 'Spades':
      return '♠';
    case 'Diamonds':
      return '♦';
    default:
      return '';
  }
}

export default Card;
