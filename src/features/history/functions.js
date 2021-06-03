/**
 * 
 */
export const getLibMethod = (method) => {
  switch (method) {
    case 'U':
      return 'Mise à jour';
    case 'C':
      return 'Création';
    case 'D':
      return 'Suppression';
    default:
      return '...';
  }
}

/**
 * 
 */
export const getLibObject = (object, id) => {
  let libObj = object;
  switch (object) {
    case 'FreeFW_Alert':
      libObj = 'Alerte';
      break;
    case 'FreeSSO_Broker':
      libObj = 'Accès';
      break;
    case 'FreeAsso_Cause':
      libObj = 'Animal';
      break;
    case 'FreeAsso_CauseGrowth':
      libObj = 'Croissance';
      break;
    case 'FreeAsso_CauseMainType':
      libObj = 'Espèce';
      break;
    case 'FreeAsso_CauseMedia':
      libObj = 'Média animal';
      break;
    case 'FreeAsso_CauseMovement':
      libObj = 'Mouvement animal';
      break;
    case 'FreeAsso_CauseType':
      libObj = "Race";
      break;
    case 'FreeAsso_CauseSickness':
      libObj = 'Maladie animal';
      break;
    case 'FreeAsso_Client':
      libObj = 'Contact';
      break;
    case 'FreeAsso_ClientCategory':
      libObj = 'Catégorie de contact';
      break;
    case 'FreeAsso_ClientType':
      libObj = 'Type de contact';
      break;
    case 'FreeAsso_Contract':
      libObj = 'Contrat';
      break;
    case 'FreeAsso_ContractMedia':
      libObj = 'Média contrat';
      break;
    case 'FreeSSO_Domain':
      libObj = 'Domaine';
      break;
    case 'FreeFW_Email':
      libObj = 'Mailing';
      break;
    case 'FreeFW_EmailLang':
      libObj = 'Version mailing';
      break;
    case 'FreeFW_Edition':
      libObj = 'Edition';
      break;
    case 'FreeFW_EditionLang':
      libObj = 'Version édition';
      break;
    case 'FreeFW_Follow':
      libObj = 'Suivi';
      break;
    case 'FreeSSO_Group':
      libObj = 'Entité';
      break;
    case 'FreeSSO_GroupType':
      libObj = 'Type d\'entité';
      break;
    case 'FreeSSO_GroupUser':
      libObj = 'Lien utilisateur-groupe';
      break;
    case 'FreeFW_Message':
      libObj = 'Message'; 
      break;
    case 'FreeAsso_Movement':
      libObj = 'Mouvement';
      break;
    case 'FreeAsso_Sickness':
      libObj = 'Maladie';
      break;
    case 'FreeAsso_Site':
      libObj = 'Site';
      break;
    case 'FreeAsso_SiteMedia':
      libObj = 'Média site';
      break;
    case 'FreeAsso_SiteType':
      libObj = 'Type de site';
      break;
    case 'FreeFW_Text':
      libObj = 'Texte préféfini';
      break;
    case 'FreeSSO_User':
      libObj = 'Utilisateur';
      break;
    case 'FreeSSO_UserBroker':
      libObj = 'Accès utilisateur';
      break;  
    default:
      break;
  }
  libObj += ' (' + id + ')';
  return libObj;
}



     