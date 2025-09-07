import { z } from 'zod';

// recipes: [
//   {
//     id: 1,
//     title: 'Chicken Curry',
//     making_time: '45 min',
//     serves: '4 people',
//     ingredients: 'onion, chicken, seasoning',
//     cost: '1000',
//   },

const recipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  making_time: z.string(),
  serves: z.string(),
  ingredients: z.string(),
  cost: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;

export const recipeResponseSchema = z.object({
  message: z.string(),
  recipe: z.array(recipeSchema),
});

export type RecipeResponse = z.infer<typeof recipeResponseSchema>;
