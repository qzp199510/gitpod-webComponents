import { LitElement, html, css } from 'lit';

class MyLitCount extends LitElement {
    static properties = {
        count: {}
    }
    static styles = css`
        button{
            color:var(--my-color)
        }`
    constructor() {
        super()
        this.count = 0
    }
    firstUpdated(){
        
    }
    render() {
        return html`
        <style>
            button{
                width: 200px;
                height: 100px;
                border: 1px solid #000;
            }
        </style>
        <button @click=${() => this.count++}>${this.count}</button>`
    }
}
customElements.define('my-lit-counter', MyLitCount);

// 继承 HTMLElement 类
class MyDiv extends HTMLElement {
    constructor() {
        super()
         // 设置为open才可以添加元素
        //  this.attachShadow({ mode: 'open' })
        const container = document.createElement('div');
        container.innerHTML = `
        <style>
            div{
                width: 200px;
                height: 200px;
                border: 1px solid #000;
            }
        </style>
        <div>
            <h3>测试shadowDom</h3>
            <slot></slot>
        </div>`
        // 挂载根dom
        // this.shadowRoot.appendChild(container)
        this.appendChild(container)

    }
}
// 名字规范必须小写，且有一个以上的 '-'
customElements.define('my-div', MyDiv);

class MyHtmltemplates extends HTMLElement {
    constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const templateElem = document.getElementById('my-html-templates')
    const clonedElem = templateElem.content.cloneNode(true)
    this.shadowRoot.appendChild(clonedElem)
    }
}
// 名字规范必须小写，且有一个以上的 '-'
customElements.define('my-html-templates', MyHtmltemplates);

class Counter extends HTMLElement {
    
    // 监听属性变化
    static get observedAttributes() {
        return ['count']
    }
    // 属性变化调用
    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === 'count') {
            this.btn.textContent = newVal;
        }
    }
    // 获取count
    get count() {
        return this.getAttribute('count') ? this.getAttribute('count') : 10
    }
    // 设置count值
    set count(count) {
        return this.setAttribute('count', count)
    }
    constructor() {
        super();
        // 设置为open才可以添加元素
        this.attachShadow({ mode: 'open' })
        
    }
    connectedCallback(){
        this.render()
        this.btn.addEventListener('click', () => {
            this.count++
            window.dispatchEvent(new CustomEvent('countFn',{detail:{str: 123456789}}))
        })
    }
    render(){
        // 挂载根dom
        this.shadowRoot.innerHTML = `
        <style>
            button{
            color:var(--my-color);
            width: 200px;
            height: 100px;
            border: 1px solid #000;
            }
        </style>
        <button>${this.count}</button>`
        this.btn = this.shadowRoot.querySelector('button')
        
    }
}
customElements.define('my-counter', Counter);