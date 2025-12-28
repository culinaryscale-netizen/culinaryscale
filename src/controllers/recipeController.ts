import { Request, Response } from "express";
import Recipe from "../models/Recipe.js";

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.create(req.body);
    return res.status(201).json(recipe);
  } catch (err: any) {
    console.error("createRecipe error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getAllRecipes = async (_req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return res.json(recipes);
  } catch (err: any) {
    console.error("getAllRecipes error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    return res.json(recipe);
  } catch (err: any) {
    console.error("getRecipeById error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    return res.json(recipe);
  } catch (err: any) {
    console.error("updateRecipe error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    return res.json({ success: true });
  } catch (err: any) {
    console.error("deleteRecipe error:", err);
    return res.status(500).json({ error: err.message });
  }
};
