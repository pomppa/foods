import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li key="meals">
        <Link href="/meals">
          <a>Meals</a>
        </Link>
      </li>
      <li key="ingredients">
        <Link href="/ingredients">
          <a>Ingredients</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
