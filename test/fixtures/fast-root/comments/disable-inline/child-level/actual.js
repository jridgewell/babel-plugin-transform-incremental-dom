function render() {
  return <ul>
  {
    // @incremental-dom disable-fastRoot
    files.map((file) => {
      return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
    })
  }
  </ul>;
}
