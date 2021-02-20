// import { TextInputField, Button, Select } from 'evergreen-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
// import { getActivities } from '../../fetchData/getActivities'
// import firebase from '../firebase/clientApp'
// import { useState } from 'react'
import cookieCutter from 'cookie-cutter'

export default function Session({activities}) {
  const router = useRouter()
  const { sessionId } = router.query
  let userKey
  // const userKey = cookieCutter.set('foo', 'bar')
  console.log('sessionId: ', sessionId)
  // console.log('userKey: ', userKey)
  console.log('activities: ', activities)

  return (
    <div className={styles.container}>
      <h3>Start swiping! {userKey}</h3>
    </div>
  )
}

export async function getServerSideProps(context) {
  // console.log('firebase: ', firebase)
  console.log('rinning server side props')
  const activities = undefined// await getActivities()
  if (!activities) {
    return {
      notFound: true
    }
  }
  // console.log('cookieCutter: ', cookieCutter.get('guk'))
  return {
    props: {
      activities
    }, // will be passed to the page component as props
  }
}