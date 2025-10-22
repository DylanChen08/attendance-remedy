declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface Element extends HTMLElement {}
    interface ElementClass {
      render(): any
    }
    interface ElementAttributesProperty {
      props: {}
    }
  }
}
