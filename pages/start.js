import { TextInputField } from 'evergreen-ui'
import styles from '../styles/Home.module.css'

export default function Start() {
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
      </div>
    </div>
  )
}