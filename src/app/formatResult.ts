export function formatResult(result: number, digits: number){
  return isNaN(result) ? 'Ошибка' : result.toFixed(digits);
}