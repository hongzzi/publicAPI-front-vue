<template>
  <b-container>
    <b-table hover :items="menuList" :fields="fields"></b-table>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "menuName",
          label: "이름",
          thStyle: "width:17%;",
          sortable: true
        },
        {
          key: "calory",
          label: "칼로리",
          sortable: true
        },
        {
          key: "carbo",
          label: "탄수화물",
          sortable: true
        },
        {
          key: "protein",
          label: "단백질",
          sortable: true
        },
        {
          key: "fat",
          label: "지방",
          sortable: true
        },
        {
          key: "sugar",
          label: "당류",
          sortable: true
        },
        {
          key: "natrium",
          label: "나트륨",
          sortable: true
        },
        {
          key: "chole",
          label: "콜레스테롤",
          sortable: true
        },
        {
          key: "fattyacid",
          label: "포화지방",
          sortable: true
        },
        {
          key: "transfat",
          label: "트랜스지방",
          sortable: true
        }
      ]
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    }
  }
};
</script>

<style>
</style>