import { Request, Response, NextFunction } from "express";

/**
 * @desc Middleware to catch "Not Found" errors
 * @route Handles all unhandled routes
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {void} Does not return anything; passes control to the next middleware.
 *
 * @example
 * // Example usage:
 * // This middleware will be used when no routes match the request.
 * notFound(req, res, next);
 */

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

/**
 * @desc General error handler middleware
 * @route Handles errors in the application
 * 
 * @param {any} err - The error object, which may vary depending on the type of error.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * 
 * @returns {void} Does not return anything; it handles the error and sends a response.
 * 
 * @example
 * // Example usage:
 * // This middleware will be used to catch and respond to errors in the application.
 * errorHandler(err, req, res, next);
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode: number = res.statusCode;

  if (statusCode === 200) {
    statusCode = 500;
  }

  let message = err.message || "Internal server error";

  // Handle mongoose specific errors
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode: 404;
  }

  // Handle mongoose validation errors
  if (err.name === "ValidationError") {
    message: "Invalid data provided";
    statusCode: 400;
  }

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === "production" ? "👋" : err.stack,
  });
}
