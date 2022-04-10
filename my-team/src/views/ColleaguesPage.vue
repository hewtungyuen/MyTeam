<template>
  <Header :title="title" />
  <Sidebar />
  <ColleagueTable />
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";
import ColleagueTable from "@/components/ColleagueTable";
import Header from "@/components/Header.vue";

export default {
  name: "ColleaguesPage",
  components: {
    ColleagueTable,
    Sidebar,
    Header,
  },
  setup() {
    return { sidebarWidth };
  },
  data() {
    return {
      title: "Colleague Search Page",
    };
  },
};
</script>

<style></style>
