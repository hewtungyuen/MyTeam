<template>
  <img
    id ="profile"
    src="../assets/marvin.jpeg"
  />
<h3>{{name}}</h3>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from '../firebase.js'
import { collection, getDocs, getFirestore} from 'firebase/firestore'
var db = getFirestore(firebaseApp)
export default {
    data(){
        return {
            name: '',
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
            
        })
        console.log(this.user)
        console.log("test")
        let allUsers = getDocs(collection(db, 'Users'))

        allUsers.then((querySnapshot) => {

            querySnapshot.forEach((doc) => {

                let docData = doc.data()
                

                if (docData.Email == this.user.Email) {
                    this.name = docData.FullName
                }
            })
        })
    }
}

</script>

<style scoped>
#profile {
    border-radius: 100%;
    height: 100px;
}


</style>