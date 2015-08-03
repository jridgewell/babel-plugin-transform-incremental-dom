function get(file, hash, name) {
  return file.get(hash)[name];
}

function set(file, hash, name, value) {
  file.get(hash)[name] = value;
}

function getHelperRef(file, helper) {
  return get(file, "incremental-dom-helpers", helper);
}

function setHelperRef(file, helper, value) {
  return set(file, "incremental-dom-helpers", helper, value);
}

function helperIsDefined(file, helper) {
  return get(file, "incremental-dom-helpers-defs", helper);
}

function defineHelper(file, helper) {
  return set(file, "incremental-dom-helpers-defs", helper, true);
}

function nullObject() {
  return Object.create(null);
}


// Sets up the needed data maps for injecting runtime helpers.
export function setupInjector(program, parent, scope, file) {
  // A map to store helper variable references
  // for each file
  file.setDynamic("incremental-dom-helpers", nullObject);

  // A map of semaphores for each helper, so that
  // a dependency is not injected multiple times.
  // We use this instead of only helperReferences,
  // so that we may create dependency references
  // and later unshift the actual definition,
  // placing dependency definitions before the
  // dependent.
  file.setDynamic("incremental-dom-helpers-defs", nullObject);
}


// Injects a helper function defined by helperAstFn into the current file at
// the top scope.
// Optionally takes a forced reference identifier, in case a dependent defined
// the reference for the helper.
export default function inject(t, file, forcedRef, helper, helperAstFn, dependencyInjectors = {}) {
  if (helperIsDefined(file, helper)) {
    return getHelperRef(file, helper);
  }

  let helperRef = forcedRef || file.scope.generateUidIdentifier(helper);
  setHelperRef(file, helper, helperRef);
  defineHelper(file, helper);

  let dependencyRefs = {};
  let undefinedDeps = [];
  for (let dependency in dependencyInjectors) {
    let dependencyRef = getHelperRef(file, dependency);
    if (!dependencyRef) {
      dependencyRef = file.scope.generateUidIdentifier(dependency);
      setHelperRef(file, dependency, dependencyRef);
    }
    dependencyRefs[dependency] = dependencyRef;

    if (!helperIsDefined(file, dependency)) {
      undefinedDeps.push(dependency);
    }
  }

  file.path.unshiftContainer("body", helperAstFn(t, helperRef, dependencyRefs));

  for (let dependency of undefinedDeps) {
    dependencyInjectors[dependency](t, file, dependencyRefs[dependency]);
  }

  return helperRef;
}
