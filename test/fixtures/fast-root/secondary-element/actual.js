function render() {
  var ul = <ul>
  {
    files.map((file) => {
      return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
    })
  }
  </ul>;
  return <root>{ul}</root>;
}
