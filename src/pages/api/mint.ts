import { useMoralis } from 'react-moralis';

// const pinataSDK = require('@pinata/sdk');

// const pinata = pinataSDK(
//   process.env.PINATA_API_KEY,
//   process.env.PINATA_APP_SECRET
// );

export default async function mint(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, description, image } = req.body;

      // const isAuth = pinata.testAuthentication();
      // if (isAuth) {
      //   const result = pinata.pinJSONToIPFS(req.body);
      //   res.status(200).json(result);
      // } else {
      //   res.status(400).json({ message: 'pinata failed to auth' });
      // }
    } catch (e) {
      res.status(400).json(e);
    }
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
