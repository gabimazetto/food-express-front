export async function factoryListaRestaurantes(data, idCli){

    const clienteId = idCli;
    
    const newData = data.map((item) => {

        const favorito = item.favoritos.length > 0 ? item.favoritos.find((favorito) => favorito.cliente.id === clienteId)?.favoritar || false : false

        const obj = {
            ...item,
            favorito,
            media: 0
        }
        return obj
    })
    return newData
}