# use-container-query

> React hook for element-based media queries.

[![NPM](https://img.shields.io/npm/v/use-container-query.svg)](https://www.npmjs.com/package/use-container-query) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/LXSMNSYC/use-container-query/tree/main/example)

## Install

```bash
yarn add use-container-query
```

## Usage

```tsx
import useContainerQuery from 'use-container-query';

function LandscapeOnly() {
  const ref = useRef(null);
  const isLandscape = useContainerQuery(ref, {
    type: 'orientation',
    value: 'landscape',
  });

  return (
    <div ref={ref}>
      { isLandscape
        ? 'This element is on landscape orientation'
        : 'This element is on portrait orientation'
      }
    </div>
  );
}
```

### Supported queries

- `aspect-ratio`
- `max-aspect-ratio`
- `min-aspect-ratio`
- `width`
- `max-width`
- `min-width`
- `height`
- `max-height`
- `min-height`
- `orientation`
  - `value` must be either `'portrait'` or `'landscape'`

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
