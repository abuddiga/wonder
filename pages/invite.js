import { TextInputField, Button, Select } from 'evergreen-ui'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import cookieCutter from 'cookie-cutter'
import Cookies from 'cookies'

export default function Invite({sessionId, userKey, host}) {

  console.log('sessionId: ', sessionId)
  console.log('userKey: ', userKey)
  const url = host ? `http://${host}/${sessionId}` : `${window.location.origin}/${sessionId}`

  return (
    <div className={styles.container}>
      <h3>Great, now share this link with your crew to find an activity!</h3>
      <p>{url}</p>
      <a href={`/session/${sessionId}`}>
        <Button>Find Places to Kick It</Button>
      </a>
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