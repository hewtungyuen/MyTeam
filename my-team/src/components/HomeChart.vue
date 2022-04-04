<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="430"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>

const delay = ms => new Promise(res => setTimeout(res, ms));
const yourFunction = async () => {
  await delay(5000);
  console.log("Waited 5s");
  this.$emit("updataData")

//   this.forceRerender();
//   location.reload()

};
export default {
    mounted() {
        console.log(this.projectNames);
        console.log(this.allTasks);
        yourFunction();
    },
    props:{
        projectNames:Array,
        allMyTask2: Object,  
    },
    methods: {
      forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      }
    },
  data() {
    return {
        renderComponent: true,
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