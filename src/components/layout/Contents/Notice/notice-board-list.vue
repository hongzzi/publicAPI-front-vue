<template>
  <b-container>
    <h3>공지사항</h3>
    <b-table
      striped
      hover
      id="notice-board"
      :fields="fields"
      :items="items"
      @row-clicked="goDetail"
    ></b-table>
    <b-row>
      <b-col cols="4" class="notice-cols-btn-container">
        <b-button variant="outline-primary" @click="openWriteModal">글쓰기</b-button>
      </b-col>
      <b-col cols="4">
        <b-pagination
          align="center"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          aria-controls="notice-board"
          @change="getPageBoard"
        ></b-pagination>
      </b-col>
      <b-col cols="4" align-content="end">
        <b-input-group class="notice-search-bar">
          <b-input-group-prepend>
            <b-dropdown :text="conditionText" variant="info">
              <b-dropdown-item @click="setDropdown('전체')">전체</b-dropdown-item>
              <b-dropdown-item @click="setDropdown('제목')">제목</b-dropdown-item>
              <b-dropdown-item @click="setDropdown('내용')">내용</b-dropdown-item>
              <b-dropdown-item @click="setDropdown('제목+내용')">제목+내용</b-dropdown-item>
            </b-dropdown>
          </b-input-group-prepend>

          <b-form-input type="text" @keyup.enter="getNoticeBoards(true)" v-model="inputText"></b-form-input>

          <b-input-group-append>
            <b-button variant="primary" @click="getNoticeBoards(true)">검색</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <b-modal
      ref="notice-write-board"
      size="lg"
      title="새로 글쓰기"
      @show="resetWriteModal"
      @hidden="resetWriteModal"
      @ok="handleOk"
    >
      <div class="modal-contents" id="write-contents">
        <form ref="notice-write-form" @submit.stop="handleSubmit">
          <!--  -->
          <b-row>
            <b-col cols="6">
              <b-form-group
                id="write-user-id-form"
                label-cols-lg="2"
                label="I D"
                label-for="write-user-id-input"
                style="padding-left: 10px; font-weight:bold;"
                required
              >
                <b-form-input id="write-user-id-input" v-model="writeForm.userId"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                id="write-user-name-form"
                label-cols-lg="2"
                label="이 름"
                label-for="write-user-name-input"
                style="padding-left: 10px; font-weight:bold;"
                required
              >
                <b-form-input id="write-user-name-input" v-model="writeForm.userName"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <!--  -->
          <b-form-group
            id="write-title-form"
            label-cols-lg="1"
            label="제 목"
            label-for="write-title-input"
            style="padding-left: 10px; font-weight:bold;"
          >
            <b-form-input id="write-title-input" v-model="writeForm.title"></b-form-input>
          </b-form-group>
          <b-form-group
            id="write-title-form"
            label="내 용"
            label-for="write-title-input"
            style="padding-left: 10px; font-weight:bold;"
          >
            <b-form-textarea
              id="write-content-input"
              v-model="writeForm.content"
              placeholder="글 내용을 작성해주세요."
              rows="5"
            ></b-form-textarea>
          </b-form-group>
        </form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "../../../../js/http-commons";

export default {
  data() {
    return {
      fields: [
        {
          key: "boardId",
          label: "번호",
          tdClass: "table_id"
        },
        {
          key: "title",
          label: "제목",
          thStyle: "width:50%"
        },
        {
          key: "viewCount",
          label: "조회수"
        },
        {
          key: "userName",
          label: "작성자"
        },
        {
          key: "insertTime",
          label: "날짜"
        }
      ],
      items: [],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,

      conditionText: "검색조건",
      condition: 0,

      inputText: "",
      searchText: "",

      writeForm: {
        title: "",
        userId: "",
        userName: "",
        content: ""
      }
    };
  },
  computed: {
    // rows() {
    //   return this.totalRows;
    // },
    // boards() {
    //   return this.items;
    // }
  },
  mounted() {
    this.getNoticeBoards();
  },
  methods: {
    setDropdown(conditionStr) {
      this.conditionText = conditionStr;
      switch (conditionStr) {
        case "제목":
          this.condition = 1;
          break;
        case "내용":
          this.condition = 2;
          break;
        case "제목+내용":
          this.condition = 3;
          break;
        default:
          this.condition = 0;
          break;
      }
    },
    getPageBoard(page) {
      this.currentPage = page;
      this.getNoticeBoards(false);
    },
    getNoticeBoards(isText) {
      if (isText) {
        this.searchText = this.inputText;
      }
      const axiosForPageSize = axios.get("/board/notice/pageSize", {
        params: {
          condition: this.condition,
          text: this.searchText
        }
      });
      const axiosForNoticeBoards = axios.get(
        "/board/notice/" + this.currentPage,
        {
          params: {
            condition: this.condition,
            text: this.searchText
          }
        }
      );
      Promise.all([axiosForPageSize, axiosForNoticeBoards])
        .then(response => {
          this.totalRows = Number(response[0].data.data);
          this.items = response[1].data.data.filter(item => {
            item.insertTime = new Date(
              Date.parse(item.insertTime)
            ).toLocaleString();
            return item;
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    goDetail(items) {
      this.$router.push({ name: "noticeDetail", params: { board: items } });
    },
    openWriteModal() {
      this.$refs["notice-write-board"].show();
    },
    checkFormValidaity() {
      return this.$refs["notice-write-form"].checkValidity();
    },
    handleOk(e) {
      e.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidaity()) {
        console.log("err for valid");
        return;
      }
      axios
        .post("/board/notice/insert", {
          title: this.writeForm.title,
          userId: this.writeForm.userId,
          userName: this.writeForm.userName,
          content: this.writeForm.content
        })
        .then(() => {
          this.getNoticeBoards();
          this.$refs["notice-write-board"].hide();
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetWriteModal() {
      this.writeForm.title = "";
      this.writeForm.userId = "";
      this.writeForm.userName = "";
      this.writeForm.content = "";
    }
  }
};
</script>

<style scoped>
.notice-search-bar {
  padding-left: 10px;
  padding-right: 20px;
}
.notice-cols-btn-container {
  text-align: left;
  padding-left: 50px !important;
}

#write-contents {
  padding-left: 20px;
  padding-right: 20px;
}
</style>