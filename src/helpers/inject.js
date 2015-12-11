const namespace = "incremental-dom-helpers";

function getHelperRef(file, helper) {
  const injectedHelper = file.get(namespace)[helper];
  return injectedHelper ? injectedHelper.ref : null;
}

function setHelper(file, helper, value) {
  return file.get(namespace)[helper] = value;
}

// Sets up the needed data maps for injecting runtime helpers.
export function setupInjector(file) {
  // A map to store helper variable references
  // for each file
  file.set(namespace, Object.create(null));
}

export function injectHelpers(program, file) {
  const injectedHelpers = file.get(namespace);

  for (let helper in injectedHelpers) {
    const { ref, expression } = injectedHelpers[helper];
    file.scope.push({
      id: ref,
      init: expression,
      unique: true
    });
  }
}


// Injects a helper function defined by helperAstFn into the current file at
// the top scope.
export default function inject(t, file, helper, helperAstFn, dependencyInjectors = {}) {
  let ref = getHelperRef(file, helper);
  if (ref) {
    return ref;
  }

  ref = file.scope.generateUidIdentifier(helper);
  let expression = null;

  const injectedHelper = { ref, expression };
  setHelper(file, helper, injectedHelper);

  const dependencyRefs = {};

  for (let dependency in dependencyInjectors) {
    let dependencyRef = getHelperRef(file, dependency);

    if (!dependencyRef) {
      dependencyRef = dependencyInjectors[dependency](t, file);
    }

    dependencyRefs[dependency] = dependencyRef;
  }

  injectedHelper.expression = helperAstFn(t, file, injectedHelper.ref, dependencyRefs);

  return ref;
}
