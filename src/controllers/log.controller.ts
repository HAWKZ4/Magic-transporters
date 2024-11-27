import { Request, Response } from "express";
import Log from "../models/log.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *         - mover
 *         - items
 *         - action
 *       properties:
 *         _id:
 *           type: string
 *           description: Log ID
 *         mover:
 *           type: string
 *           description: Magic Mover ID
 *         items:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of Magic Item IDs
 *         action:
 *           type: string
 *           description: Action performed (e.g., loading, starting mission)
 *       example:
 *         _id: "6489f98c8d2bfc00123abc45"
 *         mover: "6489f98c8d2bfc00123abc46"
 *         items: ["6489f98c8d2bfc00123abc47", "6489f98c8d2bfc00123abc48"]
 *         action: "loading"
 */

/**
 * @desc Get all logs from the database, sorted by timestamp
 * @route GET /api/logs
 *
 * @param {Request} req - The request object
 * @param {Res} res - The response object
 * @returns {Promise<void>} A promise that resolves when the response has been sent
 *
 * @example
 * // Example request: GET /api/logs
 * // returns 200 with an array of logs
 * getLogs(req,res)
 */

export async function getLogs(req: Request, res: Response): Promise<void> {
  try {
    const Logs = await Log.find().sort({ timestamp: -1 }); // Fetch logs from the database and sort by timestamp
    if (Logs.length === 0) {
      res.status(200).json({ message: "No magic items found" });
      return;
    }
    res.json(Logs);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @desc Clear all logs in the database
 * @route Delete /api/logs
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {promsie<void>} - A promise that resolves when the response has been sent
 *
 * @example
 * // Example request: DELETE api/logs
 * // returns 200 with the number of logs deleted
 * clear logs(req,res)
 */
export async function clearLogs(req: Request, res: Response) {
  try {
    const result = await Log.deleteMany({});

    res.status(200).json({
      message: `${result.deletedCount} logs cleared successfully`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
