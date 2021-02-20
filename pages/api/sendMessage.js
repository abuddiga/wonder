import { accountSid, authToken, fromPh } from '../../fetchData/triggerSms'

export default async (req, res) => {
  const toPhs = req.body.toPhs
  const activityMatch = req.body.activityMatch

  console.log('toPh: ', toPhs)
  console.log('activityMatch: ', activityMatch)

  console.log('accountSid', accountSid)
  console.log('authToken', authToken)

  const client = require('twilio')(accountSid, authToken);

  const results = await Promise.all(
    toPhs.map(async toPh => {
      return client.messages
      .create({
        body: `${activityMatch.title}. ${activityMatch.description}`,
        mediaUrl: activityMatch.img_link,
        from: fromPh,
        to: toPh
      })
      .then(message => {
        console.log('message: ', message.sid)
        return null
      })
      .catch(err => {
        console.log('error: ', err)
        return err
      })
    })
  )

  const ok = results.reduce((acc, curr) => {
    return acc && curr === null
  }, true)

  console.log('results: ', results)
  console.log('ok: ', ok)

  if (ok) {
    res.statusCode = 200
    res.json({ ok: true })
  } else {
    res.statusCode = 500
    res.json({
      err: results
    })
  }
}
