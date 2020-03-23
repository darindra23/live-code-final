<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-5">
      <Table :title="title" :headers="headers" :items="countries" :profile="false"></Table>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Navbar,
    Table
  },
  data() {
    return {
      title: "Countries",
      button: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Cases", value: "cases" },
        { text: "Deaths", value: "deaths" },
        { text: "Recovered", value: "recovered" }
      ]
    };
  },
  computed: {
    ...mapState(["countries"])
  },
  created() {
    this.$store.dispatch("fetch");
  }
};
</script>