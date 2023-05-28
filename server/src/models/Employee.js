const { DataTypes, Model } = require("sequelize");

class Employee extends Model {
  static init(sequelize) {
    return super.init(
      {
        avatarUrl: DataTypes.STRING,
        company: DataTypes.INTEGER,
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "É necessário informar um nome" },
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "É necessário informar um sobrenome" },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            isUnique: Employee.#validate
        }
        }
      },
      {
        sequelize,
        tableName: "employee",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: { allowNull: false, name: "company" },
    });
  }

  static async #validate (value, next) {
    const self = this;
    Employee.findAll({ where: { email: value } })
      .then(user => {
        if (value && user && self.id !== user.id) {
          return next("Este e-mail já está em uso");
        }

        return next();
      })
      .catch(err => next(err));
  }
}

module.exports = Employee;
