import { TextInputField, Button, Select } from 'evergreen-ui'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function ActivityStack({ activities, currentIndex, setIndex, updateFavoriteActivities }) {
  function handleSwipeRight(e) {
    console.log('chose activity: ', activity)
    updateFavoriteActivities(activity.title)
    setIndex(currentIndex+1)
  }

  console.log('curfrentIndex: ', currentIndex)

  const activity = activities[currentIndex]

  return (
    <div className={styles.container}>
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
      <Button onClick={() => setIndex(currentIndex+1)}>Nah Bro</Button>
      <Button primary onClick={() => handleSwipeRight()}>Yay</Button>
    </div>
  )
}