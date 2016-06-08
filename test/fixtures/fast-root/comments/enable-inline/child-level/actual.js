function render() {
  return <ul>
  {
    // @incremental-dom enable-fastRoot
    files.map((file) => {
      return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
    })
  }
  </ul>;
}
