const Sequelize = require('sequelize');

module.exports = class House extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            house_tag: {
                type: Sequelize.STRING(50),
                allowNull: false,
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'House',
            tableName : 'house_tag',
            paranoid : true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {}
};