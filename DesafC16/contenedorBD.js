class ContenedorBD {
    constructor(tabla, config){
        this.knex = require("knex")(config);
        this.tabla = tabla;
    }

    async save(objetoAGuardar){
        try{
            return await this.knex(this.tabla).insert(objetoAGuardar);
        }catch(error){
            console.log(error);
        }
    }

    async getAll(){
        try{
            let datosAlmacenados = await this.knex.select("*").from(this.tabla);
            return datosAlmacenados ?? null;
        }catch ( error){
            console.log(error);
        }
    }
}

module.exports = { ContenedorBD };