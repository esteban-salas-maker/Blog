import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [data, setData] = useState([])

  useEffect(() => {
    const getPost = async () => {
      const data = await fetch(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/esalas`)
      const { response } = await data.json()
      setData(response)
      }
    getPost()
  }, [data])

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>My blog</h1>
        <p className={styles.p}>All your blogs</p>
        <article>
          <ul className={styles.ul_list}>
            {
              data?.map((entry) => (
                <li key={entry?.id}>
                  <div dangerouslySetInnerHTML={{ __html: entry?.text }} />
                </li>
              ))
            }
          </ul>
        </article>
        <section>
          <h2>Create a New Blog</h2>
          <button
            className={styles.button}
          >
            <Link href={'/create'} >
              New Blog
            </Link>
          </button>
        </section>
      </section>
    </>
  )
}
