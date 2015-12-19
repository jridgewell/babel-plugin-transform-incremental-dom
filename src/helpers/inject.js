import toReference from "./ast/to-reference";

const namespace = "incremental-dom-helpers";

function getHelperRef(t, { file, opts }, helper) {
  const runtime = opts.runtime;
  if (runtime) {
    return toReference(t, `${runtime}.${helper}`);
  }

  const injectedHelper = file.get(namespace)[helper];
  return injectedHelper ? injectedHelper.ref : null;
}

function setHelper({ file }, helper, value) {
  return file.get(namespace)[helper] = value;
}

// Sets up the needed data maps for injecting runtime helpers.
export function setupInjector({ file }) {
  // A map to store helper variable references
  // for each file
  file.set(namespace, Object.create(null));
}

export function injectHelpers({ file }) {
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
export default function inject(t, plugin, helper, helperAstFn, dependencyInjectors = {}) {
  let ref = getHelperRef(t, plugin, helper);
  if (ref) {
    return ref;
  }

  ref = plugin.file.scope.generateUidIdentifier(helper);
  let expression = null;

  const injectedHelper = { ref, expression };
  setHelper(plugin, helper, injectedHelper);

  const dependencyRefs = {};

  for (let dependency in dependencyInjectors) {
    let dependencyRef = getHelperRef(t, plugin, dependency);

    if (!dependencyRef) {
      dependencyRef = dependencyInjectors[dependency](t, plugin);
    }

    dependencyRefs[dependency] = dependencyRef;
  }

  injectedHelper.expression = helperAstFn(t, plugin, injectedHelper.ref, dependencyRefs);

  return ref;
}
