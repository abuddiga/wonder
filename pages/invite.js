import { TextInputField, Button, Select } from 'evergreen-ui'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import akshayStyles from '../styles/akshay.module.css'
import cookieCutter from 'cookie-cutter'
import Cookies from 'cookies'

export default function Invite({sessionId, userKey, host}) {

  console.log('sessionId: ', sessionId)
  console.log('userKey: ', userKey)
  console.log('host: ', host)
  let url
  if (host) {
    url = `http://${host}/${sessionId}`
  } else {
    sessionId = cookieCutter.get('sessid')
    userKey = cookieCutter.get('guk')
    url = `${window.location.origin}/${sessionId}`
  }

  return (
    <div className={styles.container}>
      <div className={akshayStyles.inviteBox}>
        <h3 className={akshayStyles.inviteBoxTitle}>
          Get ready to kick it! Share the link with your crew 👇
        </h3>
        <div className={akshayStyles.shareLink}>
          <img src={`/share.svg`} alt={`share`} />
          <div className={akshayStyles.shareDiv}>Share it with friends</div>
        </div>
        <div className={akshayStyles.orDiv}>OR</div>
        <div className={akshayStyles.copyLink}>
          <img src={`/copy.svg`} alt={`copy`} />
          <div className={akshayStyles.copyDiv}>Copy url to share</div>
        </div>
        <div className={akshayStyles.urlDiv}>{url}</div>
      </div>
      <a href={`/session/${sessionId}`}>
        <Button height={45} className={styles.colorbutton}>Find Places to Kick It</Button>
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