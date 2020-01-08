<template>
  <div>
    <div v-if="!signedIn">
      <button
        class="btn btn-outline-light"
        type="submit"
        v-on:click.prevent="login"
      >
        Sign in
      </button>
    </div>
    <div v-if="signedIn">
      <span class="navbar-text navbar-dark">Welcome, {{ userName }}</span>
      <button
        class="btn btn-outline-light"
        type="submit"
        v-on:click.prevent="logout"
      >
        Sign out
      </button>
    </div>
  </div>
</template>

<script>
import Configuration from "../configuration";
import AuthService from "../services/auth.service";

async function login() {
  await AuthService.loginAsync(Configuration.authSettings.popup);
  this.refreshUserInfo();
}

function logout() {
  AuthService.logout();
  this.refreshUserInfo();
}

function refreshUserInfo() {
  return this.$store.dispatch("refreshUser");
}

export default {
  name: "signIn",
  computed: {
    signedIn() {
      return this.$store.getters.user != null;
    },
    userName() {
      return this.$store.getters.userName;
    }
  },
  methods: {
    login,
    logout,
    refreshUserInfo
  }
};
</script>
