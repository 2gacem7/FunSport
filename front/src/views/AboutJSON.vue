<template>
  <div id="json">
    <!-- <a href= "http://localhost:3000/about.json">test</a> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AboutJSON",

  async mounted() {

    window.location.href = "http://localhost:3000/about";
  },
};
</script>
