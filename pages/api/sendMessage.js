import { accountSid, authToken, fromPh } from '../../fetchData/triggerSms'

export default (req, res) => {
  const toPh = req.body.toPh
  const activityMatch = req.body.activityMatch

  console.log('toPh: ', toPh)
  console.log('activityMatch: ', activityMatch)

  console.log('accountSid', accountSid)
  console.log('authToken', authToken)

  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: `${activityMatch.title}. ${activityMatch.description}`,
      mediaUrl: activityMatch.img_link,
      from: fromPh,
      to: toPh
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err))

  res.statusCode = 200
  res.json({ ok: true })
}
