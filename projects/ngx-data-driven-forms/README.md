# ngx-data-driven-forms
A framework for quickly generating web forms from just a simple JSON object.
<br>
<br>
<br>
## Installation

Installation is simple and can be done through Node Package Manager. The library is divided into two major sectors:

- Core Module (DDFormsCoreModule)
- Defaults Module (DDFormsDefaultsModule) *[has further subdivisions]*

To install just run 
`npm install @nys-hcr-its/ngx-data-driven-forms ngx-markdown --save`.

This will install the library and its only non-angular dependency (ngx-markdown, *used for some text rendering in the Defaults Module*).

---

## Basic Setup
The basic framework of this library is provided entirely by the Core Module. This provides the structure and render functions for the library.

All you have to do is import the Core Module in your Base App Module.

**Note: Only importing the Core Module will require you to define default renderers.**


```
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DDFormsCoreModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```
---

## Including Defaults
In order to get stuff to appear on the page, renderers need to be registered with the libray.

The libary provides an opt-in Module that automatically registers some basic functionality and views.
In order to use this library, you will also have import `ngx-markdown` which is used for text rendering.

Again just import these two modules into your Base App Module.

**Note: It is important that the Defaults Module is only imported once, importing more than once can lead to unintended behavior.**


```
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DDFormsCoreModule,
    DDFormsDefaultsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```

This will cause all default renderers to be registered with the library, and allow text to be rendered.

However, in order to fully take advantage of `ngx-markdown` you will also have to add 
`node_modules/marked/marked.min.js` to your app scripts in the angular.json file.

Further plugins, functionality and configuration can be added by following the info at https://www.npmjs.com/package/ngx-markdown#installation

---
