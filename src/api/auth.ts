import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    // Gửi yêu cầu tới API bên ngoài
    const response = await axios.post("https://portal.fintown.software/api/auth/login", {
      email,
      password,
    });

    // Trả về phản hồi từ API
    if (response.status === 200) {
      const { token, expiresIn } = response.data;

      // Đặt cookie token
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`);
      return res.status(200).json({ token, expiresIn });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
}
