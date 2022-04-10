<template>
  <Header :title="title" />
  <Sidebar />

  <n-grid :cols="5">
    <n-gi id="picture" span="2">
      <n-card id="profilepic">
        <ProfilePicture />
      </n-card>
    </n-gi>
    <n-gi id="info" span="3">
      <ProfileInfo />
    </n-gi>
  </n-grid>
  <ProfileProjectTable id="table" />
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/Header.vue";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileProjectTable from "@/components/ProfileProjectTable.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
import { sidebarWidth } from "@/components/sidebar/state";
export default {
  data() {
    return {
      title: "My Profile",
    };
  },

  name: "ProfilePage",

  components: {
    Sidebar,
    ProfileInfo,
    ProfileProjectTable,
    ProfilePicture,
    Header,
  },

  setup() {
    return { sidebarWidth };
  },
};
</script>

<style scoped>
#profilepic {
  background-color: rgb(248, 248, 248);
  position: relative;
  padding: 10px;
}

#table {
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
}

#picture {
  padding-top: 10px;
  padding-left: 30px;
}

#info {
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
}
</style>
