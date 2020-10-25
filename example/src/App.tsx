import React, { useRef } from "react";
import useContainerQuery, { ContainerQuery } from 'use-container-query';
import './App.css';

interface ExampleObserverProps {
  title: string;
  query: ContainerQuery;
}

function ExampleObserver({ title, query }: ExampleObserverProps): JSX.Element {
  const ref = useRef(null);
  const flag = useContainerQuery(ref, query);

  return (
    <div ref={ref} className={flag ? 'matched' : 'not-matched'}>
      <p>{ title }</p>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <main>
      <ExampleObserver
        title="aspect-ratio: 16 / 9"
        query={{
          type: "aspect-ratio",
          value: 16 / 9,
        }}
      />
      <ExampleObserver
        title="max-aspect-ratio: 16 / 9"
        query={{
          type: "max-aspect-ratio",
          value: 16 / 9,
        }}
      />
      <ExampleObserver
        title="min-aspect-ratio: 16 / 9"
        query={{
          type: "min-aspect-ratio",
          value: 16 / 9,
        }}
      />
      <ExampleObserver
        title="width: 128px"
        query={{
          type: "width",
          value: 128,
        }}
      />
      <ExampleObserver
        title="max-width: 128px"
        query={{
          type: "max-width",
          value: 128,
        }}
      />
      <ExampleObserver
        title="min-width: 128px"
        query={{
          type: "min-width",
          value: 128,
        }}
      />
      <ExampleObserver
        title="height: 128px"
        query={{
          type: "height",
          value: 128,
        }}
      />
      <ExampleObserver
        title="max-height: 128px"
        query={{
          type: "max-height",
          value: 128,
        }}
      />
      <ExampleObserver
        title="min-height: 128px"
        query={{
          type: "min-height",
          value: 128,
        }}
      />
      <ExampleObserver
        title="landscape"
        query={{
          type: "orientation",
          value: "landscape",
        }}
      />
      <ExampleObserver
        title="portrait"
        query={{
          type: "orientation",
          value: "portrait",
        }}
      />
    </main>
  );
}
