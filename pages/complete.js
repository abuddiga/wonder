import { TextInputField, Button, Select } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import firebase from '../firebase/clientApp'
import cookieCutter from 'cookie-cutter'
import Cookies from 'cookies'
import intersection from 'lodash/intersection'
import triggerSms from '../fetchData/triggerSms'

export default function Complete() {
  const router = useRouter()

  const [session, setSession] = useState({
    groupSize: 10,
    users: []
  })
  const [user, setUser] = useState(``)
  const [activityMatch, setActivityMatch] = useState(null)

  useEffect(async function initializeSession() {
    const sessionId = cookieCutter.get('sessid')
    const userKey = cookieCutter.get('userKey')

    // const [session, setSession] = useState({
    //   groupSize: 10,
    //   users: []
    // })
    // const [user, setUser] = useState(userKey)

    const store = firebase.firestore()
    // const session = await store.collection('sessions').doc(path).get()
    // console.log('session: ', session.data())
    if (!sessionId) {
      document.cookie = ""
      // cookieCutter.set('sessid', '') // not working yet
      // cookieCutter.set('guk', '') // not working yet
      router.push('/')
    } else {
      const sessionRef = await store.collection('sessions').doc(sessionId).get()
      const userRef = await store.collection('users').doc(userKey).get()
      setUser(userRef.data())
      setSession(sessionRef.data())
      console.log('user: ', userRef.data())
    }
  }, [])

  async function runMatch() {
    const store = firebase.firestore()
    const groupActivities = await Promise.all(session.users.map(async userKey => {
      const userRef = await store.collection('users').doc(userKey).get()
      const user = userRef.data()
      if (user.favorite_activities && user.favorite_activities.length) {
        return user.favorite_activities
      } else {
        return []
      }
    }))

    //TODO: There's a bug here in the matching, not sure what the deal is

    console.log('groupActivities: ', groupActivities)
    const activityMatches = intersection.apply(null, groupActivities)
    console.log('activityMatches: ', activityMatches)
    if (activityMatches.length) {
      const activityRef = await store.collection('activities').doc(activityMatches[0].toString()).get()
      const activityMatch = activityRef.data()
      setActivityMatch(activityMatch)
      console.log('calling api')
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toPh: '+17196618770',
          activityMatch
        })
      })
      console.log('res: ', res.json())
    }
  }

  async function callSms() {
    console.log('calling api...')
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toPh: '+17196618770',
          activityMatch: {foo: 'bar'}
        })
      })
      console.log('res: ', res.json())
  }

  if(!activityMatch) {
    return (
      <div className={styles.container}>
        <p>{`Nice! That’s it for this session. We’re still waiting on xyz group members to finish. Hang tight and we’ll automatically text your group when everyone is done.`}</p>
        <p>{`Flaky friend? You can always close out the kick-it by tapping below, and we'll text the group where you're all headed!`}</p>
        <Button onClick={() => runMatch()}>Close out Kick It</Button>
        <Button onClick={() => callSms()}>Call Sms</Button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <img src={activityMatch.img_link}/>
      <h3>{`You're going to ${activityMatch.title}!`}</h3>
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