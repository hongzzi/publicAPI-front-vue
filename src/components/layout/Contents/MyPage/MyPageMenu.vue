<template>
  <div>
    <!-- Sidebar Column -->
    <div class="list-group">
      <div class="list-group-item">My Page</div>
      <div class="list-group-item">
        <router-link to="/mypage/history">섭취정보</router-link>
      </div>
      <div class="list-group-item">
        <router-link to="/mypage/history2">섭취정보2</router-link>
      </div>
      <div class="list-group-item">
        <router-link to="/mypage/detail">회원정보수정</router-link>
      </div>
      <div class="list-group-item">
        <router-link to="/mypage/remove">탈퇴하기</router-link>
      </div>
    </div>
    <!-- /.row -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>