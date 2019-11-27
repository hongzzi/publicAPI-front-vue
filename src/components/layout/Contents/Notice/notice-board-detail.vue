<template>
  <b-container>
    <b-table-simple stacked>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>제목</b-th>
          <b-th>작성자</b-th>
          <b-th>작성일자</b-th>
          <b-th>조회수</b-th>
          <b-th>내용</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td stacked-heading="제목">{{board.title}}</b-td>
          <b-td stacked-heading="작성자">{{board.userName}}</b-td>
          <b-td stacked-heading="작성일자">{{board.insertTime}}</b-td>
          <b-td stacked-heading="조회수">{{board.viewCount}}</b-td>
          <b-td stacked-heading="내용">{{board.content}}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
export default {
  props: ["board"]
};
</script>

<style scoped>
[data-label]::before {
  width: 30% !important;
}

[data-label] > div {
  width: calc(100% - 35%) !important;
}
</style>