import React from 'react';
import EncryptDocument from './EncryptDocument';
import DecryptDocument from './DecryptDocument';
import ConditionalSign from './ConditionalSign';

function App() {
  return (
    <div className="container">
      <h1>Secure Document Sharing</h1>
      <EncryptDocument />
      <DecryptDocument />
      <ConditionalSign />
    </div>
  );
}

export default App;

