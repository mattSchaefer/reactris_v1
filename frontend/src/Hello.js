import React, { useState } from 'react';

const Hello = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const fetchMessage = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/hello?name=${name}`);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={fetchMessage}>Say Hello</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Hello;