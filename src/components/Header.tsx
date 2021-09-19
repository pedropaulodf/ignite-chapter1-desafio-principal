import '../styles/header.scss'

export function Header() {
  return (
    <header className="header">
      <div>
        {/* <img src="/logo.svg" alt="to.do"/> */}
        {/* Coloquei assim para buscar no deploy da Vercel, o certo é o de cima*/}
        <img src="https://raw.githubusercontent.com/pedropaulodf/ignite-chapter1-desafio-principal/main/public/logo.svg" alt="to.do"/>
      </div>
    </header>
  )
}