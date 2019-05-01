"use strict"

const Sequelize = require("sequelize")
    , path = require("path")
    , requireDir = require("require-dir")
    , ul = require("ul")
    , iterateObject = require("iterate-object")
    , camelo = require("camelo")

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
 *    - `autosync` (Boolean): Wheter to autosync the database (default: true).
 *
 * The model objects can be accessed by requiring the module or accessing the `Bloggify.models` object.
 *
 * After the module is initialized, the `db` field is appended to the Sequelize module, being the Sequelize instance.
 * You can access the Sequelize instance using:
 *
 * ```js
 * const seq = require("sequelize").db
 * ```
 */
module.exports = (config, ready) => {
    const args = config.uri ? [config.uri, config.options] : [config.db_name, config.username, config.password, config.options]
    Sequelize.db = new Sequelize(...args)
    Bloggify.sequelize = Sequelize
    Bloggify.db = Bloggify.sequelize.db

    return Promise.resolve().then(() => {
        if (config.models_dir) {
            config.models_dir = path.resolve(Bloggify.paths.root, config.models_dir)
            config.models = ul.merge(config.models, requireDir(config.models_dir))
        }

        const models = module.exports = Bloggify.models

        iterateObject(config.models, (c, n) => {
            models[camelo(n, true)] = c
        })

        if (config.autosync) {
            const prom = Sequelize.db.sync()

            prom.then(() => {
                process.nextTick(ready)
            }).catch(e => {
                ready && ready(e)
            })
            return prom
        } else {
            ready && ready(e)
        }
    })
}

module.exports.Sequelize = Sequelize
