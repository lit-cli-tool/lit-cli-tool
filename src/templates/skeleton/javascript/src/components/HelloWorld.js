import { html, css, LitElement } from 'lit';

export class HelloWorld extends LitElement {
  static styles = css`p { color: blue; }`;
  
  render() {
    return html`<p>Hello, world!</p>`;
  }
}
customElements.define('hello-world', HelloWorld);