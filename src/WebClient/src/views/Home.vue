<template>
  <div class="container-fluid my-2">
    <div>
      <h1>{{ title }}</h1>
      <div class="row">
        <div class="col-6">
          <Counter CounterTitle="Counter" />
          <Counter CounterTitle="A second counter" />
        </div>
      </div>
      <div class="row" v-if="signedIn">
        <button class="btn btn-outline-info" @click="getToken(false)">
          Get ID Token
        </button>
        <button class="btn btn-outline-info" @click="getToken(true)">
          Get Access Token
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Counter from "@/components/Counter.vue";
import AuthService from "../services/auth.service";
import * as toastr from "toastr";

toastr.options = {
  closeButton: true,
  positionClass: "toast-bottom-center"
};

const data = {
  title: "Hello, world!"
};

export default {
  name: "home",
  data: () => data,
  components: {
    Counter
  },
  methods: {
    getToken: async function(accessToken) {
      var token = accessToken
        ? await AuthService.getAccessTokenAsync()
        : await AuthService.getIdTokenAsync();

      toastr.info(token, "Token");
    }
  },
  computed: {
    signedIn() {
      return this.$store.getters.user != null;
    }
  }
};
</script>
