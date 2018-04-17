export class ImagePaste {
  constructor (quill, config = {}) {
    this.quill = quill
    this.config = config
    quill.root.addEventListener('paste', this.handlePaste, false)
  }

  handlePaste = (e) => {
    let clipboardData = e.clipboardData
    let items, item, types
    if (!clipboardData) return
    items = clipboardData.items;
    if (!items) return;
    item = items[0];
    types = clipboardData.types || [];
    for (let i = 0; i < types.length; i++) {
      if (types[i] === 'Files') {
        item = items[i];
        break;
      }
    }
    if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
      e.preventDefault()
      const file = item.getAsFile()
      const { addImageBlob } = this.config
      if (addImageBlob && {}.toString.call(addImageBlob) === '[object Function]') {
        addImageBlob(file, this.insertImg)
      } else {
        this.toBase64(file)
      }
    }
  }

  toBase64 = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      this.insertImg(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  insertImg = (url) => {
    const index = (this.quill.getSelection() || {}).index || this.quill.getLength() - 1
    this.quill.insertEmbed(index, 'image', url, 'user')
    setTimeout(() => {
      this.quill.setSelection(index + 1)
    }, 0)
  }
}

if (window.Quill) {
  window.Quill.register('modules/imagePaste', ImagePaste);
}
