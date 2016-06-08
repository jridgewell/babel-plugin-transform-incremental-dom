function render() {
  // @incremental-dom disable-fastRoot
  return <ul>
  {
    files.map((file) => {
      return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
    })
  }
  </ul>;
}
