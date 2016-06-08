function render() {
  return <ul>
  {
    files.map((file) => {
      // @incremental-dom enable-fastRoot
      return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
    })
  }
  </ul>;
}
