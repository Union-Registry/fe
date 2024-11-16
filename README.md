# Union Registry

This project is comprised of three different repositories

- Front-End https://github.com/Union-Registry/fe
- Back-End https://github.com/Union-Registry/union-backend
- Smart Contract https://github.com/Union-Registry/unions-contracts
- Substream Implementation (The Graph) https://github.com/Union-Registry/union-backend-substreams

This is a submission for the ETH Global Hackathon Bangkok

## Project Description

Our Project, Union Registry is a way for couples to bring their luv on chain! 

Last year one of our team members got married and had the inspiration to think of how to bring marriages on-chain and how to co-manage finances. He had a massive lightbulb moment when him and his partner wanted to buy a house in their homebase of Mexico City. 

Not enough of a crypto OG to buy a house outright they managed to use the power of DeFi to secure a super low-rate loan on Compound, took out USDC and made the down-payment on their future home. 

So the idea of Union Registry was firmly planted. Bring on-chain human verified unions on-chain, seal the deal with an attestation and be able to share it with the blockchain-infused institutions of the future. 

In addition members of a Union can customize their bond further using unique twist of Nouns NFTs, with each member designing one half of the Noggle which they "gift" to the other person. The noggle design minted when the union is fully accepted is a blend of both halves, making the Noun unique and personalized for each Union.

Users can login with their own wallet or with socials, verify their humanity and propose a union to another person using a secret code. The proposee enters the secret code, the union is made, Nouns are minted and a very special "Union Certificate" is made available to share with friends, family and your local government agency.

## Contract Deployments

### Scroll Sepolia
| Name | Address | Link |
| --- | --- | --- |
| Union Registry Implementation  | 0x052f734680a741561ac25adce85de1089896b400 | https://scroll-sepolia.blockscout.com/address/0x052f734680a741561ac25adce85de1089896b400 |
| Unions Rings Implementation | 0xccde38657c7f9fc2b3a6c802669c67df41ea4ec6 | https://scroll-sepolia.blockscout.com/address/0xccde38657c7f9fc2b3a6c802669c67df41ea4ec6 |
| Union Rings Proxy | 0xaa41f84663158da8140ff1d9f1b69759448cb868 | https://scroll-sepolia.blockscout.com/address/0xaa41f84663158da8140ff1d9f1b69759448cb868 |
| Union Registry Proxy  | 0xb6bfe8433ae90b6d0b9b25f5736a0600574b642c | https://scroll-sepolia.blockscout.com/address/0xb6bfe8433ae90b6d0b9b25f5736a0600574b642c |
| Unions Rings ProxyAdmin | 0x4f7dc6b6f313f720e2db644d4b276e6c2fe3a1d2 | https://scroll-sepolia.blockscout.com/address/0x4f7dc6b6f313f720e2db644d4b276e6c2fe3a1d2 |
| Union Registry ProxyAdmin | 0x51734668eab7bb91370618b9a45953ae74268014 | https://scroll-sepolia.blockscout.com/address/0x51734668eab7bb91370618b9a45953ae74268014 |

### Celo Alfajores
| Name | Address | Link |
| --- | --- | --- |
| Unions Rings  | 0x052f734680a741561ac25adce85de1089896b400 | https://celo-alfajores.blockscout.com/address/0x052f734680A741561ac25ADCe85DE1089896B400 |
| Unions Rings Implementation | 0xb6bfe8433ae90b6d0b9b25f5736a0600574b642c | https://celo-alfajores.blockscout.com/address/0xb6bfe8433ae90b6d0b9b25f5736a0600574b642c |
| Union Rings Proxy Admin | 0x51734668eab7bb91370618b9a45953ae74268014 | https://celo-alfajores.blockscout.com/address/0x51734668eab7bb91370618b9a45953ae74268014 |
| Civil Registry  | 0x5a6c549b98a47a4fcc2f5fff313eb727c6428704 | https://celo-alfajores.blockscout.com/address/0x5a6c549b98a47a4fcc2f5fff313eb727c6428704 |
| Civil Registry Implementation | 0x36db42c5649deec4efab6fd22006fe20b8427d3d | https://celo-alfajores.blockscout.com/address/0x36db42c5649deec4efab6fd22006fe20b8427d3d |
| Civil Registry Proxy Admin | 0x0d969a06b6ac70cc142a95803f9533cb13031344 | https://celo-alfajores.blockscout.com/address/0x0d969a06b6ac70cc142a95803f9533cb13031344 |


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
