# Fan-Tastic Food


Fan-Tastic Food is a web app designed for use in arenas/stadiums, where the user may order
food from vendors online and be notified via text

## Installation

Use the package manager ```npm``` with command ```npm install``` to install all dependencies.
After installing dependencies, MongoDB must be installed. 

To initialize database:
1. Navigate to MongoDB installation directory (Default on Windows --> /Program Files/MongoDB)
2. Launch mongo.exe and enter the following commands:
```use db globalOrders
db.globalOrdersCollection.insert([database.JSON])
exit
```

Note: ```[database.JSON]``` can be found in the fan-tastic_food folder, copy the text and paste it in the terminal


## Usage

From Home Directory:
```nodemon```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[ISC](https://opensource.org/licenses/ISC)