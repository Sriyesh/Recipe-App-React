import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

function Searched() {

  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  useEffect(()=>{
    getSearched(params.search);
  },[params.search]);

  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);

}

const renderedSearchResult = searchedRecipes.map((recipe)=>{
  return(
      <Card key={recipe.id}>
        <Link to={'/recipe/'+recipe.id}>
          <img src={recipe.image} alt={recipe.title} />
          <h4>{recipe.title}</h4>
          </Link>
      </Card>
  )
})

  return (
    <Grid>
      {renderedSearchResult}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }

    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched