import express, { Request, Response } from "express";
import Men, { MenDocument } from "../models/men";
import { authenticate ,authorizeAdmin } from "../auth";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
  try {
    const men = await Men.find();
    res.json(men);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

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


router.post("/", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { image, name, gen, price, desc } = req.body;
    const men = await Men.create({ image, name, gen, price, desc });
    res.status(201).json(men);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});


router.put("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image, name, gen, price, desc } = req.body;
    const men = await Men.findByIdAndUpdate(id, { image, name, gen, price, desc }, { new: true });
    if (!men) {
      return res.status(404).json({ error: "Men not found" });
    }
    res.json(men);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id", authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const men = await Men.findByIdAndDelete(id);
    if (!men) {
      return res.status(404).json({ error: "Men not found" });
    }
    res.json({ message: "Men deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;