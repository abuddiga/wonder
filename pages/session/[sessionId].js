// import { TextInputField, Button, Select } from 'evergreen-ui'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
// import { getActivities } from '../../fetchData/getActivities'
import firebase from '../../firebase/clientApp'
import { useState, useEffect } from 'react'
import cookieCutter from 'cookie-cutter'
import Cookies from 'cookies'
import ActivityStack from '../../components/ActivityStack'

export default function Session({ sessionId, userKey }) {
  const [activities, setActivities] = useState([])
  const [currentIndex, setIndex] = useState(0)

  useEffect(async function getActivities() {

    const store = firebase.firestore()
    const activitiesCollection = await store.collection('activities').limit(5).get()
    const activities = activitiesCollection.docs.map(doc => doc.data())
    setActivities(activities)
  }, [])

  async function updateFavoriteActivities(activityId) {
    const store = firebase.firestore()
    const userRef = store.collection('users').doc(userKey)
    const userDoc = await userRef.update({
      favorite_activities: firebase.firestore.FieldValue.arrayUnion(activityId)
    })

  }

  return (
    <div className={styles.container}>
      {activities.length && currentIndex < activities.length ? <ActivityStack activities={activities} currentIndex={currentIndex} setIndex={setIndex} updateFavoriteActivities={updateFavoriteActivities}/> : <h1>foo</h1>}
    </div>
  )
}

export function getServerSideProps(context) {
  const host = context.req.headers.host
  const cookies = new Cookies(context.req, context.res)
  const sessionId = cookies.get('sessid')
  const userKey = cookies.get('guk')
  return {
    props: {
      sessionId,
      userKey,
      host
    }
  }
}
