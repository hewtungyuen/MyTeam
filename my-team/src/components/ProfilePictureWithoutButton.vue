<template>
  <div>
    <img class="profilepic" v-if="this.url != ''" :src="url" />
    <img class="profilepic" v-else src="../assets/defaultprofile.jpg" />
    <h3>{{ name }}</h3>
    <input
      style="display: none"
      type="file"
      @change="handleUpload"
      ref="fileInput"
      accept="image/"
    />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
var db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      name: "",
      user: false,
      file: null,
      url: "",
    };
  },

  methods: {
    //obtain file data
    handleUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file);
      this.uploadToStorage();
    },

    //upload to storage
    uploadToStorage() {
      const storage = getStorage();
      const storageRef = ref(storage, "users/" + this.name + "/profile.jpg");
      uploadBytes(storageRef, this.file).then((snapshot) => {
        console.log("Uploaded a blob or file!" + snapshot);
        this.updatePhoto();
      });
    },

    //update the profile picture
    updatePhoto() {
      const storage = getStorage();
      getDownloadURL(ref(storage, "users/" + this.name + "/profile.jpg")).then(
        (url) => {
          console.log("photoupdated");
          this.url = url;
        }
      );
    },
  },

  mounted() {
    //get the name and the photo when mounted
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = this.user.email;

        //  let img = document.getElementById('profilepic')
        //  const storage = getStorage();
        //  getDownloadURL(ref(storage,'users/' + this.name + '/profile.jpg'))
        //   .then((url) => { this.url = url;
        //   })
      }
    });

    let allUsers = getDocs(collection(db, "Users"));

    allUsers.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        console.log(this.userEmail);
        if (docData.Email == this.userEmail) {
          this.name = docData.FullName;
          this.updatePhoto();
        }
      });
    });
  },
  props: {
    userEmail: String,
  },
};
</script>

<style scoped>
.profilepic {
  height: 120px;
  width: 120px;
  border-radius: 100%;
  object-fit: cover;
}
</style>
