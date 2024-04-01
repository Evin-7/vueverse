<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 lg12 v-if="flag">
        <v-layout justify-center>
          <v-flex xs12 lg12 text-left pa-3>
            <span style="font-weight: bold; font-family: 'LexendRegular'"
              >ANALYTICS</span
            >
          </v-flex>
        </v-layout>
        <div>
          <center>
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="chartSeries"
            ></apexchart>
          </center>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
  
  <script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["totalBlogs", "publishedBlogs", "totalUsers", "newUserRegistrations"],
  data() {
    return {
      dataLoaded: false,
      flag: false,
      //         chartOptions: {
      //   chart: {
      //     colors: ['#3F51B5', '#FF5722', '#009688', '#FF9800'],

      //     type: 'bar',
      //     height: 350,

      //   },
      //   xaxis: {
      //     categories: ['Total Blogs', 'Published Blogs', 'Total Users', 'New User Registrations'],
      //   },
      //   dataLabels: {
      //     enabled: false,
      //     offsetX: -1,
      //           style: {
      //             fontSize: "12px",
      //             colors: ["#fff"],
      //           },
      //   },
      //   fill: {
      //           colors: ['#3F51B5', '#FF5722', '#009688', '#FF9800'],
      //         },
      //   plotOptions: {
      //     bar: {
      //       horizontal: false,
      //     }
      //   },
      //   title: {
      //     text: 'Counts',
      //     style: {
      //       fontSize: '16px',
      //       fontFamily: 'LexendRegular', // Change font to LexendRegular
      //     }
      //   },
      //   yaxis: {
      //     title: {
      //       text: 'Value',
      //       style: {
      //         fontFamily: 'LexendRegular', // Change font to LexendRegular
      //       }
      //     }
      //   },
      //   legend: {
      //     fontFamily: 'LexendRegular', // Change font to LexendRegular
      //   }
      // },

      chartOptions: {
        colors: ["#29807C", "#00FFFF"],
        chart: {
          type: "bar",
          height: 430,
          width: "100%",
          id: "vuechart-example2",
          background: "#ffff",
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: false,
          offsetX: -1,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        fill: {
          colors: ["#29807C", "#00FFFF"],
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
          categories: [
            "Total Blogs",
            "Published Blogs",
            "Total Users",
            "New User Registrations",
          ],

          labels: {
            style: {
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "LexendRegular",
              color: "#333",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "12px",
              fontFamily: "LexendRegular",
              color: "#333",
            },
          },
        },
        grid: {
          showLines: true,
        },
        legend: {
          fontSize: "12px",
          fontFamily: "LexendRegular",
          textColor: "#555",
          position: "top",
          horizontalAlign: "center",
        },
        series: [
          {
            name: "Series 1",
            data: [],
          },
          {
            name: "Series 2",
            data: [],
          },
        ],
      },

      chartSeries: [
        {
          name: "Counts",
          data: [],
        },
      ],
    };
  },
  watch: {
    totalBlogs() {
      this.updateChartData();
    },
    publishedBlogs() {
      this.updateChartData();
    },
    totalUsers() {
      this.updateChartData();
    },
    newUserRegistrations() {
      this.updateChartData();
    },
  },
  mounted() {
    // Call the method to update chart data
    this.updateChartData();
  },
  methods: {
    updateChartData() {
      this.flag = false;

      // Check if all data is available before rendering the chart
      if (
        this.totalBlogs !== undefined &&
        this.publishedBlogs !== undefined &&
        this.totalUsers !== undefined &&
        this.newUserRegistrations !== undefined
      ) {
        this.chartSeries[0].data = [
          this.totalBlogs,
          this.publishedBlogs,
          this.totalUsers,
          this.newUserRegistrations,
        ];
        this.dataLoaded = true; // Set the flag to indicate that data is loaded
        this.flag = true; // Set flag to true after data is loaded
      }
    },
  },
};
</script>
  