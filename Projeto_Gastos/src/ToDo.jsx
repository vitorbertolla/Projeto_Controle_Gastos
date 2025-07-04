const ToDo = ({despesa, removeDespesas, pagarDespesas, editarDespesa}) => {
    return(
        <div className="despesa" style={{textDecoration: despesa.pago? "line-through" : "" }}>
            <div className="descricao">
              <p>{despesa.categroia==='Investimento' ? '' : `despesa: ${despesa.descricao}`} </p>
              <p>Valor: {despesa.valor}</p>
              <p>Categoria: {despesa.categoria}</p>
              <p>Data: {despesa.data}</p>
              <p>{despesa.categoria==='Investimento'? '': despesa.pago? `Status: Pago`: `Status: Pendente`}</p>
            </div>
            <div>
              {despesa.categoria !== 'Investimento' && (
              <button onClick={() => pagarDespesas(despesa.data)} className="salvar">
              {despesa.pago ? 'Desmarcar' : 'Marcar como pago'}
              </button>)}            
              <button onClick={() => removeDespesas(despesa.data)} className="apagar">X</button>
              <button onClick={() => editarDespesa(despesa.data)} className="editar">Editar</button>
            </div>
        </div>
    )
}
export default ToDo 