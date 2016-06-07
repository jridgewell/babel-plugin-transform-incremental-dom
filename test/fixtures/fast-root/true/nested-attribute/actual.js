function render() {
  return <ul files={files.map((file) => {
    return <li>
      <span key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</span>
    </li>
  })}></ul>;
}
