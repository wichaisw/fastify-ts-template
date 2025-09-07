import { z } from 'zod';

const zodToFastifySchema = <T extends z.ZodType>(schema: T) => {
  const { $schema, ...jsonSchema } = z.toJSONSchema(schema);
  return jsonSchema;
};

const recipeParamsSchema = z.object({
  id: z.number(),
});
export type RecipeParams = z.infer<typeof recipeParamsSchema>;
export const recipeParamsJsonSchema = zodToFastifySchema(recipeParamsSchema);

const recipeSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  making_time: z.string().optional(),
  serves: z.string().optional(),
  ingredients: z.string().optional(),
  cost: z.string().optional(),
});
export const recipeJsonSchema = zodToFastifySchema(recipeSchema);
export type Recipe = z.infer<typeof recipeSchema>;

export const recipeResponseSchema = z.object({
  message: z.string(),
  recipe: z.array(recipeSchema),
});
export type RecipeResponse = z.infer<typeof recipeResponseSchema>;
