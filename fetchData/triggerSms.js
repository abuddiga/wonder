export const accountSid = "ACe713c9f5f1596ddf465a1523c7aff698";
export const authToken = "d12a91fd13578b0507f1fb57c9e621f0";
export const fromPh = "+17725772905"
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
