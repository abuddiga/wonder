import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'evergreen-ui'
import ericStyles from '../styles/eric.module.css'
import styles from '../styles/Home.module.css'
import Image from 'next/image'


export default function Home() {
  return (
    <div className={styles.container2}>
      <main className={styles.main}>
        <div className={styles.verticalCenter}>
          <Image alt="Kick it logo" src="/logo.png" width={200} height={133.33} />
        </div>
          <h3 className={styles.tagline}>
          <div className = {styles.row}>
            Life is short.  
          </div>
            Plan less, enjoy more.
          </h3>
        <div className={styles.containercard}>
          <div className={styles.grid2}>
            <p className={styles.value3}>
              👯‍ Gather your crew
            </p>
            <p className={styles.value3}>
              👆 Swipe on activities
            </p>
            <p className={styles.value3}>
              ♥️ Receive your top match
            </p>

            <Link href="/start" className={styles.cardCenter}>
              <Button className={styles.pinkbutton} style={{display:"inline", textAlign:"center"}}> Let's kick it! </Button>
            </Link>
          </div>
        </div> 
      </main>
    </div>
  )
}
