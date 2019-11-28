<template>
  <div class="container">
    <div class="content-header-tt">
      <h3>
        음식 조회
      </h3>
    </div>

    <b-input-group class="breadcrumb">
      <b-input-group-prepend>
        <b-dropdown :text="dropDownText" variant="info">
          <b-dropdown-item @click="setDropdown('전체')">전체</b-dropdown-item>
          <b-dropdown-item @click="setDropdown('제품이름')">제품이름</b-dropdown-item>
          <b-dropdown-item @click="setDropdown('제조사명')">제조사명</b-dropdown-item>
          <b-dropdown-item @click="setDropdown('제품재료')">제품재료</b-dropdown-item>
        </b-dropdown>
      </b-input-group-prepend>

      <b-form-input type="text" @keyup.enter="getFoods" v-model="inputText"></b-form-input>

      <b-input-group-append>
        <b-button variant="outline-secondary" @click="getFoods">검색</b-button>
      </b-input-group-append>
    </b-input-group>

    <div class="row">
      <v-portfolio-item v-for="(food) in foods" :key="food.code" :food="food"></v-portfolio-item>
    </div>

    <!-- Pagination -->
    <b-pagination
      v-model="currentPage"
      :total-rows="maxPage"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
      @change="getPage"
    ></b-pagination>
  </div>
</template>

<script>
import vPortfolioItem from "./foodlist-item";
import axios from "../../../../js/http-commons";
export default {
  data() {
    return {
      maxPage: 0,
      perPage: 6,
      currentPage: 1,

      inputText: "",
      searchText: "",

      dropDownText: "검색조건",
      condition: 0,

      foods: []
    };
  },
  components: {
    vPortfolioItem
  },
  mounted() {
    this.getPage();
    this.getFoods(false);
  },
  methods: {
    getPage(page) {
      this.currentPage = page;
      this.getFoods(false);
    },
    getFoods(isText) {
      if (isText) {
        this.searchText = this.inputText;
      }
      const axiosForFoodPage = axios
        .get("/food/list/pageSize", {
          params: {
            condition: this.condition,
            text: this.inputText
          }
        })
        .then(res => {
          this.maxPage = Number(res.data.data);
        });
      const axiosForNoticeBoard = axios
        .get("/food/list/" + (!this.currentPage ? 1 : this.currentPage), {
          params: {
            condition: this.condition,
            text: this.inputText
          }
        })
        .then(res => {
          this.foods = res.data.data;
        });
      Promise.all([axiosForFoodPage, axiosForNoticeBoard]);
    },
    setDropdown(conditionStr) {
      this.dropDownText = conditionStr;
      switch (conditionStr) {
        case "제품이름":
          this.condition = 1;
          break;
        case "제조사명":
          this.condition = 2;
          break;
        case "제품재료":
          this.condition = 3;
          break;
        default:
          this.condition = 0;
          break;
      }
    }
  }
};
</script>

<style scoped>
.portfolio-item {
  margin-bottom: 10px;
}
.input-group {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.content-header-tt {
  padding : 20px;
  text-emphasis: true; 
}
</style>