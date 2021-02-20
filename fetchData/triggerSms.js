const accountSid = "AC738b25608ab66c0b66dd805e71c939f1";
const authToken = "6335ec0f045a035a0bd2606f14b13bdd";
const fromPh = "+12029524896"
const twilioUrl = "https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json" 
//Sending POST in below format
//curl -X POST https://api.twilio.com/2010-04-01/Accounts/AC738b25608ab66c0b66dd805e71c939f1/Messages.json --data-urlencode "Body=Hi there$EXCLAMATION_MARK" --data-urlencode "From=+12029524896" --data-urlencode "MediaUrl=https://www.sftravel.com/sites/sftravel.prod.acquia-sites.com/files/field/image/Alamo-Sq.jpg" --data-urlencode "To=+15167430518" -u AC738b25608ab66c0b66dd805e71c939f1:6335ec0f045a035a0bd2606f14b13bdd
//

function triggerSMS(toPh) {

	const res = await fetch(
		`${twilioUrl}?${accountSid}=${authToken}`,
		{
			body: JSON.stringify({
          			Body: "Picnic at Alamo Square. Alamo Square is famous for the row of Victorian houses known as the Painted Ladies, which makes an appearance in the opening credits of Full House.",
				From: fromPh,
				MediaUrl: "https://www.sftravel.com/sites/sftravel.prod.acquia-sites.com/files/field/image/Alamo-Sq.jpg",
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
