const Sequelize = require('sequelize');

module.exports = class house_tb extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            house_tag: {
                type: Sequelize.STRING(50),
                allowNull: false,
            }
        })
    }
    static associate(db) {}
};