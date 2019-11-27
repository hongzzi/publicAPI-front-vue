<template>
  <b-container>
    <b-table hover :items="items" :fields="fields"></b-table>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "이름",
          thStyle: "width:17%;"
        },
        "탄수화물",
        "단백질",
        "지방",
        "당류",
        "나트륨",
        "콜레스테롤",
        "포화지방",
        "트랜스지방"
      ]
    };
  }
};
</script>

<style>
</style>