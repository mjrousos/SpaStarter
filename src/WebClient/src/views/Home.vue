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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Counter from "@/components/Counter.vue";

const data = {
  title: "Hello, world!"
};

export default {
  name: "home",
  data: () => data,
  components: {
    Counter
  }
};
</script>
