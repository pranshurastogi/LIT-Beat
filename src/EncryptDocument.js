import React, { useState } from 'react';
import LitJsSdk from '@lit-protocol/sdk-browser';

function EncryptDocument() {
  const [document, setDocument] = useState('');
  const [encryptedDocument, setEncryptedDocument] = useState('');

  const handleEncrypt = async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(document);

    setEncryptedDocument(encryptedString);

    console.log('Encrypted Document:', encryptedString);
    console.log('Symmetric Key:', symmetricKey);
  };

  return (
    <div>
      <h2>Encrypt Document</h2>
      <textarea
        value={document}
        onChange={(e) => setDocument(e.target.value)}
        placeholder="Enter document content"
      ></textarea>
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedDocument && <p>Encrypted Document: {encryptedDocument}</p>}
    </div>
  );
}

export default EncryptDocument;

