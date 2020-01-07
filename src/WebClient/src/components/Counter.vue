<template>
  <div class="card card-default">
    <div class="card-header">
      {{ CounterTitle }}
    </div>
    <div class="card-body">
      <div class="card-title">
        {{ count }}
      </div>
      <button class="btn btn-primary" v-on:click="incrementCountAsync">
        Increment
      </button>
    </div>
  </div>
</template>

<script>
async function incrementCountAsync() {
  this.count++;
}

export default {
  name: "counter",
  data: function() {
    return {
      count: 0
    };
  },
  methods: {
    incrementCountAsync
  },
  props: {
    CounterTitle: String
  }
};
</script>
