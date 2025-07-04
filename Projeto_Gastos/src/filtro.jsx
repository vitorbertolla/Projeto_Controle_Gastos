const Filtro = ({filtro, setFiltro, ordem, setOrdem}) =>{
    return(
        <div>
            <h2>Filtrar:</h2>
            <div className="filtro">
                <div>
                    <h3>Categoria</h3>
                    <select name="" id="" value={filtro} onChange={(e)=> setFiltro(e.target.value)}>
                        <option value="Todas">Todas</option>
                        <option value="Investimento">Investimento</option>
                        <option value="Fixa">Fixa</option>
                        <option value="Variável">Variável</option>
                        <option value="Alimentação">Alimentação</option>
                    </select> 
                </div>
                <div>
                    <h3>Ordem dos valores:</h3>
                    <button onClick={() => setOrdem("crescente")}>Crescente</button>
                    <button onClick={() => setOrdem("decrescente")}>decrescente</button>
                </div>
            </div>
        </div>
    )
}

export default Filtro