function render() {
  return <ul files={files.map((file) => {
    return <li key={file.name} file={file} onclick={(e) => fileClicked(e, file)}>{file.name}</li>
  })}></ul>;
}
