// Determines if this JSX element has fast-root enabled or disabled.
// Fast root may be explicitly set using inline comments, and defaults
// to the global option value.
export default function useFastRoot(path, { fastRoot = false }) {
  path.find((path) => {
    const comments = path.node.leadingComments;

    return comments && comments.find((comment) => {
      const match = /@incremental-dom.+(enable|disable)-fastRoot/.exec(comment.value);

      if (match) {
        fastRoot = match[1] === "enable";
        return true;
      }
    });
  });

  return fastRoot;
}

