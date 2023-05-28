export function factoryListaComidas(data, idCli){

    const clienteId = idCli
    
    const newData = data.map((item) => {

        const favorito = item.favoritos.length > 0 ? item.favoritos.find((favorito) => favorito.cliente.id === clienteId)?.favoritar || false : false
        
        const obj = {
            ...item,
            favorito
        }
        
        return obj
    })
    
    console.log(newData)
    return newData
}