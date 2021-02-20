// import admin from '../firebase/nodeApp'

// export const getActivities = async () => {
//   const db = admin.firestore()
//   const activitiesCollection = await db.collection('activities').get()
//   // const profileDoc = await activitiesCollection.doc('activities').get()

//   if (!activitiesCollection.exists) {
//     console.log('doesnt exist')
//     return null
//   }
//   console.log('activities: ', activitiesCollection.data())

//   return activitiesCollection.data()
// }