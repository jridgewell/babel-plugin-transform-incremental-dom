import { dirname, join, relative } from "path";

export default function resolvePath(currentFile, path) {
  if (path.startsWith(".")) {
    path = relative(
      dirname(currentFile),
      join(process.cwd(), path)
    );
  }

  return path;
}
