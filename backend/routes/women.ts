import express, { Request, Response } from "express";
import Women, { WomenDocument } from "../models/women";
import { authenticate ,authorizeAdmin } from "../auth";
const router = express.Router();


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


router.post("/", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { image, name, gen, price, desc } = req.body;
    const women = await Women.create({ image, name, gen, price, desc });
    res.status(201).json(women);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});


router.put("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image, name, gen, price, desc } = req.body;
    const women = await Women.findByIdAndUpdate(id, { image, name, gen, price, desc }, { new: true });
    if (!women) {
      return res.status(404).json({ error: "Women not found" });
    }
    res.json(women);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const women = await Women.findByIdAndDelete(id);
    if (!women) {
      return res.status(404).json({ error: "Women not found" });
    }
    res.json({ message: "Women deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
