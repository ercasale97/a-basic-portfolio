module.exports =
    {
        "development": {
            "username": process.env.MYSQL_USER,
            "password": process.env.MYSQL_KEY,
            "database": process.env.MYSQL_DBNAME,
            "host": process.env.MYSQL_HOST,
            "dialect": "mysql",
            "port": 8889
        },
        "test": {
            "username": "root",
            "password": "root",
            "database": "database_test",
            "host": "127.0.0.1",
            "dialect": "mysql",
            "port": 8889
        },
        "production": {
            "use_env_variable": "JAWSDB_URL",
            "dialect": "mysql"
        }
    }