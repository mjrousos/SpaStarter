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
      <div class="row">
        <div class="col-12 my-2">
          <button class="btn btn-outline-info mr-2" @click="callApi(false)">
            Call Anonymous API
          </button>
          <button class="btn btn-outline-info" @click="callApi(true)">
            Call Authorized API
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Counter from "@/components/Counter.vue";
import Configuration from "../configuration";
import WebApiService from "../services/webApi.service";
import * as toastr from "toastr";

var apiClient = new WebApiService(Configuration.webApiUrl);

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
    callApi: async function(authorizedEndpoint) {
      var response = authorizedEndpoint
        ? await apiClient.authorizedApi()
        : await apiClient.anonymousApi();
      if (response) {
        toastr.info(response, "Message from web API");
      } else {
        toastr.error("Error calling web API");
      }
    }
  },
  computed: {
    signedIn() {
      return this.$store.getters.user != null;
    }
  }
};
</script>
