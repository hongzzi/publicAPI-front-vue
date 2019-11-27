<template>
  <div id="menu-container">
    <h2>식단표</h2>
    <b-card-group deck class="card-deck">
      <b-card
        ref="menu-card-container"
        style="margin-left:5px; margin-right:5px;"
        v-for="(menuItem, index) in menuArr"
        :header="menuItem.menuDateTitle"
        :key="index"
      >
        <b-card-text
          v-for="(item, innerIdx) in menuItem.menuList"
          :key="innerIdx"
          style="margin-bottom:5px;"
        >{{item.menuName}}</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "../../../../js/http-commons";
export default {
  data() {
    return {
      weekStart: null,
      menuArr: []
    };
  },
  mounted() {
    this.initMenuArr();
    this.getMenuArr();
  },
  methods: {
    initMenuArr() {
      let dt = new Date();
      let currentWeekDay = dt.getDay();
      var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
      var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
      this.weekStart = wkStart;
      for (let i = 0; i < 5; i++) {
        let arrDate = new Date(
          new Date(wkStart).setDate(wkStart.getDate() + i)
        );
        console.log(typeof this.menuArr);
        this.menuArr.push({
          menuDate: arrDate,
          menuDateTitle: this.dateFormatParse(arrDate),
          menuList: []
        });
      }
    },
    getMenuArr() {
      axios
        .get("/menu/list/week", {
          params: {
            startDate: this.dateFormatParse(this.weekStart).slice(0, -4),
            endDate: this.dateFormatParse(
              new Date(
                new Date(this.weekStart).setDate(this.weekStart.getDate() + 4)
              )
            ).slice(0, -4)
          }
        })
        .then(res => {
          res.data.data.forEach(item => {
            this.menuArr.forEach(menuItem => {
              if (menuItem.menuDateTitle.includes(item.menuDate)) {
                menuItem.menuList.push(item);
              }
            });
          });
          console.log(this.menuArr);
        });
    },
    dateFormatParse(date) {
      let dayArr = ["일", "월", "화", "수", "목", "금", "토"];
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dd = date.getDate();
      let day = dayArr[date.getDay()];
      return (
        year +
        "-" +
        (month > 9 ? month : "0" + month) +
        "-" +
        (dd > 9 ? dd : "0" + dd) +
        " (" +
        day +
        ")"
      );
    }
  }
};
</script>

<style>
.card-deck {
  margin-bottom: 20px;
}
#menu-container {
  padding-top: 15px;
}
</style>