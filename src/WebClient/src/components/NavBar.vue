<template>
  <!-- https://getbootstrap.com/docs/4.4/components/navbar/ -->
  <header class="nav navbar-expand-sm navbar-dark bg-dark p-2">
    <a class="navbar-brand" v-on:click="route('')" href="#">Sample App</a>
    <button
      class="navbar-toggler ml-auto"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <div class="ml-auto">
        <SignIn />
      </div>
    </div>
  </header>
</template>

<script>
import SignIn from "@/components/SignIn.vue";

export default {
  name: "navBar",
  components: {
    SignIn
  }
};
</script>
