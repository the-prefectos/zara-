import express, { Request, Response } from "express";
import Kids from "../models/kids";
import { authenticate ,authorizeAdmin } from "../auth";
const router = express.Router();


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


router.post("/", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { image, name, gen, price, desc } = req.body;
    const kids = await Kids.create({ image, name, gen, price, desc });
    res.status(201).json(kids);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});


router.put("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image, name, gen, price, desc } = req.body;
    const kids = await Kids.findByIdAndUpdate(id, { image, name, gen, price, desc }, { new: true });
    if (!kids) {
      return res.status(404).json({ error: "kids not found" });
    }
    res.json(kids);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kids = await Kids.findByIdAndDelete(id);
    if (!kids) {
      return res.status(404).json({ error: "kids not found" });
    }
    res.json({ message: "kids deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
