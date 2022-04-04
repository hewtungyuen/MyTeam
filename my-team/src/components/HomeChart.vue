<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="430"
      :options="chartOptions"
      :series="series"
      v-if="this.projectNames != null"
    ></apexchart>
  </div>
</template>

<script>
const delay = ms => new Promise(res => setTimeout(res, ms));
const yourFunction = async () => {
  await delay(5000);
  console.log("Waited 5s");
//   location.reload()

};
export default {
    mounted() {
        console.log(this.projectNames);
        yourFunction();
    },
    props:{
        projectNames:Array,  
    },
  data() {
    return {
      series: [
        {
          data: [44, 55, 41, 64, 22, 43, 21],
        },
        {
          data: [53, 32, 33, 52, 13, 44, 32],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 430,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
            // type:"text",
          categories: this.projectNames,
        },
      },
    };
  },
};
</script>

<style>
</style>