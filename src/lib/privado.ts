export const getPrivadoUrl = () => {
  const request = {
    backUrl: "https://web-wallet-demo.privado.id?success=false",
    finishUrl: "https://web-wallet-demo.privado.id?success=true",
    logoUrl:
      "https://ipfs.io/ipfs/QmScrct8HbQk1sf5F2rjWCSy8XEJabgWJeCB6VYtCZdZn6",
    name: "Privado ID - Union Registry",
    zkQueries: [
      {
        circuitId: "credentialAtomicQueryV3OnChain-beta.1",
        id: 101,
        query: {
          proofType: "BJJSignature2021",
          allowedIssuers: [
            "did:iden3:privado:main:2ScrbEuw9jLXMapW3DELXBbDco5EURzJZRN1tYj7L7",
          ],
          context:
            "https://raw.githubusercontent.com/anima-protocol/claims-polygonid/main/schemas/json-ld/pol-v1.json-ld",
          type: "AnimaProofOfLife",
          credentialSubject: {
            human: {
              $eq: true,
            },
          },
        },
        params: {
          nullifierSessionId: "101",
        },
      },
    ],
    verifierDid:
      "did:iden3:linea:sepolia:28itzVLBHnMJaBknFK8PybxHJTvoCBB4rRvngp5APS",
    transactionData: {
      contractAddress: "0xa43E985D7b5b66F4C2E172C92032A4Ad7d230652",
      functionName: "submitZKPResponse",
      methodId: "0xb68967e2",
      chainId: 59141,
      network: "linea-sepolia",
    },
  };

  return `https://wallet.privado.id/#${btoa(JSON.stringify(request))}`;
};
