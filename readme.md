# extract-valid
A library for extracting valid fields from object scheme.

## Install
```bash
npm install extract-valid
```

## Usage
```js
import { extractValid } from 'extract-valid'

const result = extractValid({
    bar: void 0,
    foo: "",
    valid: "valid"
}, options)
console.log(result) // { valid: "valid" }

```

## License
MIT
