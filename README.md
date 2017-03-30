
# bloggify-sequelize

 [![Version](https://img.shields.io/npm/v/bloggify-sequelize.svg)](https://www.npmjs.com/package/bloggify-sequelize) [![Downloads](https://img.shields.io/npm/dt/bloggify-sequelize.svg)](https://www.npmjs.com/package/bloggify-sequelize)

> Use Sequelize in Bloggify applications.

## :cloud: Installation

```sh
$ npm i --save bloggify-sequelize
```


## :clipboard: Example



```js
const bloggifySequelize = require("bloggify-sequelize");

console.log(bloggifySequelize());
```

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation


### bloggify:init

#### Params
- **Object** `config`:
 - `db_name` (String): The database name
 - `username` (Object): The database username.
 - `password` (Object): The database password.
 - `options` (Object): The database options.
 - `models_dir` (String): The relative path to a directory containing models stored in files.

The model objects can be accessed by requiring the module or accessing the `Bloggify.models` object.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## :scroll: License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify%20%3Csupport%40bloggify.org%3E%20(https%3A%2F%2Fbloggify.org)&year=2017#license-mit
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
