import { Container } from 'typedi';
import { RecipeRepository } from './repositories.js';
import type { Recipe } from './types.js';
import { RecipeError } from '@/errors/recipe.js';

export class RecipeUsecase {
  constructor(private readonly recipeRepository: RecipeRepository = Container.get(RecipeRepository)) {
    this.recipeRepository = recipeRepository;
  }

  async createRecipe(recipe: Recipe): Promise<Recipe[]> {
    try {
      await this.recipeRepository.createRecipe(recipe);
    } catch (error) {
      throw new RecipeError('Recipe creation failed!', 200, { required: 'title, making_time, serves, ingredients, cost' });
    }

    return [recipe];
  }

  getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.getRecipes();
  }

  async getRecipeById(id: number): Promise<Recipe[]> {
    const recipe = await this.recipeRepository.getRecipeById(id);
    return [recipe];
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
