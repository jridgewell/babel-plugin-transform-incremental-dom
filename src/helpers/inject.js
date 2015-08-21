const namespace = "incremental-dom-helpers";

function getHelperRef(file, helper) {
  return file.get(namespace)[helper];
}

function setHelperRef(file, helper, value) {
  return file.get(namespace)[helper] = value;
}

function nullObject() {
  return Object.create(null);
}


// Sets up the needed data maps for injecting runtime helpers.
export function setupInjector(program, parent, scope, file) {
  // A map to store helper variable references
  // for each file
  file.setDynamic(namespace, nullObject);
}


// Injects a helper function defined by helperAstFn into the current file at
// the top scope.
export default function inject(t, file, helper, helperAstFn, dependencyInjectors = {}) {
  let helperRef = getHelperRef(file, helper);
  if (helperRef) {
    return helperRef;
  }

  helperRef = file.scope.generateUidIdentifier(helper);
  setHelperRef(file, helper, helperRef);

  const dependencyRefs = {};

  for (let dependency in dependencyInjectors) {
    let dependencyRef = getHelperRef(file, dependency);

    if (!dependencyRef) {
      dependencyRef = dependencyInjectors[dependency](t, file);
    }

    dependencyRefs[dependency] = dependencyRef;
  }

  file.path.unshiftContainer("body", helperAstFn(t, helperRef, dependencyRefs));

  return helperRef;
}
