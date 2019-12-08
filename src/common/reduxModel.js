/**
 * get unqId
 * 
 * @param {String} objectName
 * @param {Mixed}  id
 * 
 * @return {String}
 */
function uniqueId(objectName, id) {
  if (!id) {
    return null;
  }
  return `${objectName}${id}`;
}

/**
 *
 */
export function buildModelRelationship(reducer, target, relationship, options, cache) {
  const { ignoreLinks } = options;
  const rel = target.relationships[relationship];
  if (typeof rel.data !== 'undefined') {
    if (Array.isArray(rel.data)) {
      return rel.data.map(
        child => buildModel(reducer, child.type, child.id, options, cache) || child,
      );
    } else if (rel.data === null) {
      return null;
    }
    return buildModel(reducer, rel.data.type, rel.data.id, options, cache) || rel.data;
  } else if (!ignoreLinks && rel.links) {
    throw new Error(
      "Remote lazy loading is not supported. To disable this error, include option 'ignoreLinks: true' in the buildModel function like so: buildModel(reducer, type, id, { ignoreLinks: true })",
    );
  }
  return [];
}

/**
 * buildModel from a JsonApiNormalizer object
 * 
 * @param {Object} reducer - JsonApi Object
 * @param {String} objectName
 * @param {Mixed}  id
 * @param {object} providedOpts
 * @param {object} cache
 */
export function buildModel(reducer, objectName, id = null, providedOpts = {}, cache = {}) {
  const defOpts = { eager: false, ignoreLinks: false, includeType: true, includeId: true };
  const options = Object.assign({}, defOpts, providedOpts);
  const { eager, includeType, includeId } = options;
  if (!reducer[objectName]) {
    return null;
  }
  if (id === null || Array.isArray(id)) {
    if (reducer['MAINELEM'] == objectName) {
      const idList = reducer['SORTEDELEMS'];
      return idList.map(e => buildModel(reducer, objectName, e, options, cache));
    } else {
      const idList2 = id || Object.keys(reducer[objectName]);
      return idList2.map(e => buildModel(reducer, objectName, e, options, cache));
    }
  }
  const ids = id.toString();
  const uuid = uniqueId(objectName, ids);
  const cachedObject = cache[uuid];
  if (cachedObject) {
    const clone = {...cachedObject};
    return clone;
  }
  const ret = {};
  const target = reducer[objectName][ids];
  if (!target) {
    return null;
  }
  if (includeId && target.id) {
    ret.id = target.id;
  }
  Object.keys(target.attributes).forEach(key => {
    ret[key] = target.attributes[key];
  });
  if (includeType && !ret.type) {
    ret.type = objectName;
  }
  cache[uuid] = ret;
  if (target.relationships) {
    Object.keys(target.relationships).forEach(relationship => {
      if (eager) {
        ret[relationship] = buildModelRelationship(reducer, target, relationship, options, cache);
      } else {
        Object.defineProperty(ret, relationship, {
          get: () => {
            const field = `__${relationship}`;
            if (ret[field]) {
              return ret[field];
            }
            ret[field] = buildModelRelationship(reducer, target, relationship, options, cache);
            return ret[field];
          },
          set: (value) => {
            const field = `__${relationship}`;
            ret[field] = value;
          },
        });
      }
    });
  }
  if (includeId && typeof ret.id === 'undefined') {
    ret.id = ids;
  }
  return ret;
}

export function buildFirstModel(reducer, objectName) {
  const models = buildModel(reducer, objectName);
  if (models && models.length > 0) {
    return models[0];
  }
  return false;
}
