import { Request, Response } from "express";
import MagicMover from "../models/magicMover.model";
import MagicItem from "../models/magicItem.model";
import Log from "../models/log.model";

/**
 * @swagger
 * /api/magic-movers:
 *   post:
 *     tags: [Magic Movers]
 *     summary: Add a new magic mover
 *     description: Creates a new magic mover in the database with the provided name and weight limit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - weightLimit
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the magic mover.
 *               weightLimit:
 *                 type: number
 *                 description: The maximum weight the magic mover can carry.
 *     responses:
 *       201:
 *         description: Magic mover created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagicMover'
 *       500:
 *         description: An error occurred.
 */

/**
 * @desc  Add a new magic mover
 * @route POST /api/magic-movers
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The created magic mover
 */
export async function addMagicMover(req: Request, res: Response) {
  try {
    const { name, weightLimit } = req.body;
    const mover = await MagicMover.create({ name, weightLimit });
    res.status(201).json(mover);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @swagger
 * /api/magic-movers/{id}/start-mission:
 *   put:
 *     tags: [Magic Movers]
 *     summary: Start a mission for a magic mover
 *     description: Updates the state of a magic mover to "on-mission" if it is in the "loading" state.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the magic mover.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mission started successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mover:
 *                   $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Mover must be in the loading state.
 *       404:
 *         description: Magic Mover not found.
 *       500:
 *         description: An error occurred.
 */

/**
 * @desc  Start a mission for a magic mover
 * @route PUT /api/magic-movers/id/start-mission
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated magic mover with mission started
 */
export async function startMission(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const mover = await MagicMover.findById(id);

    if (!mover) {
      res.status(404).json({ error: "Magic Mover not found" });
      return;
    }
    if (mover.questState !== "loading") {
      res.status(400).json({ message: "Mover must be in loading state" });
      return;
    }

    mover.questState = "on-mission";
    await mover.save();

    // Log the start mission action
    const logEntry = new Log({
      mover: mover.id,
      items: mover.items,
      action: "starting mission",
    });
    await logEntry.save();

    res.status(200).json({
      message: "Mission started successfully",
      mover,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @swagger
 * /api/magic-movers/{id}/end-mission:
 *   put:
 *     tags: [Magic Movers]
 *     summary: End a mission for a magic mover
 *     description: Updates the state of a magic mover to "resting" and clears its items if it is in the "on-mission" state.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the magic mover.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mission ended successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mover:
 *                   $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Magic mover should be on mission to finish it.
 *       404:
 *         description: Magic Mover not found.
 *       500:
 *         description: An error occurred.
 */

/**
 * @swagger
 * /api/magic-movers/{id}/end-mission:
 *   put:
 *     tags: [Magic Movers]
 *     summary: End a mission for a magic mover
 *     description: Updates the state of a magic mover to "resting" and clears its items if it is in the "on-mission" state.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the magic mover.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mission ended successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mover:
 *                   $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Magic mover should be on mission to finish it.
 *       404:
 *         description: Magic Mover not found.
 *       500:
 *         description: An error occurred.
 */

/**
 * @desc  End a mission for a magic mover
 * @route PUT /api/magic-movers/:id/end-mission
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated magic mover with mission ended
 */
export async function endMission(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const mover = await MagicMover.findById(id);

    if (!mover) {
      res.status(404).json({ error: "Magic mover not found" });
      return;
    }

    if (mover.questState !== "on-mission") {
      res.status(400).json({
        error: "Magic mover should be on mission to finish it",
      });
    }

    // Log the end mission action
    const logEntry = new Log({
      mover: mover.id,
      items: mover.items,
      action: "ending mission",
    });
    await logEntry.save();

    mover.questState = "resting";
    mover.completedMissions += 1;
    mover.items = [];

    await mover.save();

    res.json({ message: "Mission finished successfully", mover });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @swagger
 * /api/magic-movers:
 *   get:
 *     tags: [Magic Movers]
 *     summary: Get all magic movers
 *     description: Retrieves all magic movers sorted by most missions completed in descending order.
 *     responses:
 *       200:
 *         description: List of magic movers retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MagicMover'
 *       500:
 *         description: An error occurred.
 */

/**
 * @desc  Get magic movers, sorted by most missions completed (descending)
 * @route GET /api/magic-movers
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object[]} List of magic movers
 */
export async function getMagicMovers(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const movers = await MagicMover.find().sort({ completedMissions: -1 });
    if (movers.length === 0) {
      res.status(200).json({ message: "No magic movers found" });
      return;
    }
    res.json(movers);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @swagger
 * /api/magic-movers/{id}/load:
 *   post:
 *     tags: [Magic Movers]
 *     summary: Load items onto a magic mover
 *     description: Loads items onto a magic mover if it is in the "resting" state and the total weight does not exceed the weight limit.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the magic mover.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of item IDs to load.
 *     responses:
 *       200:
 *         description: Items successfully loaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mover:
 *                   $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Validation errors such as weight limit exceeded or mover not in resting state.
 *       404:
 *         description: Magic mover not found.
 *       500:
 *         description: An error occurred.
 */

/**
 * @desc  Load items onto a magic mover
 * @route POST /api/magic-movers/:id/load
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated magic mover with loaded items
 */
export async function loadItems(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const mover = await MagicMover.findById(id);
    if (!mover) {
      res.status(404).json({
        error: "Magic mover not found",
      });
      return;
    }

    if (mover.questState !== "resting") {
      res
        .status(400)
        .json({ message: "Mover must be in resting state to load items" });
      return;
    }

    // Retrieve items
    const magicItems = await MagicItem.find({ _id: { $in: items } });

    // Check if all items exist in magic items collection
    if (magicItems.length !== items.length) {
      res
        .status(400)
        .json({ error: "One or more magic item IDs do not exist" });
      return;
    }

    // Calculate total weight
    const totalWeight = magicItems.reduce((sum, item) => sum + item.weight, 0);

    if (totalWeight > mover.weightLimit) {
      res
        .status(400)
        .json({ error: "Total weight exceeds the mover's weight limit" });
      return;
    }

    // Transition to loading state
    mover.questState = "loading";
    mover.items = items;
    await mover.save();

    // Create a new mission log entry for loading the items
    const logEntry = new Log({
      mover: mover.id,
      items: items,
      action: "loading",
    });

    await logEntry.save();

    res.status(200).json({
      message: "Items successfully loaded",
      mover,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
}

/**
 * @swagger
 * /api/magic-movers:
 *   delete:
 *     tags: [Magic Movers]
 *     summary: Clear all magic movers
 *     description: Deletes all magic movers from the database.
 *     responses:
 *       200:
 *         description: All magic movers cleared successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: An error occurred.
 */

/**
 * @desc  Clear all magic movers
 * @route DELETE /api/magic-movers
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} Message indicating the number of deleted movers
 */
export async function clearMagicMovers(req: Request, res: Response) {
  try {
    const result = await MagicMover.deleteMany({});

    res.status(200).json({
      message: `${result.deletedCount} magic movers cleared successfully`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
