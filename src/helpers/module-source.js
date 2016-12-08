import resolvePath from "./resolve-path";

// Determines the import module source for iDOM.
export default function moduleSource({ opts, file }) {
  let { moduleSource } = opts;;
  if (moduleSource) {
    return resolvePath(file.opts.filename, moduleSource);
  }

  // See if we can find the incremental-dom import.
  const { imports } = file.metadata.modules;
  const imported = imports.find((imported) => {
    return imported.source === "incremental-dom";
  });

  if (imported) {
    return "incremental-dom";
  }
}

