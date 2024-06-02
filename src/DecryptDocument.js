import React, { useState } from 'react';
import LitJsSdk from '@lit-protocol/sdk-browser';

function DecryptDocument() {
  const [encryptedDocument, setEncryptedDocument] = useState('');
  const [symmetricKey, setSymmetricKey] = useState('');
  const [decryptedDocument, setDecryptedDocument] = useState('');

  const handleDecrypt = async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();

    const decryptedString = await LitJsSdk.decryptString(encryptedDocument, symmetricKey);

    setDecryptedDocument(decryptedString);
  };

  return (
    <div>
      <h2>Decrypt Document</h2>
      <textarea
        value={encryptedDocument}
        onChange={(e) => setEncryptedDocument(e.target.value)}
        placeholder="Enter encrypted document"
      ></textarea>
      <input
        type="text"
        value={symmetricKey}
        onChange={(e) => setSymmetricKey(e.target.value)}
        placeholder="Enter symmetric key"
      />
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedDocument && <p>Decrypted Document: {decryptedDocument}</p>}
    </div>
  );
}

export default DecryptDocument;

