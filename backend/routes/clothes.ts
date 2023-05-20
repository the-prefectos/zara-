import express, { Request, Response } from "express";
import Clothes, { ClothesDocument } from "../models/clothes";
import { authenticate ,authorizeAdmin } from "../auth";
const router = express.Router();


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


router.post("/", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { image, name, gen, price, desc } = req.body;
    const clothes = await Clothes.create({ image, name, gen, price, desc });
    res.status(201).json(clothes);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});


router.put("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image, name, gen, price, desc } = req.body;
    const clothes = await Clothes.findByIdAndUpdate(id, { image, name, gen, price, desc }, { new: true });
    if (!clothes) {
      return res.status(404).json({ error: "clothes not found" });
    }
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clothes = await Clothes.findByIdAndDelete(id);
    if (!clothes) {
      return res.status(404).json({ error: "clothes not found" });
    }
    res.json({ message: "clothes deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
