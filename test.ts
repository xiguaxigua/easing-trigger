import EasingTrigger, { EasingKey } from "./index";
const { echarts } = window as any;
const myChart = echarts.init(document.getElementById("container"));
const result = echarts.init(document.getElementById("result"));
const types = [
  "linear",
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeInQuart",
  "easeOutQuart",
  "easeInOutQuart",
  "easeInQuint",
  "easeOutQuint",
  "easeInOutQuint",
];
let number = 0;
const options = {
  legend: { data: types, selectedMode: "single" },
  xAxis: { type: "value" },
  yAxis: { type: "value" },
  grid: { top: 100 },
  series: [],
};
const optionsResult = {
  legend: { data: types },
  xAxis: { type: "value" },
  yAxis: { type: "value" },
  grid: { top: 100 },
  series: [],
};
types.forEach((type: EasingKey) => {
  const data = [];
  EasingTrigger({
    start: 0,
    end: 200,
    type: type,
    duration: 2000,
    onStep: (y, x) => {
      data.push({
        name: type,
        value: [+Number(x * 100).toFixed(2), +Number(y * 100).toFixed(2)],
      });
    },
    onComplete() {
      number++;
      options.series.push({
        name: type,
        type: "line",
        data,
      });
      optionsResult.series.push({
        name: type,
        type: "line",
        data,
      });
      if (number < types.length) return;
      myChart.setOption(options);
      result.setOption(optionsResult);
    },
  });
});
