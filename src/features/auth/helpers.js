export const defaultConfig = {
  "layout": {
    "savemenu": false,
    "menuposition" : true
  }
};

export const schema = {
    "title": "Configuration",
    "description": "Configuration",
    "type": "object",
    "properties": {
      "layout": {
        "title": "Affichage",
        "description": "Options d'affichage",
        "type": "object",
        "properties": {
          "savemenu": {
            "title": "Sauver la position du menu",
            "type": "boolean",
            "default": false
          },
          "menuposition": {
            "title": "Menu ouvert par défaut",
            "type": "boolean",
            "default": true 
          },
        },
        "required": [ "savemenu", "menuposition" ],
        "default" : {"savemenu": true, "menuposition" : true}
      }
    },
    "required": [ "layout" ]
  }