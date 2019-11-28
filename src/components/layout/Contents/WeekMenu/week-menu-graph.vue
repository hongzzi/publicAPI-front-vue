<template>
  <b-container id="chart">
    <h3>오늘의 식단 분석</h3>
    <apexchart
      ref="apex-chart-for-menu"
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          name: "한끼 식사",
          type: "column",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "하루 권장치",
          type: "line",
          data: [300, 60, 50, 50, 180, 300, 150, 200]
        }
      ],
      chartOptions: {
        stroke: {
          width: [0, 4]
        },
        labels: [
          "탄수화물(1g)",
          "단백질(1g)",
          "지방(1g)",
          "당류(1g)",
          "나트륨(10mg)",
          "콜레스테롤(1mg)",
          "포화지방산(100mg)",
          "트랜스지방(10mg)"
        ],
        xaxis: {
          type: "text"
        },
        yaxis: [
          {
            title: {
              text: "한끼 식사"
            }
          }
        ]
      }
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    }
  },
  watch: {
    menuList: {
      deep: true,
      handler(list) {
        let newData = [0, 0, 0, 0, 0, 0, 0, 0];
        if (this.menuList.length == 0) {
          this.series = [{ data: newData }, this.series[1]];
        }
        list.forEach(value => {
          newData[0] += parseInt(value.carbo);
          newData[1] += parseInt(value.protein);
          newData[2] += parseInt(value.fat);
          newData[3] += parseInt(value.sugar);
          newData[4] += parseInt(value.natrium / 10);
          newData[5] += parseInt(value.chole);
          newData[6] += parseInt(value.fattyacid * 10);
          newData[7] += parseInt(value.transfat * 10);
        });
        this.series = [{ data: newData }, this.series[1]];
      }
    }
  },
  methods: {}
};
</script>

<style>
</style>