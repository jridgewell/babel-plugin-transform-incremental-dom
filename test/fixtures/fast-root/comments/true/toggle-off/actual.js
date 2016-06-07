// @fastRoot true
function render() {
  return <ul>
  {
    // @fastRoot false
    files.map((file) => {
      return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
    })
  }
  </ul>;
}
