export class RecipeError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'RecipeError';
    this.status = status;
  }
}
