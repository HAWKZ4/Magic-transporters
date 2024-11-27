import { Request, Response } from "express";
import MagicItem from "../models/magicItem.model";

/**
 * @desc Add a magic item
 * @route POST /api/magic-items
 *
 * @param {Request} req - The request object, which contains the item data in `req.body`.
 * @param {Response} res - The response object, used to send the status and response.
 *
 * @returns {Promise<void>} Returns a promise that resolves to nothing; sends a JSON response with the created magic item.
 *
 * @example
 * // Example usage:
 * // POST request to create a new magic item.
 * addMagicItem(req, res);
 */
export async function addMagicItem(req: Request, res: Response) {
  try {
    const { name, weight } = req.body;
    const item = await MagicItem.create({ name, weight });
    res.status(201).json(item);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @desc Get magic items
 * @route GET /api/magic-items
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *
 * @returns {Promise<void>} Returns a promise that resolves to nothing; sends a JSON response with an array of magic items.
 *
 * @example
 * // Example usage:
 * // GET request to fetch all magic items.
 * getMagicItems(req, res);
 */
export async function getMagicItems(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const magicItems = await MagicItem.find();
    if (magicItems.length === 0) {
      res.status(200).json({ message: "No magic items found" });
      return;
    }
    res.json(magicItems);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @desc Clear magic items
 * @route DELETE /api/magic-items
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *
 * @returns {Promise<void>} Returns a promise that resolves to nothing; sends a JSON response with the count of deleted magic items.
 *
 * @example
 * // Example usage:
 * // DELETE request to remove all magic items.
 * clearMagicItems(req, res);
 */
export async function clearMagicItems(req: Request, res: Response) {
  try {
    const result = await MagicItem.deleteMany({});

    res.status(200).json({
      message: `${result.deletedCount} magic items cleared successfully`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
