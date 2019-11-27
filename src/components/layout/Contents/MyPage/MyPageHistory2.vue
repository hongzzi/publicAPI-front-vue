<template>
  <b-container>
    <b-card border-variant="gray" align="center">
      <b-row>
        <b-col>
          <datepicker bootstrap-styling :value="state.date" text-align="center"></datepicker>
        </b-col>
      </b-row>
      <b-row>
        <div id="chart">
          <apexchart type="radialBar" height="350" :options="chartOptions" :series="series" />
        </div>
        <b-row>
          <b-col>탄수화물</b-col>
        </b-row>
        <b-row>
          <b-col>단백질</b-col>
        </b-row>
        <b-row>
          <b-col>지방</b-col>
        </b-row>
      </b-row>
      <b-row>
        <b-col>
          <b-progress :value="80" variant="info" striped class="mt-2"></b-progress>
        </b-col>
        <b-col>
          <b-progress :value="35" variant="info" striped class="mt-2"></b-progress>
        </b-col>
        <b-col>
          <b-progress :value="25" variant="info" striped class="mt-2"></b-progress>
        </b-col>
      </b-row>
      <hr />
      <div>
        <b-card header="섭취식품 목록">
          <b-row>
            <b-col>종류</b-col>
            <b-col>식품명</b-col>
            <b-col>용량(갯수)</b-col>
            <b-col>칼로리</b-col>
            <b-col>탄수화물</b-col>
            <b-col>단백질</b-col>
            <b-col>지방</b-col>
          </b-row>
          <b-row>
            <b-col>2</b-col>
          </b-row>
          <b-row>
            <b-col>3</b-col>
          </b-row>
          <b-row>
            <b-col>4</b-col>
          </b-row>
        </b-card>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      cal: 300,
      state: {
        date: new Date()
      },
      series: [110],
      colors: ["#20E647"],
      chartOptions: {
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "55%",
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
        labels: ["Cal"]
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
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
  }
};
</script>

<style scoped>
</style>