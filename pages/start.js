import {TextInputField, Button, Select } from 'evergreen-ui'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import firebase from '../firebase/clientApp'
import cookieCutter from 'cookie-cutter'
import Image from 'next/image'

export default function Start() {
  // const { loadingUser, user } = useUser()

  const [name, setName] = useState(``)
  const [phoneNumber, setPhoneNumber] = useState(``)
  const [groupSize, setGroupSize] = useState(1)

  // useEffect(() => {
  //   if (!loadingUser) {
  //     // You know that the user is loaded: either logged in or out!
  //     console.log(user)
  //   }
  //   // You also have your firebase app initialized
  //   console.log(firebase)
  // }, [loadingUser, user])

  const createSession = async () => {
    const store = firebase.firestore()

    const captain = {
      name,
      phone_number: phoneNumber,
      role: "captain",
      favorite_activities: []
    }
    const usersRef = await store.collection('users').add(captain)
    console.log('usersRef: ', usersRef.id)

    const sessionRef = await store.collection('sessions').add({
      groupSize: Number(groupSize),
      users: [usersRef.id]
    })

    console.log('docRef: ', sessionRef.id)
    // alert(`Session created!! session id: ${sessionRef.id}`)
    cookieCutter.set('guk', usersRef.id)
    cookieCutter.set('sessid', sessionRef.id)
  }

  return (
    <div className={styles.container}>
      <h1 style={{textAlign:"center", color:"#325370"}}>We help you kick it.</h1>
      <label style={{marginBottom:"1rem", color:"#325370", flex:"none"}}>How big is your crew?</label>
      <Select style={{flex:"none", marginBottom:"30px"}} id="group-select" onChange={e => setGroupSize(e.target.value)}>
          <option value={2} defaultValue>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
      </Select>
      <label style={{marginBottom:"1rem", color:"#325370"}}>What should we call you?</label>
      <TextInputField
        onChange={e => setName(e.target.value)}
        value={name}
        placeholder="Scout Finch"
        name="text-input-name"
        marginBottom={30}
      />
      <label style={{marginBottom:"1rem", color:"#325370"}}>Can I have yo numba?</label>
      <TextInputField
        onChange={e => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        placeholder="555-555-555"
        type="tel"
        name="text-input-number"
        marginBottom={30}
      />
      <Link href="/invite">
        <Button height={56} onClick={createSession}>Let's Kick It</Button>
      </Link>
    </div>
  )
}