import { Router } from "express";
import {
  addMagicMover,
  startMission,
  endMission,
  loadItems,
  getMagicMovers,
  clearMagicMovers,
} from "../controllers/magicMover.controller";

const router = Router();

/**
 * @route GET /api/magic-movers
 * @description Fetch all magic movers, sorted by most missions completed
 * @returns {Array} 200 - An array of magic movers
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: GET /api/magic-movers
 * // returns 200 with an array of magic movers
 */
router.route("/").get(getMagicMovers);

/**
 * @route POST /api/magic-movers
 * @description Add a new magic mover to the database
 * @param {Object} req.body - Magic mover details
 * @param {string} req.body.name - The name of the magic mover
 * @param {number} req.body.weightLimit - The weight limit of the magic mover
 * @returns {Object} 201 - The newly created magic mover
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: POST /api/magic-movers
 * // Request body: { name: "Mover 1", weightLimit: 100 }
 * // returns 201 with the newly created magic mover
 */
router.route("/").post(addMagicMover);

/**
 * @route DELETE /api/magic-movers
 * @description Clear all magic movers from the database
 * @returns {Object} 200 - Success message with the number of magic movers deleted
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: DELETE /api/magic-movers
 * // returns 200 with the number of magic movers deleted
 */
router.route("/").delete(clearMagicMovers);

/**
 * @route PUT /api/magic-movers/:id/start-mission
 * @description Start a mission for the specified magic mover
 * @param {string} id - The ID of the magic mover
 * @returns {Object} 200 - Success message with the updated magic mover
 * @returns {Object} 404 - If the magic mover is not found
 * @returns {Object} 400 - If the magic mover is not in a valid state to start a mission
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: PUT /api/magic-movers/123/start-mission
 * // returns 200 with the updated magic mover
 */
router.put("/:id/start-mission", startMission);

/**
 * @route PUT /api/magic-movers/:id/end-mission
 * @description End a mission for the specified magic mover
 * @param {string} id - The ID of the magic mover
 * @returns {Object} 200 - Success message with the updated magic mover
 * @returns {Object} 404 - If the magic mover is not found
 * @returns {Object} 400 - If the magic mover is not in a valid state to end the mission
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: PUT /api/magic-movers/123/end-mission
 * // returns 200 with the updated magic mover
 */
router.put("/:id/end-mission", endMission);

/**
 * @route POST /api/magic-movers/:id/load
 * @description Load items into the specified magic mover
 * @param {string} id - The ID of the magic mover
 * @param {Array} req.body.items - Array of Magic Item IDs to load
 * @returns {Object} 200 - Success message with the updated magic mover
 * @returns {Object} 404 - If the magic mover is not found
 * @returns {Object} 400 - If the items cannot be loaded (e.g., weight limit exceeded)
 * @returns {Object} 500 - Error message if something goes wrong
 * @example
 * // Example request: POST /api/magic-movers/123/load
 * // Request body: { items: ["itemId1", "itemId2"] }
 * // returns 200 with the updated magic mover
 */
router.post("/:id/load", loadItems);

export default router;
