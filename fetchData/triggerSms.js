export const accountSid = process.env.TWILIO_ACCOUNT_SID; //"AC738b25608ab66c0b66dd805e71c939f1";
export const authToken = process.env.TWILIO_AUTH_TOKEN; // "ac9db8c663ed1924aa3a21627d074119";
export const fromPh = process.env.TWILIO_PHONE_NUMBER; // "+12029524896"
export const twilioUrl = "https://conversations.twilio.com/v1/Conversations/"
//Sending POST in below format
//curl -X POST https://api.twilio.com/2010-04-01/Accounts/AC738b25608ab66c0b66dd805e71c939f1/Messages.json --data-urlencode "Body=Hi there$EXCLAMATION_MARK" --data-urlencode "From=+12029524896" --data-urlencode "MediaUrl=https://www.sftravel.com/sites/sftravel.prod.acquia-sites.com/files/field/image/Alamo-Sq.jpg" --data-urlencode "To=+15167430518" -u AC738b25608ab66c0b66dd805e71c939f1:6335ec0f045a035a0bd2606f14b13bdd
//

export default async function triggerSMS(toPh, activityMatch) {

	console.log('toPh: ', toPh)
	console.log('activityMatch: ', activityMatch)

	const res = await fetch(
		`${twilioUrl}?${accountSid}=${authToken}`,
		{
			body: JSON.stringify({
        Body: `${activityMatch.title}. ${activityMatch.description}`,
				From: fromPh,
				MediaUrl: activityMatch.img_link,
				To: toPh
      }),
			headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		}
	)

	const result = await res.json()

}
