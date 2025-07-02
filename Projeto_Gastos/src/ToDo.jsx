const ToDo = ({despesa, removeDespesas, pagarDespesas, editarDespesa}) => {
    return(
        <div className="despesa" style={{textDecoration: despesa.pago? "line-through" : "" }}>
            <div className="descricao">
              <p>Despesa: {despesa.descricao}</p>
              <p>Valor: {despesa.valor}</p>
              <p>Categoria: {despesa.categoria}</p>
              <p>Data: {despesa.data}</p>
              <p><strong>Status:</strong> {despesa.pago ? 'Pago' : 'Pendente'}</p>
            </div>
            <div>
              <button onClick={() => pagarDespesas(despesa.data)} className="salvar">{despesa.pago ? 'Desmarcar' : 'Marcar como pago'}</button>
              <button onClick={() => removeDespesas(despesa.data)} className="apagar">X</button>
              <button onClick={() => editarDespesa(despesa.data)} className="editar">Editar</button>
            </div>
        </div>
    )
}
export default ToDo 