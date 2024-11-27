import { Router } from "express";
import { getLogs, clearLogs } from "../controllers/log.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API for managing mission logs
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Retrieve all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Successfully retrieved logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       500:
 *         description: Internal server error
 */

/**
 * @route GET /api/logs
 * @description Fetch all logs from the database, sorted by timestamp
 * @returns {Array} 200 - An array of logs
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: GET /api/logs
 * // returns 200 with an array of logs
 */
router.route("/").get(getLogs);

/**
 * @swagger
 * /api/logs:
 *   delete:
 *     summary: Clear all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Successfully cleared logs
 *       500:
 *         description: Internal server error
 */

/**
 * @route DELETE /api/logs
 * @description Clear all logs from the database
 * @returns {Object} 200 - Success message with number of logs deleted
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: DELETE /api/logs
 * // returns 200 with the number of logs deleted
 */
router.route("/").delete(clearLogs);

export default router;
