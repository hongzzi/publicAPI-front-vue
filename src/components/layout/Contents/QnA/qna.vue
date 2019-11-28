<template>
  <b-container>
    <div class="tabpanel">
      <b-card no-body class="mb-1" v-for="(qnaOne, index) in qnaSet" :key="index">
        <b-card-header header-tag="header" role="tab">
          <div v-b-toggle="'accordion-'+index" variant="info">
            <a href="#" class="question-title">{{qnaOne.question}}</a>
          </div>
        </b-card-header>
        <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <pre>{{qnaOne.answer}}</pre>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      qnaSet: [
        {
          question: "아이디와 비밀번호가 생각나지 않아요 어떻게 찾아야 하나요?",
          answer:
            "(PC)오른쪽 위의 [로그인]>로그인 모달 하단의 [비밀번호 찾기]\n\n를 통해 확인이 가능하며 임시 비밀번호의 경우 회원가입시 등록하신 메일로 발송이 됩니다. \n\n가입 시 기재한 메일 주소가 기억나지 않으시거나, 오류가 날 경우,\n\n장영준(010-1234-5678)또는 카카오톡으로 문의를 주시면 신속하게 도움 드리겠습니다.\n\n사실 이 기능 아직 완성 안됬으니 그냥 그러려니 하세요..."
        },
        {
          question: "회원 탈퇴를 하고 싶어요.",
          answer:
            "혹여 SafeFood 이용시 불편하셨던 점이 있으시다면 1:1 문의접수 부탁드립니다.\n\n담당자 신속하게 확인하여 안내 및 조치드리겠습니다.\n\n아래는 회원탈퇴 방법입니다.\n\n로그인 후, 마이페이지 > 회원탈퇴 > [탈퇴하기]버튼\n\n을 통해 탈퇴하실 수 있습니다. \n\n* 고객님의 개인정보를 위해 직접 탈퇴만 가능합니다.\n\n* 회원 탈퇴시 부정이용 방지를 위하여 30일 동안 보관 후 파기하며, 재화 또는 서비스 제공에 해당하는 경우는 관련 법령에 의거하여 보유기간 동안 보관 후 파기합니다."
        },
        {
          question: "회원가입은 무료인가요?",
          answer:
            "SafeFood는 어느 누구도 상관없이 회원가입이 무료입니다!\n\n회원가입 후 다양한 혜택과 상품을 만나보세요!"
        },
        {
          question: "식품 정보에 식품이 많이 부족해요!",
          answer:
            "아직 베타 서비스이기에 다양한 데이터를 가지고 있지 않습니다. \n\n차후 공공 API와 연동해 다양한 식품에 대한 데이터를 자동화 해서 보여드릴 예정입니다! \n\n보다 더 좋은 서비스 제공하기 위해 노력하겠습니다."
        }
      ]
    };
  }
};
</script>

<style scoped>
.question-title {
  font-weight: bold;
  font-size: 1.2em;
  padding-left: 10px;
}
pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>