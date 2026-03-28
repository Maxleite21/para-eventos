import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <header className="bg-white border-b border-stone-200 py-6 px-8 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">GiftList <span className="text-emerald-600 font-black">PRO</span></h1>
        <nav className="flex gap-6 items-center">
          <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Funcionalidades</a>
          <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Preços</a>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Criar Minha Lista</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Plataforma SaaS para Eventos</span>
          <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 leading-tight">Crie listas de presentes que seus convidados vão amar.</h2>
          <p className="text-xl text-stone-600 mb-12 leading-relaxed">
            Uma solução elegante e profissional para gerenciar listas de Casamento, Chá de Panela, Chá de Bebê e muito mais. 
            Sem complicações, sem interferências.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-stone-900 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl w-full sm:w-auto">Começar Grátis</button>
            <button className="bg-white text-stone-900 border-2 border-stone-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-stone-100 transition-all w-full sm:w-auto">Ver Demonstração</button>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 transform transition-all hover:scale-105">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Links Dinâmicos</h3>
            <p className="text-stone-600">Cada cliente recebe um link único e personalizado para o seu evento.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 transform transition-all hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L17 13" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Temas Flexíveis</h3>
            <p className="text-stone-600">Personalize cores e estilos para combinar com a identidade do evento.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 transform transition-all hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-8 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Gestão Completa</h3>
            <p className="text-stone-600">Controle total sobre quantidades, reservas e sugestões de itens.</p>
          </div>
        </div>

        <div className="mt-40 bg-emerald-600 rounded-[3rem] p-16 text-white text-left relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Pronto para vender suas listas?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-xl leading-relaxed">Comece hoje mesmo a oferecer um serviço premium para seus clientes de eventos.</p>
            <button className="bg-white text-emerald-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-emerald-50 transition-all shadow-xl">Criar Minha Primeira Lista</button>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2"></div>
        </div>
      </main>

      <footer className="py-20 text-center text-stone-400 text-sm border-t border-stone-200 bg-white">
        <p>© 2026 GiftList PRO • Uma nova era para seus eventos.</p>
      </footer>
    </div>
  )
}
