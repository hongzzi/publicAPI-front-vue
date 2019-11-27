<template>
  <div class="col-lg-4 col-sm-6 portfolio-item">
    <div class="card h-100">
      <a href="#">
        <img class="card-img-top" :src="getImgUrl(food.img)" @click="showModal" alt />
      </a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#" @click="showModal">{{food.name}}</a>
        </h4>
        <p class="card-text">{{food.maker}}</p>
      </div>
    </div>

    <b-modal ref="modal-lg" size="xl" title="제품 상세보기" button-size="sm" ok-only no-stacking>
      <div class="row">
        <div class="col-md-5">
          <img class="img-fluid" :src="getImgUrl(food.img)" alt />
        </div>
        <div class="col-md-7">
          <h3>제품 상세정보</h3>
          <b-table-simple stacked>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>제품명</b-th>
                <b-th>제조사</b-th>
                <b-th>원재료</b-th>
                <b-th>알레르기성분</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td stacked-heading="제품명">{{food.name}}</b-td>
                <b-td stacked-heading="제조사">{{food.maker}}</b-td>
                <b-td stacked-heading="원재료">{{food.material}}</b-td>
                <b-td stacked-heading="알레르기성분">{{food.allergy}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
      </div>

      <h3 class="my-4">Related Projects</h3>
      <!-- relative items -->
      <div class="row">
        <div
          class="col-md-3 col-sm-6 mb-4"
          v-for="(relativeFood) in relativeFoods"
          :key="relativeFood.code"
        >
          <a href="#">
            <img class="img-fluid" :src="getImgUrl(relativeFood.img)" alt />
          </a>
          <p class="relate-food-name" style="text-align:center">{{relativeFood.name}}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "../../../../js/http-commons";
export default {
  props: ["food"],
  data() {
    return {
      relativeFoods: []
    };
  },
  mounted() {
    this.getRelativeFoods();
  },
  watch: {
    relativeFoods() {
      return this.relativeFoods;
    }
  },
  methods: {
    getImgUrl(foodImg) {
      return require("../../../../assets/" + foodImg);
    },
    showModal() {
      this.$refs["modal-lg"].show();
    },
    getRelativeFoods() {
      axios
        .get("/food/detail/relative", {
          params: {
            code: this.food.code
          }
        })
        .then(res => {
          this.relativeFoods = res.data.data;
        });
    }
  }
};
</script>

<style scoped>
[data-label]::before {
  width: 20% !important;
}

[data-label] > div {
  width: calc(100% - 25%) !important;
}

.relate-food-name {
  text-align: center;
  font-weight: bold;
}
</style>