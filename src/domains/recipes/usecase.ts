import { Container } from 'typedi';
import { RecipeRepository } from './repositories.js';
import type { Recipe } from './types.js';

export class RecipeUsecase {
  constructor(private readonly recipeRepository: RecipeRepository = Container.get(RecipeRepository)) {
    this.recipeRepository = recipeRepository;
  }

  createRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipeRepository.createRecipe(recipe);
  }
}
