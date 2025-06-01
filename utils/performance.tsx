import {  PerformanceObserver } from "react-native-performance";

export const setupPerformanceObserver = () => {
  console.log("PerformanceObserver initialized"); 
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`[PERF] ${entry.name}: ${entry.duration?.toFixed(2)}ms`);
    });
  });
  observer.observe({ entryTypes: ["measure"] });
};

export const markStart = (name: string) => {
  performance.mark(`${name}_start`);
};

export const markEndAndMeasure = (name: string) => {
  const start = `${name}_start`;
  const end = `${name}_end`;
  performance.mark(end);
  performance.measure(`${name}_duration`, start, end);
};