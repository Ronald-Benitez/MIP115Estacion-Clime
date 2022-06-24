module.exports = (sequelize,type)=>{
    return sequelize.define('registro',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        temperatura:{
            type:type.FLOAT,
        },
        presion:{
            type:type.FLOAT,
        },
        humedad:{
            type:type.FLOAT,
        },
        lluvias:{
            type:type.FLOAT,
        },
        intensidad:{
            type:type.FLOAT,
        }
    })

}