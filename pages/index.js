import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/meals">
          <a>Meals</a>
        </Link>
      </li>
      <li>
        <Link href="/ingredients">
          <a>Ingredients</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
