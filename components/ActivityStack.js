import { TextInputField, Button, Select } from 'evergreen-ui'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function ActivityStack({ activities, currentIndex, setIndex, updateFavoriteActivities, goToNextPage }) {
  function handleSwipeLeft(e) {
    if (currentIndex + 1 === activities.length) {
      goToNextPage()
    } else {
      setIndex(currentIndex+1)
    }
  }

  function handleSwipeRight(e) {
    console.log('chose activity: ', activity)
    updateFavoriteActivities(activity.id)
    if (currentIndex + 1 === activities.length) {
      goToNextPage()
    } else {
      setIndex(currentIndex+1)
    }
  }

  console.log('curfrentIndex: ', currentIndex)

  const activity = activities[currentIndex]

  return (
    <div className={styles.container}>
      <img className={styles.swipeimage} src={activity.img_link}/>
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
        <div className={styles.row}>
          <div className={styles.column}>
              <Button primary onClick={() => handleSwipeLeft()}>Nah</Button>
          </div>
          <div className={styles.column}>
            <Button primary onClick={() => handleSwipeRight()}>Yay</Button>
          </div>
        </div>
    </div>
  )
}