// pages/charts.js

"use client";
import dynamic from "next/dynamic";

// Import chart only on client side
const ChartsView = dynamic(() => import("../components/ChartView"), {
  ssr: false,
});

export default function ChartsPage() {
  return <ChartsView />;
}

