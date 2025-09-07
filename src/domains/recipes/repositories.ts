import { Container, Service } from 'typedi';
import type { Recipe } from './types.js';

export class RecipeRepository {
  constructor(private readonly connection: any = Container.get('mysql')) {
    this.connection = connection;
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const [result] = await this.connection.query(
      'INSERT INTO recipes (title, making_time, serves, ingredients, cost) VALUES (?, ?, ?, ?, ?)',
      [recipe.title, recipe.making_time, recipe.serves, recipe.ingredients, recipe.cost],
    );

    const insertId = result.insertId;

    const [rows] = await this.connection.query('SELECT * FROM recipes WHERE id = ?', [insertId]);
    return rows[0] as Recipe;
  }

  async getRecipes(): Promise<Recipe[]> {
    const [rows] = await this.connection.query('SELECT * FROM recipes');
    return rows as Recipe[];
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const [rows] = await this.connection.query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows[0] as Recipe;
  }

  async updateRecipe(id: number, recipe: Recipe): Promise<number> {
    const [result] = await this.connection.query(
      'UPDATE recipes SET title = ?, making_time = ?, serves = ?, ingredients = ?, cost = ? WHERE id = ?',
      [recipe.title, recipe.making_time, recipe.serves, recipe.ingredients, recipe.cost, id],
    );
    return result.affectedRows;
  }
}
