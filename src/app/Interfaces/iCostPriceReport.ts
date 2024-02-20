export interface ICostPriceReport{
  productionCostCode: string,
  conditionalReferenceHectares: number,
  costPrice: number,
  waybillIdentifiers: IWaybillIdentifier[]
}

interface IWaybillIdentifier{
  id: number,
  number: number
}