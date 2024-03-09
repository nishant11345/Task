import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BeerCard = ({ beer }) => (
  <div
    style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '200px', // Fixed width for the card
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
  >
    <img
      src={beer.image_url}
      alt={beer.name}
      style={{
        maxWidth: '100%',
        height: '150px',
        marginBottom: '8px',
        borderRadius: '4px',
        objectFit: 'cover',
      }}
    />
    <h3
      style={{
        fontSize: '1.5rem',
        margin: '0',
        color: '#333',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {beer.name}
    </h3>
    <p
      style={{
        fontSize: '1rem',
        margin: '8px 0',
        color: '#555',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {beer.tagline}
    </p>
    <p>
      ABV: {beer.abv}% | IBU: {beer.ibu}
    </p>
  </div>
);

const Beer = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Beer App</h1>
      <input
        type="text"
        placeholder="Search beers..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: '16px',
          padding: '12px',
          width: '300px', // Increased width for better visibility
          fontSize: '1rem',
        }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredBeers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </div>
  );
};

export default Beer;
