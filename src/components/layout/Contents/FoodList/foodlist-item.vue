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

    <b-modal ref="modal-lg" size="xl" button-size="sm" ok-only no-stacking>
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
          <hr />
        </div>
      </div>
      <hr />
      <b-row>
        <b-col cols="3" class="text-center"></b-col>
        <b-col cols="2">
          <label for="range-1">섭취량</label>
        </b-col>
        <b-col cols="3">
          <b-form-input id="range-1" v-model="value" type="range" min="0" max="10"></b-form-input>
          Value: {{ value }}
        </b-col>
        <b-col cols="1">
          <b-button @click="addHistory">섭취</b-button>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="6" style="justify-content: end;">
          <apexchart type="donut" width="100%" :options="chartOptions" :series="series" />
        </b-col>
        <b-col cols="6" style="padding-left: 5%; padding-right:10%">
          <b-row class="row-table" v-for="(value, index) in series" :key="index">
            <b-col class="row-table-header" cols="4">{{chartOptions.labels[index]}}</b-col>
            <b-col class="row-table-data" cols="8">{{value}} &nbsp;{{unitStr[index]}}</b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />
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
      relativeFoods: [],
      value: 0,
      intake: {},

      unitStr: ["g", "g", "g", "mg", "mg", "mg", "mg", "mg"],
      series: [0, 0, 0, 0, 0, 0, 0, 0],
      chartOptions: {
        labels: [
          "탄수화물",
          "단백질",
          "지방",
          "당류",
          "나트륨",
          "콜레스테롤",
          "포화지방산",
          "트랜스지방"
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getRelativeFoods();
    this.getSeries();
  },
  methods: {
    getImgUrl(foodImg) {
      return require("../../../../assets/" + foodImg);
    },
    showModal() {
      this.$refs["modal-lg"].show();
    },
    getSeries() {
      this.series = [
        this.food.carbo,
        this.food.protein,
        this.food.fat,
        this.food.sugar,
        this.food.natrium,
        this.food.chole,
        this.food.fattyacid,
        this.food.transfat
      ];
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
    },
    addHistory() {
      axios
        .post("/history/intake", {
          foodId: this.food.code,
          email: JSON.parse(sessionStorage.getItem("login_user")).email,
          quantity: this.value,
          intakeDate: new Date()
        })
        .then(() => {
          alert(this.food.name + "을 " + this.value + "만큼 섭취하셨습니다");
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

.row-table {
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #efefef;
  border-bottom-style: solid;
}
.row-table-header {
  text-align: end;
  padding-right: 20px;
  font-size: 1.1em;
  font-weight: bold;
}
.row-table-data {
}
</style>