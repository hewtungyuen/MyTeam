<template>
<div>
    <img  id = "profilepic" src="../assets/defaultprofile.jpg" />
    <h3>{{name}}</h3>
    <input style ="display: none" type="file" @change= "handleUpload" ref="fileInput" accept="image/" />
    <n-button @click="$refs.fileInput.click(); uploadToStorage()">Update Photo</n-button>
</div>
</template>

<script>
import firebase from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from '../firebase.js'
import { collection, getDocs, getFirestore} from 'firebase/firestore'
var db = getFirestore(firebaseApp)
export default {
    data(){
        return {
            name: '',
            user: false,
            file: null
        }
    },

    methods: {
        handleUpload(event) {
            this.file = event.target.files[0]
            console.log(this.file)
        },

        uploadToStorage() {

            const auth = getAuth()
            
            firebase.storage().ref('users/' + auth.user.uid + 'profile.jpg').put(this.file).then(function () {
                console.log('successfully uploaded')
            }).catch(error => {
                console.log(error.message);
            })
    

        }
    },


    mounted() {
        let img = document.getElementById('profilepic')
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                firebase.storage().ref('users/' + auth.user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
                    img.src = imgUrl;
                })
    
            }
        })

        let allUsers = getDocs(collection(db, 'Users'))

        allUsers.then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                let docData = doc.data()
                if (docData.Email == this.user.email) {
                    this.name = docData.FullName

                }
            })
        })

        

    }
}

</script>

<style scoped>
#profilepic {
    height: 120px;
    border-radius: 100%;
}


</style>
