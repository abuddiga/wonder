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

function mostFrequent(arr) {
  return Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0]
}

function getHighestVotedActivity(groupActivities = []) {
  const flattenedActivities = groupActivities.reduce((acc, curr) => {
    return acc.concat(curr)
  }, [])
  console.log('flattenedActivities: ', flattenedActivities)
  const highestVotedActivity = mostFrequent(flattenedActivities)
  console.log('highestVotedActivity: ', highestVotedActivity)
  return highestVotedActivity
}

export default function Complete() {
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [user, setUser] = useState(``)
  const [groupSize, setGroupSize] = useState(0)
  const [activityMatch, setActivityMatch] = useState(null)

  useEffect(async function initializeSession() {
    const sessionId = cookieCutter.get('sessid')
    const userKey = cookieCutter.get('guk')
    console.log('userKey: ', userKey)

    const store = firebase.firestore()
    if (!sessionId) {
      document.cookie = ""
      // cookieCutter.set('sessid', '') // not working yet
      // cookieCutter.set('guk', '') // not working yet
      router.push('/')
    } else {
      const sessionRef = await store.collection('sessions').doc(sessionId).get()
      const userRef = await store.collection('users').doc(userKey).get()
      setUser(userRef.data())
      const sessionData = sessionRef.data()
      setGroupSize(sessionData.groupSize)
      setUsers(sessionData.users)
      console.log('user: ', userRef.data())
    }
  }, [])

  async function runMatch() {
    const store = firebase.firestore()
    const sessionId = cookieCutter.get('sessid')

    const sessionRef = await store.collection('sessions').doc(sessionId).get()
    const sessionData = sessionRef.data()
    // setUsers(sessionData.users)

    const groupUsers = await Promise.all(sessionData.users.map(async userKey => {
      const userRef = await store.collection('users').doc(userKey).get()
      const user = userRef.data()
      return user
    }))

    console.log('groupUsers: ', groupUsers)
    const groupActivities = groupUsers.map(user => user.favorite_activities)
    const groupPhoneNumbers = groupUsers.map(user => user.phone_number)

    console.log('groupActivities: ', groupActivities)
    console.log('groupPhoneNumbers: ', groupPhoneNumbers)
    const highestVotedActivity = getHighestVotedActivity(groupActivities)

    if (highestVotedActivity !== undefined) {
      const activityRef = await store.collection('activities').doc(highestVotedActivity.toString()).get()
      const activityMatch = activityRef.data()
      setActivityMatch(activityMatch)
      console.log('calling api')
      console.log('groupPhoneNumbers: ', groupPhoneNumbers)

      const cleanPhoneNumbers = groupPhoneNumbers.map(phoneNumber => `+1${phoneNumber.replace(/-/g,'')}`)
      console.log('clean numbers: ', cleanPhoneNumbers)

      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toPhs: cleanPhoneNumbers,
          activityMatch
        })
      })
      console.log('res: ', res.json())
    } else {
      console.log('Err, No highest voted activity: ', highestVotedActivity)
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
        {/* <Button onClick={() => callSms()}>Call Sms</Button> */}
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