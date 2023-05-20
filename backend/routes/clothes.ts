import express, { Request, Response } from "express";
import Clothes, { ClothesDocument } from "../models/clothes";

const router = express.Router();

// Get all clothes
router.get("/", async (req: Request, res: Response) => {
  try {
    const clothes = await Clothes.find();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clothes = await Clothes.findById(id);
    if (!clothes) {
      return res.status(404).json({ error: "clothes not found" });
    }
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// Create a new product
router.post("/", async (req: Request, res: Response) => {
  try {
    const { image, name, desc, price } = req.body;
    const product = await Clothes.create({ image, name, desc, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});


export default router;
