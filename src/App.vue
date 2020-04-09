<template>
  <div id="app">
    <h2>VueDragChart</h2>
    <VueDragChart
      :list="item"
      v-for="(item,index) in chartlist"
      :key="index"
      @changelist="changelist"
    ></VueDragChart>
  </div>
</template>

<script>
import VueDragChart from "../src/vue-drag-chart/index.vue";
export default {
  name: "app",
  data() {
    return {
      chartlist: [
        {
          width: 0.3,
          height: 0.3,
          x: 200,
          y: 100,
          title: "折线图",
          type: 1,
          chartData: {
            columns: ["日期", "访问用户", "下单用户", "下单率"],
            rows: [
              { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
              { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
              { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
              { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
              { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
              { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
            ]
          }
        },
        {
          width: 0.5,
          height: 0.3,
          x: 400,
          y: 400,
          title: "饼图",
          type: 3,
          chartData: {
            columns: ["日期", "访问用户", "下单用户", "下单率"],
            rows: [
              { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
              { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
              { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
              { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
              { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
              { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
            ]
          }
        }
      ]
    };
  },
  components: {
    //注册插件
    VueDragChart
  },
  methods: {
    changelist() {
      console.log(this.chartlist);
    }
  }
};
</script>

<style>
body,html{
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>