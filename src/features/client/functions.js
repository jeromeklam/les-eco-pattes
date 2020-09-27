import { normalizedObjectModeler } from 'jsonapi-tools';

export function raiserAsOptions(object) {
  let arr = [];
  if (object) {
    let items = normalizedObjectModeler(object, 'FreeAsso_Client');
    if (items) {
      items.forEach(item => {
        arr.push({ value: item.id, label: item.clicaut_name });
      });
      arr.sort(function(a, b) {
        if (a.label > b.label) {
          return 1;
        } else {
          if (a.label < b.label) {
            return -1;
          }
        }
        return 0;
      });
    }
  }
  return arr;
}
