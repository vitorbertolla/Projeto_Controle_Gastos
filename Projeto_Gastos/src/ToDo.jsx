const ToDo = ({despesa, removeDespesas, pagarDespesas, editarDespesa}) => {
    return(
        <div className="despesa" style={{textDecoration: despesa.pago? "line-through" : "" }}>
            <div className="descricao">
              <p>{despesa.categoria==='Investimento'? `Investimento: ${despesa.descricao}` : `despesa: ${despesa.descricao}`} </p>
              <p>Valor: {despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
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