function render() {
  return <ul>
  {
    files.map((file) => {
      // @fastRoot true
      return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
    })
  }
  </ul>;
}
