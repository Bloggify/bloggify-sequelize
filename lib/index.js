"use strict"

import Sequelize from "sequelize"
import path from "path"
import iterateObject from "iterate-object"
import camelo from "camelo"
import importDir from "import-dir-dynamic"

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
export default async (config) => {

    debugger
    if (config.options) {
        config.options = {
            ...(config.default_options || {}),
            ...config.options
        }
    }

    const args = config.uri ? [config.uri, config.options] : [config.db_name, config.username, config.password, config.options]

    Sequelize.db = new Sequelize(...args)
    Bloggify.sequelize = Sequelize
    Bloggify.db = Bloggify.sequelize.db

    if (config.models_dir) {
        config.models_dir = path.resolve(Bloggify.paths.root, config.models_dir)
        config.models = {
            ...(config.models || {}),
            ...await importDir(config.models_dir)
        }
    }

    const models = Bloggify.models

    const shouldHandleJson = config.options.dialect === "mysql";

    iterateObject(config.models, (c, n) => {
        models[camelo(n, true)] = c
        if (shouldHandleJson && c.refreshAttributes) {
            iterateObject(c.rawAttributes, (attr, attrName) => {
                if (attr.type instanceof Sequelize.JSON) {
                    attr.get = function () {
                        const val = this.getDataValue(attrName)
                        try {
                            return JSON.parse(val)
                        } catch (e) {
                            return val
                        }
                    }
                }
            })
            c.refreshAttributes()
        }
    })

    if (config.autosync) {
        await Sequelize.db.sync()
    }
}

export { Sequelize }