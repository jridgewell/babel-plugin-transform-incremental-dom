function render() {
  return <ul files={files.map((file) => {
    return <li attr={
      <span><span key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</span></span>
    }></li>
  })}></ul>;
}
