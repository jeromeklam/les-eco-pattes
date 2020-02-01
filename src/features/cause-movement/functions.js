/**
 * 
 */
export const statusLabel = (code) => {
  switch (code) {
    case 'OK': {
      return 'Effectué';
    }
    case 'WAIT': {
      return 'A valider';
    }
    default: {
      return 'Autre';
    }
  }
};