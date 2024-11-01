import { SPOONACULAR_API_KEY } from '@env';

const fetchRecipes = async () => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=pasta`;
  const response = await fetch(url);
  const data = await response.json();
};
