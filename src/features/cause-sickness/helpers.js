export const whereSelect = [
  { label: 'Sur site', value: 'SITE' },
  { label: 'Vétérinaire', value: 'SANITARY' },
  { label: 'Autre', value: 'OTHER' },
];

export const getWhereLabel = code => {
  const found = whereSelect.find(elem => elem.value === code);
  if (found) {
    return found.label;
  }
  return '';
}