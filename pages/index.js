import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'evergreen-ui'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image alt="Kick it logo" src="/logo.png" width={200} height={133.33} />
        <h3 className={styles.title}>
          Welcome to Kick It
          
        </h3>
        <div className={styles.grid}>
          <Link href="/start" className={styles.card}>
            <Button>Start a Session</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
