<template>
  <nav class="nav fixed-bottom navbar-dark bg-dark px-1">
    <span class="navbar-text navbar-dark">
      &copy; {{ currentYear }} M.J. Rousos
    </span>
  </nav>
</template>

<script>
export default {
  name: "Footer",
  data: function() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
