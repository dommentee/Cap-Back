import { Request, Response } from "express";
import { sign, verify  } from "jsonwebtoken";

import { findUserById, User } from "../controllers/user";

export interface Req extends Request {
  userId?: number
}

export interface MyContext {
  req: Req
  res: Response
}

interface TokenData {
    userId?: number | null
    authCount?: number | null
}

const REFRESH_TOKEN_SECRET = "CHANGE_ME!";
const ACCESS_TOKEN_SECRET = "CHNAGE_ME_TOO!";

export const createTokens = (user: User) => {
  const refreshToken = sign(
    { userId: user.id, authCount: user.authCount },
    REFRESH_TOKEN_SECRET, { expiresIn: "7d" }
  );
  const accessToken = sign(
    { userId: user.id },
    ACCESS_TOKEN_SECRET, { expiresIn: "15min" }
  );

  return { refreshToken, accessToken };
};

export const verifyRefreshToken = (refreshToken?: string): TokenData => {
    let data: TokenData = {
      userId: null,
      authCount: null
    };
    try {
      if (!refreshToken) return data;
      data = verify(refreshToken, REFRESH_TOKEN_SECRET) as TokenData;
    } catch { }
    return data;
  }

export const authMiddleware = async (req: Req, res: Response, next: () => void) => {
    const refreshToken = req.cookies ? req.cookies["refresh-token"] : null;
    const accessToken = req.cookies ? req.cookies["access-token"] : null;
  
    if (!refreshToken && !accessToken) return next();
  
    try {
      const data = verify(accessToken, ACCESS_TOKEN_SECRET) as TokenData;
      if (data.userId) req.userId = data.userId;
      return next();
    } catch { }
  
    if (!refreshToken) return next(); // expired access token
  
    const data = verifyRefreshToken(refreshToken);
    
    if(!data.userId) {
        return next()
    }
    
    const user = await findUserById(data.userId); //FIX THIS FIX FIX
    if (!user || user.authCount !== data.authCount) return next(); // token has been invalidated
  
    const tokens = createTokens(user);
  
    res.cookie("refresh-token", tokens.refreshToken);
    res.cookie("access-token", tokens.accessToken);
    if (data.userId) req.userId = data.userId;
  
    next();
  }
