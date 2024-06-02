import React, { useState } from 'react';
import LitJsSdk from '@lit-protocol/sdk-browser';

function ConditionalSign() {
  const [document, setDocument] = useState('');
  const [signature, setSignature] = useState('');

  const handleSign = async () => {
    const client = new LitJsSdk.LitNodeClient({ litNetwork: 'cayenne' });
    await client.connect();

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });

    const sessionSigs = await client.getSessionSigs({
      authSig,
      chain: 'ethereum',
      resource: '',
    });

    const conditions = [
      {
        conditionType: 'evmBasic',
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '1000000000000000000',
        },
      },
    ];

    const litActionCode = `
      const go = async () => {
        const testResult = await Lit.Actions.checkConditions({ conditions, authSig, chain });

        if (!testResult) {
          return;
        }

        const message = new Uint8Array(
          await crypto.subtle.digest('SHA-256', new TextEncoder().encode('Document to sign'))
        );
        const toSign = message;
        const sigShare = await LitActions.signEcdsa({ toSign, publicKey: "Your_Public_Key", sigName: "sig1" });
      };

      go();
    `;

    const signatures = await client.executeJs({
      code: litActionCode,
      sessionSigs,
      jsParams: {
        conditions,
        authSig,
        chain: 'ethereum',
      },
    });

    setSignature(signatures);

    console.log('Signatures:', signatures);
  };

  return (
    <div>
      <h2>Conditional Sign Document</h2>
      <textarea
        value={document}
        onChange={(e) => setDocument(e.target.value)}
        placeholder="Enter document content"
      ></textarea>
      <button onClick={handleSign}>Sign</button>
      {signature && <p>Signature: {JSON.stringify(signature)}</p>}
    </div>
  );
}

export default ConditionalSign;

