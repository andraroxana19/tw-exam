import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './examenTW.db',
    define: {
        timestamps: true
    }
});

const Spacecraft = sequelize.define('spacecraft', {
	id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
	},
	name: {
	    type: Sequelize.STRING,
        allowNull: false,
        validate: {
             min: 3
        }
	},
	maxSpeed: {
		type: Sequelize.INTEGER,
		allowNull: false,
        validate: {
            min: 1000
          }
	},
	weight: {
		type: Sequelize.INTEGER,
		allowNull: false,
        validate: {
            min: 200
          }
	}	
});

const Astronaut = sequelize.define('astronaut', {
	id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
	},
	name: {
	    type: Sequelize.STRING,
        allowNull: false,
        validate: {
             min: 5,
        }
	},
	role:{
        type: {
            type: Sequelize.ENUM,
            values: ['COMMANDER', 'PILOT']
        },
        
        allowNull:false

    }
});


Spacecraft.hasMany(Astronaut, {foreignKey: 'spacecraftId'});
Astronaut.belongsTo(Spacecraft, {foreignKey: 'spacecraftId'});


async function initialize() {
	await sequelize.authenticate();
	await sequelize.sync({alter: true});
}

export {
	initialize,
	Spacecraft, Astronaut
}