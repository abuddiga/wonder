import { TextInputField, Button, Select } from 'evergreen-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
// import { getActivities } from '../../fetchData/getActivities'
import firebase from '../../firebase/clientApp'
import { useState, useEffect } from 'react'
import cookieCutter from 'cookie-cutter'
import Cookies from 'cookies'
import ActivityStack from '../../components/ActivityStack'

export default function Session({ sessionId: sessionIdCookie, userKey }) {
  const router = useRouter()
  const path = router.query.sessionId

  const [sessionId, setSession] = useState(sessionIdCookie)
  const [user, setUser] = useState(userKey)
  const [activities, setActivities] = useState([])
  const [currentIndex, setIndex] = useState(0)
  const [name, setName] = useState(``)
  const [phoneNumber, setPhoneNumber] = useState(``)

  useEffect(async function initializeSession() {
    const store = firebase.firestore()
    const session = await store.collection('sessions').doc(path).get()
    console.log('session: ', session.data())
    if (!session.exists) {
      document.cookie = ""
      // cookieCutter.set('sessid', '') // not working yet
      // cookieCutter.set('guk', '') // not working yet
      router.push('/')
    } else {
      if (!sessionId) {
        setSession(path)
        cookieCutter.set('sessid', path)
      }
      const activitiesCollection = await store.collection('activities').limit(5).get()
      const activities = activitiesCollection.docs.map(doc => doc.data())
      setActivities(activities)
    }
  }, [])

  async function updateFavoriteActivities(activityId) {
    const store = firebase.firestore()
    const userRef = store.collection('users').doc(user)
    const userDoc = await userRef.update({
      favorite_activities: firebase.firestore.FieldValue.arrayUnion(activityId)
    })
  }

  async function createSession() {
    const store = firebase.firestore()

    const member = {
      name,
      phone_number: phoneNumber,
      role: "member",
      favorite_activities: []
    }
    const usersRef = await store.collection('users').add(member)
    console.log('usersRef: ', usersRef.id)
    cookieCutter.set('guk', usersRef.id)

    const sessionRef = await store.collection('sessions').doc(sessionId)
    const sessionDoc = await sessionRef.update({
      users: firebase.firestore.FieldValue.arrayUnion(usersRef.id)
    })
    setUser(usersRef.id)
  }

  if (!user || !user.length) {
    return (
      <div className={styles.container}>
        <div className={"member-info"}>
          <h3>{`Swipe through these activities to let us know what you like. We'll text your crew after you're all done.`}</h3>
          <p>{`Enter your name & phone number to get started.`}</p>
          <TextInputField
            onChange={e => setName(e.target.value)}
            value={name}
            label="Name"
            placeholder="Scout Finch"
            name="text-input-name"
            className={styles.input}
            required
          />
          <TextInputField
            onChange={e => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            label="Phone Number"
            placeholder="555-555-555"
            type="tel"
            name="text-input-number"
            className={styles.input}
            required
          />
          <Button onClick={() => createSession()}>Let's Kick It</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {
        activities.length && currentIndex < activities.length ?
        <ActivityStack activities={activities} currentIndex={currentIndex} setIndex={setIndex} updateFavoriteActivities={updateFavoriteActivities}/> :
        <h1>foo</h1>
      }
    </div>
  )
}

export function getServerSideProps(context) {
  const host = context.req.headers.host
  const cookies = new Cookies(context.req, context.res)
  const sessionId = cookies.get('sessid') || null
  const userKey = cookies.get('guk') || null
  return {
    props: {
      sessionId: sessionId,
      userKey: userKey,
      host
    }
  }
}
