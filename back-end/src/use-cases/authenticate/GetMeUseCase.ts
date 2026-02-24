import jwt, { JwtPayload } from 'jsonwebtoken';
import { InvalidCredentials } from '../../helpers/ApiErrors';

interface UserPayload extends JwtPayload {
  sub: string;
  id: number;
  name: string;
}

class GetMeUseCase {
  constructor(private readonly jwtSecret = process.env.JWT_SECRET as string) {}

  execute(token: string): UserPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as UserPayload;
    } catch {
      throw new InvalidCredentials();
    }
  }
}

export { GetMeUseCase };
