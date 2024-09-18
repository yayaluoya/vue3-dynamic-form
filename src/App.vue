<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  components: { RouterView },
  setup() {},
});
</script>

<template>
  <header></header>
  <RouterView />
</template>

<style lang="scss" scoped></style>
