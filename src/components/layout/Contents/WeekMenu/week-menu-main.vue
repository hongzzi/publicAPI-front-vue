<template>
  <b-container>
    <menu-table></menu-table>
    <menu-list></menu-list>
    <menu-exer></menu-exer>
    <menu-graph></menu-graph>
  </b-container>
</template>

<script>
import menuTable from "./week-menu-table";
import menuList from "./week-menu-list";
import menuExer from "./week-menu-exer";
import menuGraph from "./week-menu-graph";
export default {
  components: {
    menuTable,
    menuList,
    menuExer,
    menuGraph
  }
};
</script>

<style>
</style>