# Project Four [OUID]

## an express application on marijuana strains and information
<br>

### Installation (Linux terminal):
*npm init*<br>
*npm install dotenv*<br>
*npm install pg-hstore --save*<br>
*npm -g add express-generator*<br>
*sudo npm install -g sequelize*<br>
*sudo npm install -g sequelize-cli*<br>
*sudo npm install -g pg*<br>
*express -f*<br>
*npm install*<br>
<br>

### Solve this error in terminal:
(((*insert pic here*)))

*make these changes to config.json file:*
```js 
{
  "development": {
    "username": "postgres",
    "password": "[your password]",
    "database": "[yourprojectname]_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "[your password]",
    "database": "[yourprojectname]_auth_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "[your password]",
    "database": "[yourprojectname]_auth_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
<br>

### API Information:
http://strains.evanbusse.com/index.html<br>
