import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [servers, setServers] = useState([]);
  const [serverName, setServerName] = useState('');
  const [tipAmount, setTipAmount] = useState('');

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    const response = await axios.get('/servers');
    setServers(response.data);
  };

  const addServer = async () => {
    if (serverName) {
      await axios.post('/add-server', { name: serverName, tips: 0 });
      setServerName('');
      fetchServers();
    }
  };

  const addTip = async () => {
    if (tipAmount) {
      const response = await axios.post('/add-tip', { amount: parseFloat(tipAmount) });
      setServers(response.data);
      setTipAmount('');
    }
  };

  return (
    <div className="App">
      <h1>Restaurant Management Platform</h1>
      <div>
        <input
          type="text"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          placeholder="Add Server"
        />
        <button onClick={addServer}>Add Server</button>
      </div>
      <div>
        <input
          type="number"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          placeholder="Add Tip Amount"
        />
        <button onClick={addTip}>Add Tip</button>
      </div>
      <div>
        <h2>Servers</h2>
        <ul>
          {servers.map((server) => (
            <li key={server.name}>{`${server.name}: ${server.tips.toFixed(2)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
