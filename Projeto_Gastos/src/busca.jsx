const Buscar = ({busca, setBusca}) => {
    return(
        <div className="busca">
            <h2>Pesquisa</h2>
            <input type="text" 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)} 
            placeholder="Pesquise sua despesa" />

        </div>
    )
}

export default Buscar