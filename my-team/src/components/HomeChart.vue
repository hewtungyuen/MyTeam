<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="430"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
{{allMyTasks}}

</template>

<script>

// const delay = ms => new Promise(res => setTimeout(res, ms));
// const yourFunction = async () => {
//   await delay(5000);
//   console.log("Waited 5s");
//   this.$emit("updataData")

// //   this.forceRerender();
// //   location.reload()

// };
export default {
    mounted() {

        // yourFunction();
        // this.getData()

    },
    props:{
        projectNames:Array,
        allMyTasks: Object,  
    },
    methods: {
      forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      },

    },
  data() {
    return {
        renderComponent: true,
      series: [
        {
          data: [44, 55, 41], // all in progress
        },
        {
          data: [53, 32, 33], // all completed
        },
        {
          data: [53, 32, 33], // all overdue
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
          categories: this.projectNames,
        },
      },
    };
  },
};
</script>

<style>
#chart{
  max-width: 100%;
}
</style>