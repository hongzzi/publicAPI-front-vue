<template>
  <b-container>
    <h3>운동량 계산</h3>
    <b-card-group deck>
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="getImgUrl('walk_icon.png')" class="rounded-0" style="padding:30px;"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="산책">
              <b-card-text>
                1시간:
                <span v-text="walkKcal"></span>Kcal
              </b-card-text>
              <b-card-text class="exer-result-text" v-text="walkTime"></b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="getImgUrl('sleep_icon.png')" class="rounded-0" style="padding:30px;"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="수면">
              <b-card-text>
                1시간:
                <span v-text="sleepKcal"></span>Kcal
              </b-card-text>
              <b-card-text class="exer-result-text" v-text="sleepTime"></b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="getImgUrl('typing_icon.png')" class="rounded-0" style="padding:30px;"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="코딩">
              <b-card-text>
                1시간:
                <span v-text="typingKcal"></span>Kcal
              </b-card-text>
              <b-card-text class="exer-result-text" v-text="typingTime"></b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      walkKcal: 220,
      sleepKcal: 43,
      typingKcal: 95
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    },
    walkTime() {
      return this.calcTime(this.walkKcal);
    },
    sleepTime() {
      return this.calcTime(this.sleepKcal);
    },
    typingTime() {
      return this.calcTime(this.typingKcal);
    }
  },
  methods: {
    getImgUrl(iconImg) {
      return require("../../../../assets/icon_img/" + iconImg);
    },
    calcTime(kcal) {
      if (this.menuList.length == 0) {
        return "데이터가 없어요!";
      }
      let totalKcal = this.menuList
        .map(item => item.calory)
        .reduce((prev, current) => prev + current);
      let hours = parseInt(totalKcal / kcal);
      let mins = parseInt(((totalKcal % kcal) * 60) / 220);
      let resultTimeStr = "약 " + hours + "시간 " + mins + "분";
      return resultTimeStr;
    }
  }
};
</script>

<style scoped>
.exer-result-text {
  font-weight: bold;
  font-size: 1.1em;
}
</style>