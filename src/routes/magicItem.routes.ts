import { Router } from "express";
import {
  addMagicItem,
  clearMagicItems,
  getMagicItems,
} from "../controllers/magicItem.controller";

const router = Router();

/**
 * @swagger
 * /api/magic-items:
 *   get:
 *     summary: Retrieve all magic items
 *     tags: [MagicItems]
 *     responses:
 *       200:
 *         description: A list of magic items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MagicItem'
 *       500:
 *         description: Internal server error.
 */

/**
 * @route GET /api/magic-items
 * @description Fetch all magic items from the database
 * @returns {Array} 200 - An array of magic items
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: GET /api/magic-items
 * // returns 200 with an array of magic items
 */
router.route("/").get(getMagicItems);

/**
 * @swagger
 * /api/magic-items:
 *   post:
 *     summary: Add a new magic item
 *     tags: [MagicItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the magic item
 *               weight:
 *                 type: number
 *                 description: The weight of the magic item
 *     responses:
 *       201:
 *         description: The created magic item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagicItem'
 *       500:
 *         description: Internal server error.
 */

/**
 * @route POST /api/magic-items
 * @description Add a new magic item to the database
 * @param {Object} req.body - Magic item details
 * @param {string} req.body.name - The name of the magic item
 * @param {number} req.body.weight - The weight of the magic item
 * @returns {Object} 201 - The newly created magic item
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: POST /api/magic-items
 * // Request body: { name: "Magic Wand", weight: 2 }
 * // returns 201 with the newly created magic item
 */
router.route("/").post(addMagicItem);

/**
 * @swagger
 * /api/magic-items:
 *   delete:
 *     summary: Delete all magic items
 *     tags: [MagicItems]
 *     responses:
 *       200:
 *         description: Number of magic items deleted.
 *       500:
 *         description: Internal server error.
 */

/**
 * @route DELETE /api/magic-items
 * @description Clear all magic items from the database
 * @returns {Object} 200 - Success message with the number of items deleted
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: DELETE /api/magic-items
 * // returns 200 with the number of magic items deleted
 */
router.route("/").delete(clearMagicItems);

export default router;
