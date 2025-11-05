import dayjs from "dayjs";
export function deliveryTimeCalculations(estimatedDeliveryTimeMs, orderTimeMs) {
  const timeCalculations = {
    totalDeliveryTimeMs: 0,
    timePassedMs: 0,
    deliveryProgressPercent: 0,
  };
  timeCalculations.totalDeliveryTimeMs = estimatedDeliveryTimeMs - orderTimeMs;
  timeCalculations.timePassedMs = dayjs().valueOf() - orderTimeMs;
  timeCalculations.deliveryProgressPercent =
    (timeCalculations.timePassedMs / timeCalculations.totalDeliveryTimeMs) *
    100;
  return timeCalculations;
}
