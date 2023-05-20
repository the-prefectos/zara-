import express, { Request, Response } from "express";
import Women, { WomenDocument } from "../models/women";

const router = express.Router();

// Get all women
router.get("/", async (req: Request, res: Response) => {
  try {
    const women = await Women.find();
    res.json(women);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const women = await Women.findById(id);
    if (!women) {
      return res.status(404).json({ error: "women not found" });
    }
    res.json(women);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new women
router.post("/", async (req: Request, res: Response) => {
  try {
    const { image, name, id, price } = req.body;
    const women = await Women.create({ image, name, id, price });
    res.status(201).json(women);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

export default router;
