<template>
  <b-container>
    <menuTable></menuTable>
    <menuList></menuList>
  </b-container>
</template>

<script>
import menuTable from "./week-menu-table";
import menuList from "./week-menu-list";
export default {
  components: {
    menuTable,
    menuList
  }
};
</script>

<style>
</style>