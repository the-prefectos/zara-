import express, { Request, Response } from "express";
import Men, { MenDocument } from "../models/men";

const router = express.Router();

// Get all men
router.get("/", async (req: Request, res: Response) => {
  try {
    const men = await Men.find();
    res.json(men);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get one men by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const men = await Men.findById(id);
    if (!men) {
      return res.status(404).json({ error: "Men not found" });
    }
    res.json(men);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new men
router.post("/", async (req: Request, res: Response) => {
  try {
    const { image, name, id, price } = req.body;
    const men = await Men.create({ image, name, id, price });
    res.status(201).json(men);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

export default router;
