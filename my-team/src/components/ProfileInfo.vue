<template>
  <n-space vertical>
    <n-table striped class="table" size="large">
      <tbody>
        <tr>
          <td class="header">Email</td>
          <td>{{ email }}</td>
        </tr>
        <tr>
          <td class="header">Phone</td>
          <td>{{ phone }}</td>
        </tr>
        <tr>
          <td class="header">Position</td>
          <td>{{ position }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-space>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
var db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      name: "",
      user: false,
      email: "",
      phone: "",
      position: "",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = this.user.email;
      }
    });

    let allUsers = getDocs(collection(db, "Users"));

    allUsers.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        if (docData.Email == this.user.email) {
          this.name = docData.FullName;
          this.phone = docData.Mobile;
          this.position = docData.Position;
        }
      });
    });
  },
};
</script>

<style scoped>
.header {
  font-weight: bold;
}
tbody {
  padding: 100px;
}
</style>
