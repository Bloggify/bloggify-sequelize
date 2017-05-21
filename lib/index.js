"use strict";

const Sequelize = require("sequelize")
    , path = require("path")
    , requireDir = require("require-dir")
    , ul = require("ul")
    , iterateObject = require("iterate-object")
    , camelo = require("camelo")
    ;

/**
 * @name bloggify:init
 * @param {Object} config
 *
 *    - `uri` (String): The database uri (if this is used, the other config fields will be ignored).
 *    - `db_name` (String): The database name
 *    - `username` (Object): The database username.
 *    - `password` (Object): The database password.
 *    - `options` (Object): The database options.
 *    - `models_dir` (String): The relative path to a directory containing models stored in files.
 *
 * The model objects can be accessed by requiring the module or accessing the `Bloggify.models` object.
 *
 * After the module is initialized, the `db` field is appended to the Sequelize module, being the Sequelize instance.
 * You can access the Sequelize instance using:
 *
 * ```js
 * const seq = require("sequelize").db;
 * ```
 */
module.exports = (config, bloggify, ready) => {
    const args = config.uri ? [config.uri] : [config.db_name, config.username, config.password, config.options]
    Sequelize.db = new Sequelize(...args);

    if (config.models_dir) {
        config.models_dir = path.join(bloggify.paths.root, config.models_dir);
        config.models = ul.merge(config.models, requireDir(config.models_dir));
    }

    const models = module.exports = bloggify.models;
    iterateObject(config.models, function (c, n) {
        models[camelo(n, true)] = c;
    });

    Sequelize.db.sync().then(() => {
        process.nextTick(ready);
    }).catch(e => {
        ready(e);
    });
};
