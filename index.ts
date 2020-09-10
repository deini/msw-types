import { setupServer } from 'msw/node';
import { rest, setupWorker } from 'msw';

interface LoginRequestBodyType {
  username: string;
}

interface LoginResponseBodyType {
  accessToken: string;
}

// This is fine
rest.post<LoginRequestBodyType, LoginResponseBodyType>(
  '/login',
  (req, res, ctx) => {
    return res(ctx.json({ accessToken: 'abc-123' }));
  }
);

// This breaks
setupServer(
  rest.post<LoginRequestBodyType, LoginResponseBodyType>(
    '/login',
    (req, res, ctx) => {
      return res(ctx.json({ accessToken: 'abc-123' }));
    }
  )
);

// This also breaks
setupWorker(
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.json({ accessToken: 'abc-123' }));
  })
);
