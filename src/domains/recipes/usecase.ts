import { Container } from 'typedi';
import { RecipeRepository } from './repositories.js';
import type { Recipe } from './types.js';
import { RecipeError } from '@/errors/recipe.js';

export class RecipeUsecase {
  constructor(private readonly recipeRepository: RecipeRepository = Container.get(RecipeRepository)) {
    this.recipeRepository = recipeRepository;
  }

  createRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipeRepository.createRecipe(recipe);
  }

  getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.getRecipes();
  }

  getRecipeById(id: number): Promise<Recipe> {
    return this.recipeRepository.getRecipeById(id);
  }

  async updateRecipe(id: number, recipe: Recipe): Promise<Recipe> {
    const result = await this.recipeRepository.updateRecipe(id, recipe);
    if (result === 1) {
      return recipe;
    } else {
      throw new RecipeError('No recipe found', 200);
    }
  }

  async deleteRecipe(id: number): Promise<void> {
    const result = await this.recipeRepository.deleteRecipe(id);
    if (result === 0) {
      throw new RecipeError('No recipe found', 200);
    }
  }
}
