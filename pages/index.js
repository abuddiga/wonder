import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Kick It
        </h1>
        <div className={styles.grid}>
          <a href="/start" className={styles.card}>
            <p>Start a Session</p>
          </a>
        </div>
      </main>
    </div>
  )
}
