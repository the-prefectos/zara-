import express, { Request, Response } from "express";
import Kids from "../models/kids";

const router = express.Router();

// Get all men
router.get("/", async (req: Request, res: Response) => {
  try {
    const kids = await Kids.find();
    res.json(kids);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kids = await Kids.findById(id);
    if (!kids) {
      return res.status(404).json({ error: "kids not found" });
    }
    res.json(kids);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new men
router.post("/", async (req: Request, res: Response) => {
  try {
    const { image, name, desc, price } = req.body;
    const kids = await Kids.create({ image, name, desc, price });
    res.status(201).json(kids);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

export default router;
