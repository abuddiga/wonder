import { TextInputField, Button, Select } from 'evergreen-ui'
import Link from 'next/link'
import Activity from './Activity'
import styles from '../styles/Home.module.css'
import akshayStyles from '../styles/akshay.module.css'
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

  console.log('currentIndex: ', currentIndex)

  const activity = activities[currentIndex]

  return (
    <div className={styles.container}>
      <h2 className={akshayStyles.swipeTitle}>Where should we kick it?</h2>
      <Activity
        activity={activity}
        handleSwipeLeft={handleSwipeLeft}
        handleSwipeRight={handleSwipeRight}
      />
    </div>
  )
}
