import { useState, useEffect } from 'react'
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'
import Buscar from './busca'
import Filtro from './filtro'
import './App.css'

function App() {
  const [despesaEditando, setEditando] = useState('')
  const [Despesas, SetDespesas] = useState([])  
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('Todas')
  const [ordem, setOrdem] = useState('decrescente')

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const listaSalva = localStorage.getItem("despesas")
    if (listaSalva) {
      SetDespesas(JSON.parse(listaSalva))
    }
  }, [])

  const salvarListaNoLocalStorage = (lista) => {
    localStorage.setItem("despesas", JSON.stringify(lista))
  }

  const addDespesa = (descricao, valor, categoria, quantidade) => {
    const agora = new Date()

    if (despesaEditando) {
      const atualizadas = Despesas.map((despesa) =>
        despesa.data === despesaEditando.data
          ? { ...despesa, descricao, valor, categoria, quantidade }
          : despesa
      )
      SetDespesas(atualizadas)
      salvarListaNoLocalStorage(atualizadas)
      setEditando('')
    } else {
      const novaDespesa = {
        descricao,
        valor: Number(valor),
        categoria,
        data: agora.toLocaleString(),
        pago: false,
        quantidade: categoria === 'Investimento' ? quantidade : undefined
      }
      const atualizadas = [...Despesas, novaDespesa]
      SetDespesas(atualizadas)
      salvarListaNoLocalStorage(atualizadas)
    }
  }

  const editarDespesa = (data) => {
    const d = Despesas.find((despesa) => despesa.data === data)
    if (d) setEditando(d)
  }

  const removeDespesas = (data) => {
    const atualizadas = Despesas.filter((despesa) => despesa.data !== data)
    SetDespesas(atualizadas)
    salvarListaNoLocalStorage(atualizadas)
  }

  const pagarDespesas = (data) => {
    const atualizadas = Despesas.map((despesa) =>
      despesa.data === data
        ? { ...despesa, pago: !despesa.pago }
        : despesa
    )
    SetDespesas(atualizadas)
    salvarListaNoLocalStorage(atualizadas)
  }

  const saldoDespesas = (lista) => {
    return lista.reduce((total, despesa) =>
      despesa.categoria==='Investimento'? total: despesa.pago ? total : total + Number(despesa.valor)
    , 0)
  }
  const saldoInvestimentos = (lista) => {
    return lista.reduce((total, despesa) =>
      despesa.categoria!=='Investimento'? total: total + Number(despesa.valor)
    , 0)
  }

  const DespesasFiltradas = () => {
    const filtradas = Despesas
      .filter((despesa) =>
        filtro === 'Todas' ? true :
        filtro === 'Fixa' ? despesa.categoria === 'Fixa' :
        filtro === 'Variável' ? despesa.categoria === 'Variável' :
        filtro === 'Alimentação' ? despesa.categoria === 'Alimentação' :
        filtro === 'Investimento'? despesa.categoria === 'Investimento' : false
      )
      .filter((despesa) =>
        despesa.descricao.toLowerCase().includes(busca.toLowerCase())
      )

    const ordenadas = [...filtradas].sort((a, b) =>
      ordem === 'crescente' ? a.valor - b.valor : b.valor - a.valor
    )

    return ordenadas
  }

  return (
    <div className='app'>
      <h1>Controle de gastos</h1>
      <Buscar busca={busca} setBusca={setBusca}/>
      <Filtro filtro={filtro} setFiltro={setFiltro} ordem={ordem} setOrdem={setOrdem} />
      {filtro!=='Investimento' &&(
        <h2>Total a Pagar:{" "}{saldoDespesas(DespesasFiltradas()).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL',})}</h2>
      )}
      {(filtro === 'Investimento' || filtro === 'Todas') && (
        <h2>Total Investido:{" "}{saldoInvestimentos(DespesasFiltradas()).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL',})}</h2>
      )}
      <div className='ListaDespesas'>
        {DespesasFiltradas().map((despesa) => (
          <ToDo
            key={despesa.data}
            despesa={despesa}
            removeDespesas={removeDespesas}
            pagarDespesas={pagarDespesas}
            editarDespesa={editarDespesa}
          />
        ))}
      </div>
      <ToDoForm addDespesa={addDespesa} despesaEditando={despesaEditando} />
    </div>
  )
}

export default App
