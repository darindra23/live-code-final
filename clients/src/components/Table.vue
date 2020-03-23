<template>
  <v-app id="inspire">
    <v-card>
      <v-card-title>
        {{title}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
        <template #item.action="{item}" v-if="profile">
          <v-icon sm @click.prevent="deleteItem(item.id)">Delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
import { axios, errorHandler } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  props: ["headers", "items", "title", "profile"],
  data() {
    return {
      search: ""
    };
  },
  methods: {
    deleteItem(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/reports/${id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data }) => {
              Toast.fire({
                icon: "success",
                title: "Reports deleted successfully"
              });
              this.$store.dispatch("fetchReports");
            })
            .catch(err => {
              errorHandler(err);
            });
        }
      });
    }
  }
};
</script>