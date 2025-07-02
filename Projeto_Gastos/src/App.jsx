import { useState } from 'react'
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'
import Buscar from './busca'
import Filtro from './filtro'
import './App.css'

function App() {
  const [despesaEditando, setEditando] = useState('')
  const[Despesas, SetDespesas] = useState([])  

const addDespesa = (descricao, valor, categoria) => {
  const agora = new Date()

  if (despesaEditando) {
    // Edição
    const atualizadas = Despesas.map((despesa) =>
      despesa.data === despesaEditando.data
        ? { ...despesa, descricao, valor, categoria }
        : despesa
    )
    SetDespesas(atualizadas)
    setEditando('')
  } else {
    // Nova despesa
    const novaDespesa = {
      descricao,
      valor,
      categoria,
      data: agora.toLocaleString(),
      pago: false
    }
    SetDespesas([...Despesas, novaDespesa])
  }
}
  const editarDespesa = (data) => {
    const d = Despesas.find((despesa) => despesa.data === data)
    if (d) setEditando(d)
  }

 const removeDespesas = (data) => {
    const filterDespesas = Despesas.filter((despesa) => despesa.data !== data)
    SetDespesas(filterDespesas)
  }
const pagarDespesas = (data) => {
  const atualizadas = Despesas.map((despesa) =>
    despesa.data === data
      ? { ...despesa, pago: !despesa.pago }
      : despesa
  )
  SetDespesas(atualizadas)
}
const saldoDespesas = (Despesas) =>{
    return Despesas.reduce((total, despesa) => {
    return despesa.pago ? total : total +despesa.valor
  }, 0)
}
const DespesasFiltradas = () =>{
    const filtradas = Despesas
      .filter((despesa) =>
        filtro === 'Todas' ? true :
        filtro === 'Fixa' ? despesa.categoria === 'Fixa' :
        filtro === 'Variável' ? despesa.categoria === 'Variável' :
        filtro === 'Alimentação' ? despesa.categoria === 'Alimentação' :
        false
      )
      .filter((despesa) =>
        despesa.descricao.toLowerCase().includes(busca.toLowerCase())
      )

    const ordenadas = [...filtradas].sort((a, b) =>
      ordem === 'crescente' ? a.valor - b.valor : b.valor - a.valor
    )

    return ordenadas
}

const [busca, setBusca] = useState('')

const [filtro, setFiltro] = useState('Todas')
const [ordem, setOrdem] = useState('decrescente')
  return (
    <div className='app'>
      <h1>Controle de gastos</h1>
      <Buscar busca={busca} setBusca={setBusca}/>
      <Filtro filtro={filtro} setFiltro={setFiltro} ordem={ordem} setOrdem={setOrdem} />
      <h2>Total a pagar: R${saldoDespesas(DespesasFiltradas())}</h2>
      <div className='ListaDespesas'>
        {
         DespesasFiltradas().map((despesa) => (
          <ToDo key={despesa.data} despesa={despesa} removeDespesas={removeDespesas} pagarDespesas={pagarDespesas} editarDespesa={editarDespesa}/>
        ))}
      </div>
      <ToDoForm addDespesa={addDespesa} despesaEditando={despesaEditando} />
    </div>
  )
}

export default App
