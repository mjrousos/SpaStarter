<template>
  <nav class="nav fixed-bottom navbar-dark bg-dark px-1">
    <span class="navbar-text navbar-dark">
      &copy; {{ currentYear }} M.J. Rousos
    </span>
    <span class="navbar-text navbar-dark ml-auto"> v{{ version }} </span>
  </nav>
</template>

<script>
export default {
  name: "Footer",
  data: function() {
    return {
      currentYear: new Date().getFullYear(),
      // The GIT_DESCRIBE variable is substituted at compile time
      // by the vue-cli-plugin-git-describe plugin.
      // eslint-disable-next-line no-undef
      version: GIT_DESCRIBE.semverString
    };
  }
};
</script>
