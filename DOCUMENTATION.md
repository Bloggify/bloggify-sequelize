## Documentation

You can see below the API reference of this module.

### Plugin Configuration

- **Object** `config`:
   - `uri` (String): The database uri (if this is used, the other config fields will be ignored).
   - `db_name` (String): The database name
   - `username` (Object): The database username.
   - `password` (Object): The database password.
   - `options` (Object): The database options.
   - `models_dir` (String): The relative path to a directory containing models stored in files.
   - `autosync` (Boolean): Wheter to autosync the database (default: true).

The model objects can be accessed by requiring the module or accessing the `Bloggify.models` object.

After the module is initialized, the `db` field is appended to the Sequelize module, being the Sequelize instance.
You can access the Sequelize instance using:

```js
const seq = require("sequelize").db
```

