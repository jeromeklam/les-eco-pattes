import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

function wrap(json) {
  if (isArray(json)) {
    return json;
  }
  return [json];
}

function extractRelationships(relationships, { camelizeKeys }) {
  const ret = {};
  keys(relationships).forEach((key) => {
    const relationship = relationships[key];
    const name = camelizeKeys ? camelCase(key) : key;
    ret[name] = {};
    if (typeof relationship.data !== 'undefined') {
      if (isArray(relationship.data)) {
        ret[name].data = relationship.data.map(e => ({
          id: e.id,
          type: camelizeKeys ? camelCase(e.type) : e.type,
        }));
      } else if (!isNull(relationship.data)) {
        ret[name].data = {
          id: relationship.data.id,
          type: camelizeKeys ? camelCase(relationship.data.type) : relationship.data.type,
        };
      } else {
        ret[name].data = relationship.data;
      }
    }
    if (relationship.links) {
      ret[name].links = relationship.links;
    }
  });
  return ret;
}

function extractErrors(json, { camelizeKeys }) {
  let ret = [];
  json.map((elem) => {
    elem['isFlash'] = true;
    if (elem.meta && elem.meta.field) {
      elem['isFlash'] = false;
    }
    ret.push(elem);
  });
  return ret;
}

function extractEntities(json, { camelizeKeys }, origin, mainElement = false) {
  const ret = origin;
  wrap(json).forEach((elem) => {
    if (!elem.errors) {
      const type = camelizeKeys ? camelCase(elem.type) : elem.type;
      if (mainElement) {
        ret['MAINELEM'] = type;
      }
      ret[type] = ret[type] || {};
      ret[type][elem.id] = ret[type][elem.id] || {
        id: elem.id,
      };
      if (camelizeKeys) {
        ret[type][elem.id].attributes = {};
        keys(elem.attributes).forEach((key) => {
          ret[type][elem.id].attributes[camelCase(key)] = elem.attributes[key];
        });
      } else {
        ret[type][elem.id].attributes = elem.attributes;
      }
      if (elem.links) {
        ret[type][elem.id].links = {};
        keys(elem.links).forEach((key) => {
          ret[type][elem.id].links[key] = elem.links[key];
        })
      }
      if (elem.relationships) {
        ret[type][elem.id].relationships =
          extractRelationships(elem.relationships, { camelizeKeys });
      }
      if (mainElement) {
        ret['SORTEDELEMS'] = ret['SORTEDELEMS'] || [];
        ret['SORTEDELEMS'].push(elem.id);
      }
    }
  });
  ret.length = 0;
  if (ret.SORTEDELEMS) {
    ret.length = ret.SORTEDELEMS.length;
  }
  return ret;
}

function doFilterEndpoint(endpoint) {
  return endpoint.replace(/\?.*$/, '');
}

function extractMetaData(json, endpoint, { camelizeKeys, filterEndpoint }) {
  const ret = {};
  ret.meta  = {};
  let metaObject;
  if (!filterEndpoint) {
    const filteredEndpoint = doFilterEndpoint(endpoint);
    ret.meta[filteredEndpoint] = {};
    ret.meta[filteredEndpoint][endpoint.slice(filteredEndpoint.length)] = {};
    metaObject = ret.meta[filteredEndpoint][endpoint.slice(filteredEndpoint.length)];
  } else {
    ret.meta[endpoint] = {};
    metaObject = ret.meta[endpoint];
  }
  metaObject.data = {};
  if (json.data) {
    const meta = [];
    wrap(json.data).forEach((object) => {
      const pObject = { id: object.id, type: camelizeKeys ? camelCase(object.type) : object.type };
      if (object.relationships) {
        pObject.relationships =
          extractRelationships(object.relationships, { camelizeKeys });
      }
      meta.push(pObject);
    });
    metaObject.data = meta;
    if (json.links) {
      metaObject.links = json.links;
      ret.meta[doFilterEndpoint(endpoint)].links = json.links;
    }
    if (json.meta) {
      metaObject.meta = json.meta;
    }
  }
  return ret;
}

export function jsonApiUpdate(json, key, value) {
  if (json[key]) {
    const main = value.MAINELEM;
    const ids  = value.SORTEDELEMS;
    keys(value[main]).forEach((elem) => {
      if (ids.indexOf(elem) >= 0) {
        json[key][elem] = value[main][elem];
      }
    });
  }
  return json;
}

/**
 *
 */
export function jsonApiNormalizer(json, origin = {errors: []}, opts = {}) {
  const { endpoint } = opts;
  let { filterEndpoint, camelizeKeys } = opts;
  if (typeof filterEndpoint === 'undefined') {
    filterEndpoint = true;
  }
  if (typeof camelizeKeys === 'undefined') {
    camelizeKeys = false;
  }
  if (json.data) {
    merge(
      origin,
      extractEntities(json.data, { camelizeKeys }, origin, true)
    );
    if (json.data.errors) {
      origin.errors = extractErrors(json.data.errors, { camelizeKeys });
    }
  }
  if (json.errors) {
    origin.errors = extractErrors(json.errors, { camelizeKeys });
  }
  if (json.included) {
    merge(
      origin,
      extractEntities(json.included, { camelizeKeys }, origin, false)
    );
  }
  if (endpoint) {
    const endpointKey = filterEndpoint ? doFilterEndpoint(endpoint) : endpoint;
    merge(origin, extractMetaData(json, endpointKey, { camelizeKeys, filterEndpoint }));
  }
  return origin;
}

/**
 * Get attributes from an object
 * 
 * @param {Object} obj
 * 
 * @return {Object}
 */
export function getJsonApiAttributes(obj) {
  // Quickly remove id and type if exists...
  //const {id, type, ...ret} = obj;
  let ret = {};
  const keys = Object.getOwnPropertyNames(obj);
  keys.forEach((key) => {
    if (key !== 'id' && key !== 'type') {
      if (!obj[key] || (!obj[key].id && !obj[key].type)) {
        if (!obj[key] || !obj[key].id || (obj[key].id && obj[key].id !== "0")) {
          ret[key] = obj[key];
        }
      }
    }
  });
  return ret;
}

/**
 * Get relationships from an object
 * 
 * @param {Object} obj
 * 
 * @return {Object}
 */
export function getJsonApiRelatinships(obj) {
  // Quickly remove id and type if exists...
  //const {id, type, ...ret} = obj;
  let rels = {};
  const keys = Object.getOwnPropertyNames(obj);
  keys.forEach((key) => {
    if (obj[key] && obj[key].id && obj[key].id !== "0" && obj[key].type) {
      rels[key] = {
        data : {
          id: obj[key].id,
          type: obj[key].type
        }
      }
    }
  });
  return rels;
}

/**
 * Get Object (ReduxModel) as JsonApi Object
 * 
 * @param {Object} obj
 * 
 * @return {Object}
 */
export function getJsonApi(obj) {
  const attributes = getJsonApiAttributes(obj);
  const relations  = getJsonApiRelatinships(obj);
  let id = obj.id;
  if (id === "0") {
    id = null;
  }
  let jsonApi = {
    data: {
      type: obj.type,
      id: id,
      attributes: attributes
    }
  };
  if (Object.keys(relations).length > 0) {
    jsonApi.data['relationships'] = relations;
  }
  return jsonApi;
}

/**
 *
 */
export function addRelationships(name, type, obj) {
  let jsonApiRelationships = getJsonApi(obj, type, 0);
  let jsonApi = {};
  jsonApi[name] = {...jsonApiRelationships};
  return jsonApi;
}


/**
 *
 */
export function getJsonApiWithRelationships(name, id_field, attributes, relationships) {
  const jsonApi = {
    data: {
      id: id_field,
      type: name,
      attributes: {...attributes},
      relationships: {...relationships}
    }
  };
  return jsonApi;
}

/**
 *
 */
export function getFieldError(errors, field) {
  let error = false;
  errors.some(function(val, i) {
    if (val.source && val.source.parameter && val.source.parameter == field) {
      error = {
        code: val.code,
        label: val.title
      };
      return true;
    }
  });
  return error;
}
