import React from 'react'
import './App.css'
import Recipe from './Recipe'

const App = () => {

  const APP_ID = "c97e156a"
  const APP_KEY = "8af383342e1c3d8408f8c59afbecc1f3"

  const [recipes, setRecipes] = React.useState([])
  const [search, setSearch] = React.useState("")
  const [query, setQuery] = React.useState("chicken")

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const recipes = await response.json()
    setRecipes(recipes.hits)
  }

  React.useEffect(() => {
    getRecipes()
  }, [query])

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <div className='app'>
      <form className="search-form" onSubmit={getSearch}>
        <input 
          type="text" 
          name="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Recipes...'
          className="search-bar"
        />
        <button className='search-button' type='submit'>Submit</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => <Recipe 
          key={recipe.recipe.label} 
          title={recipe.recipe.label} 
          image={recipe.recipe.image} 
          calories={recipe.recipe.calories} 
          ingredients={recipe.recipe.ingredients} 
        />)}
      </div>
    </div>
  )
}

export default App
