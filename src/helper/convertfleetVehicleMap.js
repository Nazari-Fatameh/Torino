export const fleetVehicleMap = {
  Bus: "اتوبوس",
  Van: "ون",
  SUV: "زمینی",
  Airplane: "پرواز",
};

export function fleetVehicleToPersian(vehicle) {
  return fleetVehicleMap[vehicle] || vehicle;
}
