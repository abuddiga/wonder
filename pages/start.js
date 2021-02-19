import { TextInputField, Button, Select } from 'evergreen-ui'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import firebase from '../firebase/clientApp'

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
    const sessionId = Math.random() * 10e16
    const userKey = Math.random() * 10e6
    const users = [{
      name,
      phone_number: phoneNumber,
      role: "captain",
      user_key: userKey,
      favorite_activities: []
    }]

    const store = firebase.firestore()
    console.log('users: ', users)
    const docRef = await store.collection('sessions').add({
      groupSize: Number(groupSize),
      users
    })
    console.log('docRef: ', docRef)
    alert(`Session created!! session id: ${docRef.id}`)
  }

  return (
    <div className="styles.container">
      <div className={styles.grid}>
        <Select onChange={e => setGroupSize(e.target.value)}>
            <option value={1} selected>1</option>
            <option value={2}>2</option>
            <option value={3}>2</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
        </Select>
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
        <Button onClick={createSession}>Let's Kick It</Button>
      </div>
    </div>
  )
}