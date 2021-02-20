import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'evergreen-ui'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Kick It
        </h1>
        <div className={styles.grid}>
          <Link href="/start" className={styles.card}>
            <Button>Start a Session</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
