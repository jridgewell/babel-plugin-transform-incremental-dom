function render() {
  return <root>
  {
    files.map((file) => {
      return <li><span key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</span></li>
    })
  }
  </root>;
}
