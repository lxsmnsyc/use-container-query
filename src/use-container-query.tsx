/**
 * @license
 * MIT License
 *
 * Copyright (c) 2020 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2020
 */
import { MutableRefObject, useState } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import useIsomorphicEffect from './use-isomorphic-effect';
import nearlyEqual from './nearly-equal';

export type ContainerOrientation =
  | 'portrait'
  | 'landscape';

interface ContainerQueryWidth {
  type: 'width';
  value: number;
}
interface ContainerQueryMaxWidth {
  type: 'max-width';
  value: number;
}
interface ContainerQueryMinWidth {
  type: 'min-width';
  value: number;
}
interface ContainerQueryHeight {
  type: 'height';
  value: number;
}
interface ContainerQueryMaxHeight {
  type: 'max-height';
  value: number;
}
interface ContainerQueryMinHeight {
  type: 'min-height';
  value: number;
}
interface ContainerQueryAspectRatio {
  type: 'aspect-ratio';
  value: number;
}
interface ContainerQueryMaxAspectRatio {
  type: 'max-aspect-ratio';
  value: number;
}
interface ContainerQueryMinAspectRatio {
  type: 'min-aspect-ratio';
  value: number;
}
interface ContainerQueryOrientation {
  type: 'orientation';
  value: ContainerOrientation;
}

export type ContainerQuery =
  | ContainerQueryWidth
  | ContainerQueryMaxWidth
  | ContainerQueryMinWidth
  | ContainerQueryHeight
  | ContainerQueryMaxHeight
  | ContainerQueryMinHeight
  | ContainerQueryAspectRatio
  | ContainerQueryMaxAspectRatio
  | ContainerQueryMinAspectRatio
  | ContainerQueryOrientation;

function evaluateQuery(
  query: ContainerQuery,
  { width, height }: DOMRectReadOnly,
): boolean {
  const ratio = width / height;
  switch (query.type) {
    case 'aspect-ratio':
      return nearlyEqual(ratio, query.value);
    case 'height':
      return nearlyEqual(height, query.value);
    case 'max-aspect-ratio':
      return ratio <= query.value;
    case 'max-height':
      return height <= query.value;
    case 'max-width':
      return width <= query.value;
    case 'min-aspect-ratio':
      return ratio >= query.value;
    case 'min-height':
      return height >= query.value;
    case 'min-width':
      return width >= query.value;
    case 'orientation':
      return (width > height ? 'landscape' : 'portrait') === query.value;
    case 'width':
      return nearlyEqual(width, query.value);
    default:
      return false;
  }
}

function useContainerQuery(
  ref: MutableRefObject<HTMLElement | null>,
  query: ContainerQuery,
): boolean {
  const [state, setState] = useState(false);

  useIsomorphicEffect(() => {
    const { current } = ref;

    setState(false);

    if (current) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === current) {
            setState(evaluateQuery(query, entry.contentRect));
          }
        });
      });

      observer.observe(current);

      return () => {
        observer.unobserve(current);
        observer.disconnect();
      };
    }

    return undefined;
  }, [ref.current, query.type, query.value]);

  return state;
}

export default useContainerQuery;
