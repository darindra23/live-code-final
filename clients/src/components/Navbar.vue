<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand style="cursor:pointer;" @click.prevent="home">COVID-19</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content style>
              <em>{{username}}</em>
            </template>
            <b-dropdown-item href @click.prevent="profile">Profile</b-dropdown-item>
            <b-dropdown-item href @click.prevent="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      username: localStorage.username
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        path: "/login"
      });
    },
    profile() {
      this.$router.push({
        path: "/profile"
      });
    },
    profile() {
      this.$router.push({
        path: "/profile"
      });
    },
    home() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>