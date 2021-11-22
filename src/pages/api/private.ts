import { ethers } from 'ethers';

export default async function mint(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, signed } = req.body;
      const result = ethers.utils.verifyMessage(message, signed);
      res.status(200).json({ signer: result });
    } catch (e) {
      res.status(400).json(e);
    }
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
