# TO-DO API

## Another to-do api? Why?

This project aims to demonstrate the usage of some tecnologies/libraries such as: Typescript, Bookshelf, OvernightJS.
As this developer here was not in a creative mood, he decided to do the most commom example: A To-Do Api...
Sorry about that and I hope we learn something with those usage examples

## gitignore

The gitignore of this project was created with the [gitignore npm library](https://www.npmjs.com/package/gitignore).
It's silly but can be handy.

## editorconfig

[EditorConfig](https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
It's another silly thing that can be handy in your project.

I'm using Visual Studio Code so I needed the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) extension.

## Database migrations

To run the database migrations, first you need to have on your `.env` file the following structure:

```
DB_CLIENT=mysql
DB_HOST=0.0.0.0
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=todo
```

The command `npm run migrate` will run the migrations on your database.
The command `npm run migrate:make -- {migration_name}` will create a new migration file on `./database/migrations`
