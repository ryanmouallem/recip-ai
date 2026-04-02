export type Recipe = {
    id: string;
    title: string;
    servingSize: number;
    prepTime: number;
    instructions: string[];
}

export type SavedRecipe = Recipe & { savedId: string }