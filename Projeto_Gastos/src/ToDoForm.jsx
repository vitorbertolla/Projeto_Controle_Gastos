import { useState, useEffect } from 'react'

const ToDoForm = ({addDespesa,despesaEditando}) => {

    const [Descricao, SetDescricao] = useState('')
    const [Valor, SetValor] = useState('')
    const [Categoria, SetCategoria] = useState('')


    useEffect(() => {
      if (despesaEditando) {
        SetDescricao(despesaEditando.descricao)
        SetCategoria(despesaEditando.categoria)
      
        if (despesaEditando.categoria === 'Investimento' && despesaEditando.quantidade) {
          SetValor(despesaEditando.quantidade)
        } else {
          SetValor(despesaEditando.valor)
        }
      }
    }, [despesaEditando])

  const buscarPrecoCripto = async (nomeCripto) => {
    const nomeFormatado = nomeCripto.toLowerCase().trim()
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${nomeFormatado}&vs_currencies=brl`

    try {
      const resposta = await fetch(url)
      const dados = await resposta.json()

      if (!dados[nomeFormatado] || !dados[nomeFormatado].brl) {
        alert('Criptomoeda não encontrada ou não suportada.')
        return null
      }

      return dados[nomeFormatado].brl
    } catch (erro) {
      alert('Erro ao buscar valor da criptomoeda.')
      console.error(erro)
      return null
    }
  }



    const Submit = async (e) => {
        e.preventDefault()
        if(!Valor || !Categoria || !Descricao)return

        if(Categoria==='Investimento'){
                const precoAtual = await buscarPrecoCripto(Descricao)
                if (precoAtual === null) return

                const totalConvertido = precoAtual * Number(Valor)
                const quantidade = Number(Valor)
                addDespesa(Descricao, totalConvertido, Categoria, quantidade)}
        else{
            addDespesa(Descricao, Number(Valor), Categoria)
            }

        SetDescricao('')
        SetValor('')
        SetCategoria('')
    }


    return(
        <div className="ToDoForm">
            <h2>{Categoria==='Investimento'? despesaEditando? 'Edição do Investimento': 'Nova Despesa': despesaEditando? "Edição de Despesa": "Nova Despesa"}</h2>
            <form onSubmit={Submit}>
                <select value={Categoria} onChange={(e) => SetCategoria(e.target.value)} name="" id="">
                    <option value="">Selecione uma categoria</option>
                    <option value="Fixa">Fixa</option>
                    <option value="Investimento">Investimento</option>
                    <option value="Variável">Variável</option>
                    <option value="Alimentação">Alimentação</option>
                </select>
                <input value={Descricao} onChange={(e) => SetDescricao(e.target.value)} type="text" placeholder={Categoria === 'Investimento' ? "Digite a Criptomoeda:" : "Digite a despesa:"} />
                <input  value={Valor} onChange={(e) => SetValor(e.target.value)} type="number" placeholder={Categoria === 'Investimento' ? "Quantidade de moedas comprada" : "Digite o valor:"} />
                <button type="submit">{despesaEditando ? 'Salvar' : 'Adicionar'}</button>
            </form>
        </div>
    )
}

export default ToDoForm