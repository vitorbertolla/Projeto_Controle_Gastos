import { useState, useEffect } from 'react'

const ToDoForm = ({addDespesa,despesaEditando}) => {

    const [Descricao, SetDescricao] = useState('')
    const [Valor, SetValor] = useState('')
    const [Categoria, SetCategoria] = useState('')


    useEffect(() => {
    if (despesaEditando) {
      SetDescricao(despesaEditando.descricao)
      SetValor(despesaEditando.valor)
      SetCategoria(despesaEditando.categoria)
    }
  }, [despesaEditando])

    const Submit = (e) => {
        e.preventDefault()
        if(!Valor || !Categoria || !Descricao) return
        addDespesa(Descricao, Number(Valor), Categoria)
        SetDescricao('')
        SetValor('')
        SetCategoria('')
    }

    return(
        <div className="ToDoForm">
            <h2>{despesaEditando ? 'Edição de despesa' : 'Nova despesa'}</h2>
            <form onSubmit={Submit}>
                <input value={Descricao} onChange={(e) => SetDescricao(e.target.value)} type="text" placeholder="Digite a despesa:" />
                <input  value={Valor} onChange={(e) => SetValor(e.target.value)} type="number" placeholder="Digite o valor:" />
                <select value={Categoria} onChange={(e) => SetCategoria(e.target.value)} name="" id="">
                    <option value="">Selecione uma categoria</option>
                    <option value="Fixa">Fixa</option>
                    <option value="Variável">Variável</option>
                    <option value="Alimentação">Alimentação</option>
                </select>
                <button type="submit">{despesaEditando ? 'Salvar' : 'Adicionar'}</button>
            </form>
        </div>
    )
}

export default ToDoForm