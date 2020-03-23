<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-5">
      <Table :title="title" :headers="headers" :items="reports" :profile="true"></Table>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { mapState } from "vuex";
export default {
  name: "Profile",
  components: {
    Navbar,
    Table
  },
  data() {
    return {
      title: "Reports",
      button: true,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "Country.name"
        },
        { text: "Report Cases", value: "cases" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  computed: {
    ...mapState(["reports"])
  },
  created() {
    this.$store.dispatch("fetchReport");
  }
};
</script>