export class RecipeError extends Error {
  status: number;
  meta: Record<string, any> | undefined;
  constructor(message: string, status: number, meta?: Record<string, any> | undefined) {
    super(message);
    this.name = 'RecipeError';
    this.status = status;
    this.meta = meta;
  }
}
