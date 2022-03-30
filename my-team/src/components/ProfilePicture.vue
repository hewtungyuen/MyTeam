<template>
  <div>
    <img id="profilepic" src="../assets/defaultprofile.jpg" />
    <h3>{{ name }}</h3>
    <input
      style="display: none"
      type="file"
      @change="handleUpload"
      ref="fileInput"
      accept="image/"
    />
    <n-button
      @click="
        $refs.fileInput.click();
      "
      >Update Photo</n-button
    >
  </div>
</template>

<script>
// import firebase from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
var db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      name: "",
      user: false,
      file: null,
    };
  },

  methods: {
    handleUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file);
      this.uploadToStorage();
    },

    uploadToStorage() {
      console.log("Entered upload click");
      const storage = getStorage();
      const storageRef = ref(storage,'users/' + this.user.uid + '/profile.jpg');
      uploadBytes(storageRef, this.file).then((snapshot) => {
        console.log("Uploaded a blob or file!" + snapshot);
      });

      // const auth = getAuth()

      // console.log(firebase.storage())

      // .ref('users/' + auth.user.uid + '/profile.jpg')
      // .put(this.file).then(function () {
      //     console.log('successfully uploaded')
      // }).catch(error => {
      //     console.log(error.message);
      // })
    },
  },

  mounted() {
    // let img = document.getElementById('profilepic')
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      // if (user) {
      //     this.user = user;
      //     firebase.storage().ref('users/' + auth.user.uid + '/profile.jpg').getDownloadURL()
      //     .then(imgUrl => {
      //         img.src = imgUrl;
      //     }).catch((e) => {
      //         console.log(e);
      //     })

      // }
    });

    let allUsers = getDocs(collection(db, "Users"));

    allUsers.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        if (docData.Email == this.user.email) {
          this.name = docData.FullName;
        }
      });
    });
  },
};
</script>

<style scoped>
#profilepic {
  height: 120px;
  border-radius: 100%;
}
</style>
