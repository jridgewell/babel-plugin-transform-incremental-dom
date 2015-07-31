function nullObject() {
  return Object.create(null);
}

const helperDefines = nullObject();
const helperReferences = nullObject();

function getHelperRef(filename, name) {
  return helperReferences[name] && helperReferences[name][filename];
}

function helperIsDefined(filename, name) {
  return helperDefines[name] && helperDefines[name][filename];
}

function set(hash, filename, name, value) {
  if (!hash[name]) {
     hash[name] = nullObject();
  }
  hash[name][filename] = value;
}

export default function injectHelper(t, file, forcedRef, name, helperAstFn, helperDepFns = {}) {
  let filename = file.opts.filename;
  if (helperIsDefined(filename, name)) {
    return getHelperRef(filename, name);
  }

  let helperRef = forcedRef || file.scope.generateUidIdentifier(name);
  set(helperReferences, filename, name, helperRef);
  set(helperDefines, filename, name, true);

  let depRefs = {};
  let undefinedDeps = [];
  for (let dep in helperDepFns) {
    let depRef = getHelperRef(filename, dep);
    if (!depRef) {
      depRef = file.scope.generateUidIdentifier(dep);
      set(helperReferences, filename, dep, depRef);
    }
    depRefs[dep] = depRef;

    if (!helperIsDefined(filename, dep)) {
      undefinedDeps.push(dep);
    }
  }

  file.path.unshiftContainer("body", helperAstFn(t, helperRef, depRefs));

  for (let dep of undefinedDeps) {
    helperDepFns[dep](t, file, depRefs[dep]);
  }

  return helperRef;
}
