export interface IOperation{
  id: number,
  productionCostCode: string,
  numberOfRuns: number,
  totalMileage: number,
  totalMileageWithLoad: number,
  transportedLoad: number,
  norm: number,
  fact: number,
  mileageWithLoad: number,
  normShift: number,
  conditionalReferenceHectares: number,
  fuelConsumptionPerUnit: number,
  totalFuelConsumption: number
}