<template>
  <div>
    <div v-if="!userName">
      <button
        class="btn btn-outline-light"
        type="submit"
        v-on:click.prevent="login"
      >
        Sign in
      </button>
    </div>
    <div v-if="userName">
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
const data = {
  // TODO!!!
  userName: "Mike"
};

function login() {
  // TODO
}

function logout() {
  // TODO
}

export default {
  name: "signIn",
  data: () => data,
  methods: {
    login: login,
    logout: logout
  }
};
</script>
