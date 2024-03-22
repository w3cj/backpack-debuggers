import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/ErrorResponse';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse | string>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  console.log(req.headers);

  const acceptHeader = req.get('accept') || '';
  if (acceptHeader.match(/text\/html/)) {
    return res.send(
      `<html>
      <body style="background:black;color:white;font-family:sans-serif;">
      <strong>${err.message}</strong>
      <br />
      <pre style="color:red">${process.env.NODE_ENV === 'production' ? '🥞' : err.stack}</pre>
      </body>
    </html>`,
    );
  }
  return res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
