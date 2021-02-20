import * as admin from 'firebase-admin'

const FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDTKK+hZBwt3Nux\nnWO55Tea9PcGUfKst/xnJdap4WRxDa2CS2hkuOCxWUN3xMYgVLXXECHWUE1xHlOF\ndvoBeNSFe0zXWPWA2+5OFQkP+YetQAK6AmR5kJCQRCgXuT1TdSZZVir8eD0jqS/x\nao5m8Sas/yB0lDkaUO+vqznRZnQNvttB8TivhlVWZM8FPIwCX2tslxQFLJfnfJBg\nv3QIity5mMGBq+SwFHfi4m7GUVnfpYHzQQ9Fk6c0XfmgODkhG9yrHYispDQnqf1R\nNqO2L6uir3WRRcivKl2LrkGUmT5njo5I4Nmf6HV5QQmq4QmF/e4DSy368XH7ANik\nCF/YWAU7AgMBAAECggEABkCTprc0oGUEOkebPtNbKKLtN4owoc2W0yULLJ+IXlKV\n2yBJeIYC3S1z8nVommd3tOT844AgMuO/fFmwAGAoBsXGWi//oO+iKDy2NntgeZBG\nJGTSvci6hxMFjuJEvxZeatHC1xPmV4p4aXEKw2CLkR7CwsDqye0wk6aBwUID2K5K\nvderjotrpXSem/KpKNVCUN7liEyd8PqNIEHiDqBKzGUis9ll6oaUljH00j0Un2yg\n2kAExzAfkULww0tLY4vD+uNv0TEdP5/oAqAlxOjhtXqOAx+Yun/n+H9MGykstpAC\nUhUiZVOBZFASJR49WjwULsF3w0X9N+plN2RUgxbPjQKBgQDz/trDJunsdfsPVUS2\nbq7cGCMNTXKrxHv9fQNGRwENZ5e6/w9CxGnZkqzyzMPwpFN6rYnbYpjFcAFw9Hso\nu6INvsDblxfWgn0JIaffax+CJiaXDUl+gwfsVvfAbv3JbKVkZ8a/teaHB3ksfELS\nNyqbsMrHRYr+wLYXf5OpXF7urwKBgQDdjEBsqpWoBNrugwMZhNvgpPcbNMVvIBnS\n1RcZcDoBXG9NOVB6Ft9OufDhmN1PTs/qAEY0lcBGC4io1F0hb4w1V7GbyPmbfIW4\nrvnnT8riyw+hrLxkR+MOaDG1ZQapljkPN+oVXi4p1acWFSv5G9h6QFeRa577H24o\nqlp487fVNQKBgBLOEpg12JOT6DyfSsNwtmNaLOFqlartYsz/pI/3Cvq4gDY2UDvK\nHYpaRqAT7goO8CwlUdmpuLKG1mWZQiC6jVvX1s9Vzs2GkxJwGJsci3ohbJn5uS9Z\n8/NgJIodQ8wRZpHdebDu2QyRI+Ks1Q2UmOEU+BvxnSvTOHWJLJ1B9EMbAoGBAJ5z\naMBPYKnCjzJ20Qi3VOreET2MCIjp1I5NiS/QbCv9CD2a+EvZf+y2X+l5gw7ttxYN\nDCkf0VxHc34MJG99cDHWfliE7MCf1qO3wVQGZXy+7ncbK8ItB9+N9b9eed1ga37O\n5sRRj4KsI8xPaBvKJpGI4xhGeHXyjL7Y18wZwyjhAoGBAOSGDUucuarSuDlBoYEu\nnaBQ1a1OtRIt4w6XGrsXB6Ue2G2Ibr3cu60KXU51DuY1rRbyqAvhdGIEDQBa7BUz\nvazmunHXY3ixEmyIr/kLV0f11YVqog+wHWOoaFLPsgWNf7YNeTm9gOe1Q7JZEr6N\nB38EP4FJyQvyDFEaBpjQjuQq\n-----END PRIVATE KEY-----\n",

// console.log('admin: ', admin)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "wonder-b37d2",
      clientEmail: "firebase-adminsdk-j9kkz@wonder-b37d2.iam.gserviceaccount.com",
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
    // databaseURL: 'https://wonder-b37d2.firebaseio.com'
  })
}

export default admin

// const clientCredentials = {
//   apiKey: "AIzaSyCJbxvhSVnXFDqNwyRO48v_zP73k6Hhx3U",
//   authDomain: "wonder-b37d2.firebaseapp.com",
//   // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   projectId: "wonder-b37d2",
//   storageBucket: "wonder-b37d2.appspot.com",
//   messagingSenderId: "394899969305",
//   appId: "1:394899969305:web:9f0e029a0e7d661530a188"
// }