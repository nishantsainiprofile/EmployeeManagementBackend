// backend/express.d.ts
import { UserType } from './UserType'; // optional if you have a type

declare global {
  namespace Express {
    interface Request {
      user?: UserType; // or `any` if you haven't defined a type
    }
  }
}

export {}; // to ensure it's treated as a module
