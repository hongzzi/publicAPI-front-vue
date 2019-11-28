<template>
  <b-container>
    <b-card border-variant="gray" align="center">
      <b-row>
        <b-col cols="6">
          <datepicker
            format="yyyy-MM-dd"
            bootstrap-styling
            :value="state.date"
            text-align="center"
            @selected="getHistory"
          ></datepicker>
        </b-col>
      </b-row>
      <b-row class="text-start">
        <b-col cols="6" id="chart">
          <apexchart type="radialBar" height="350" :options="chartOptions" :series="series" />
        </b-col>
        <b-col cols="6">
          <span class="nutrition-contents">탄수화물</span>
          <span>{{this.totalNutrition.carbo}}</span> /
          <span>400</span>
          <b-progress :max="100">
            <b-progress-bar
              :value="(this.totalNutrition.carbo/400)*100"
              :label="`${(this.totalNutrition.carbo/400).toFixed(2)*100}%`"
              variant="danger"
              striped
            ></b-progress-bar>
          </b-progress>
          <span class="nutrition-contents">단백질</span>
          <span>{{this.totalNutrition.protein}}</span> /
          <span>50</span>
          <b-progress :max="100">
            <b-progress-bar
              :value="(this.totalNutrition.protein/50)*100"
              :label="`${(this.totalNutrition.protein/50).toFixed(2)*100}%`"
              variant="success"
              striped
            ></b-progress-bar>
          </b-progress>
          <span class="nutrition-contents">지방</span>
          <span>{{this.totalNutrition.fat}}</span> /
          <span>65</span>
          <b-progress :max="100">
            <b-progress-bar
              :value="(this.totalNutrition.fat/65)*100"
              :label="`${(this.totalNutrition.fat/65).toFixed(2)*100}%`"
              variant="warning"
              striped
            ></b-progress-bar>
          </b-progress>
        </b-col>
      </b-row>
      <hr />
      <div>
        <b-container>
          <b-table hover :items="history" :fields="fields">
            <template v-slot:cell(deleteBtn)="row">
              <b-button size="sm" variant="outline-danger" @click="deleteHistory(row.item.intakeId)">삭제</b-button>
            </template>
          </b-table>
        </b-container>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      user: {},
      totalNutrition: {},
      history: [],
      state: {
        date: new Date()
      },
      fields: [
        {
          key: "foodName",
          label: "식품명",
          thStyle: "width:25%;",
          sortable: true
        },
        {
          key: "quantity",
          label: "수량"
        },
        {
          key: "calory",
          label: "칼로리"
        },
        {
          key: "carbo",
          label: "탄수화물"
        },
        {
          key: "protein",
          label: "단백질"
        },
        {
          key: "fat",
          label: "지방"
        },
        {
          key: "deleteBtn",
          label: "삭제"
        }
      ],
      series: [0],
      colors: ["#20E647"],
      chartOptions: {
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "50%",
              background: "#EFF5FB"
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: "#888",
                fontSize: "20px"
              },
              value: {
                color: "#888",
                fontSize: "20px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["칼로리"]
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 700,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("login_user"));
    this.history = this.getHistory(this.state.date);
  },
  methods: {
    dateFormatParse(date) {
      // let dayArr = ["일", "월", "화", "수", "목", "금", "토"];
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dd = date.getDate();
      // let day = dayArr[date.getDay()];
      return (
        year +
        "-" +
        (month > 9 ? month : "0" + month) +
        "-" +
        (dd > 9 ? dd : "0" + dd)
      );
    },
    getHistory(date) {
      let dateFormat = this.dateFormatParse(date);
      this.history = [];
      Axios.get(
        "http://localhost:8197/history/intake?" +
          "email=" +
          this.user.email +
          "&intakeDate=" +
          dateFormat
      )
        .then(res => {
          this.history = res.data.data;
          this.totalNutrition.calory = 0;
          this.totalNutrition.carbo = 0;
          this.totalNutrition.protein = 0;
          this.totalNutrition.fat = 0;
          this.history.forEach(element => {
            element.calory = parseInt(element.calory * element.quantity);
            element.carbo = parseInt(element.carbo * element.quantity);
            element.protein = parseInt(element.protein * element.quantity);
            element.fat = parseInt(element.fat * element.quantity);
            this.totalNutrition.calory += element.calory;
            this.totalNutrition.carbo += element.carbo;
            this.totalNutrition.protein += element.protein;
            this.totalNutrition.fat += element.fat;
          });
          this.series = [parseInt((this.totalNutrition.calory / 2500) * 100)];
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteHistory(val) {
      console.log(val);
      let url = "http://localhost:8197/history/intake/"+val
      Axios.delete(url)
        .then(() => {
          alert("삭제를 성공했습니다");
          this.getHistory(this.state.date);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
</style>