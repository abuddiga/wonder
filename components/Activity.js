import { Button } from 'evergreen-ui'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import akshayStyles from '../styles/akshay.module.css'

export default function Activity({ activity, handleSwipeLeft, handleSwipeRight}) {
  return (
    <div className={styles.activity}>
      <div className={styles.activityCard}>
        <img className={styles.activityImage} src={activity.img_link}/>
        <div className={styles.activityBackground}></div>
        <div className={styles.activitySection}>
          <h3 className={styles.activityTitle}>{activity.title}</h3>
          <p className={styles.activityDescription}>{activity.description}</p>
        </div>
      </div>
      <div className={akshayStyles.buttonRow}>
        {/* <Button height={56} onClick={() => handleSwipeLeft()}>Nah Bro</Button>
        <Button height={56} primary onClick={() => handleSwipeRight()}>Yay</Button> */}
        <img
          src={`/swipeleft.svg`}
          alt='Swipe Left'
          onClick={() => handleSwipeLeft()}
        />
        <img
          src={`/swiperight.svg`}
          alt='Swipe Right'
          onClick={() => handleSwipeRight()}
        />
      </div>
    </div>
  )
}
