import { TextInputField, Button } from 'evergreen-ui'
import styles from '../styles/Home.module.css'
// import { useEffect } from 'react'
import firebase from '../firebase/clientApp'

export default function Start() {
  // const { loadingUser, user } = useUser()

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
      name: "foobar",
      phone_number: "123-123-1234",
      role: "captain",
      user_key: userKey,
      favorite_activities: []
    }]

    const db = firebase.firestore()
    await db.collection('sessions').doc(sessionId).set(users)
    alert('Session created!!')
  }

  return (
    <div className="styles.container">
      <div className={styles.grid}>
        <TextInputField
          label="Name"
          placeholder="Scout Finch"
          name="text-input-name"
          className={styles.input}
          required
        />
        <TextInputField
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