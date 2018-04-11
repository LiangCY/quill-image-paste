# Quill ImagePaste Module

A module for Quill editor to allow paste image.

## Demo

[CodePen](https://codepen.io/liangcy/pen/oqVYGe)

## Usage

```html
<script src="./quill-image-paste-module/image-paste.min.js"></script>
```

```javascript
var quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    ImageResize: {
      // options
    }
  }
});
```

### options

Pass an empty object, paste image as base64
```javascript
var quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imagePaste: {}
  }
});
```

You can also use `addImageBlob` option to upload image to server

```javascript
const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imagePaste: {
      addImageBlob: function (blob, callback) {
        var formData = new FormData()
        formData.append('image', blob)
        // your upload function, get the uploaded image url, add then
        callback(imageUrl)
      }
    }
  }
});
```
