<template>
  <b-container>
    <menuTable></menuTable>
    <menuList></menuList>
  </b-container>
</template>

<script>
import menuTable from "./weekly-menu-table";
import menuList from "./weekly-menu-list";
export default {
  components: {
    menuTable,
    menuList
  }
};
</script>

<style>
</style>