function nullObject() {
  return Object.create(null);
}

// A map to store helper variable references
// for each file
const helperReferences = nullObject();

// A map of semaphores for each helper -> file,
// so that a dependency is not injected multiple
// times.
// We use this instead of only helperReferences,
// so that we may create dependency references
// and later unshift the actual definition,
// making dependency definitions before the
// dependent.
const helperDefines = nullObject();

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

// Injects a helper function defined by helperAstFn into the current file at
// the top scope.
// Optionally takes a forced reference identifier, in case a dependent defined
// the reference for the helper.
export default function inject(t, file, forcedRef, name, helperAstFn, dependencyInjectors = {}) {
  let filename = file.opts.filename;
  if (helperIsDefined(filename, name)) {
    return getHelperRef(filename, name);
  }

  let helperRef = forcedRef || file.scope.generateUidIdentifier(name);
  set(helperReferences, filename, name, helperRef);
  set(helperDefines, filename, name, true);

  let dependencyRefs = {};
  let undefinedDeps = [];
  for (let dependency in dependencyInjectors) {
    let dependencyRef = getHelperRef(filename, dependency);
    if (!dependencyRef) {
      dependencyRef = file.scope.generateUidIdentifier(dependency);
      set(helperReferences, filename, dependency, dependencyRef);
    }
    dependencyRefs[dependency] = dependencyRef;

    if (!helperIsDefined(filename, dependency)) {
      undefinedDeps.push(dependency);
    }
  }

  file.path.unshiftContainer("body", helperAstFn(t, helperRef, dependencyRefs));

  for (let dependency of undefinedDeps) {
    dependencyInjectors[dependency](t, file, dependencyRefs[dependency]);
  }

  return helperRef;
}
