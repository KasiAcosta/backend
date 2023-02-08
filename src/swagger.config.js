const SwaggerOptions={
    definition:{
        openapi:"3.0.3",
        info:{
            title:"Prueba",
            description: "Prueba Productos",
            version:"1.0.1",
            contact:{
                name:"Kasi",
                email:"kasiiacosta@gmail.com",
                url:"github.com"
            }
        }
    },
    apis:['src/docs/**/*.yaml']
}

module.exports=SwaggerOptions