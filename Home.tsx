import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Gift, Palette, ShieldCheck, ArrowRight, Star, Check, Zap, Heart, Sparkles, UserCheck } from 'lucide-react'

export default function Home() {
  const [slug, setSlug] = useState('')
  const navigate = useNavigate()

  const handleGoToEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (slug.trim()) {
      navigate(`/${slug.trim().toLowerCase()}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-stone-200/50 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="bg-emerald-600 p-1.5 rounded-xl group-hover:scale-110 transition-transform">
            <Gift className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">GiftList <span className="text-emerald-600 font-black">PRO</span></h1>
        </div>
        <nav className="hidden md:flex gap-10 items-center">
          <a href="#features" className="text-sm font-bold text-stone-500 hover:text-emerald-600 transition-colors">Funcionalidades</a>
          <a href="#how-it-works" className="text-sm font-bold text-stone-500 hover:text-emerald-600 transition-colors">Como Funciona</a>
          <a href="#pricing" className="text-sm font-bold text-stone-500 hover:text-emerald-600 transition-colors">Preços</a>
          <button 
            onClick={() => navigate('/create')}
            className="bg-stone-900 text-white px-7 py-3 rounded-2xl text-sm font-black hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 active:scale-95"
          >
            Começar Grátis
          </button>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto pt-24 pb-20 md:pt-36 md:pb-32 px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="w-3.5 h-3.5 fill-emerald-100" />
            A Plataforma #1 para Listas de Presentes
          </div>
          <h2 className="text-5xl md:text-8xl font-serif text-stone-900 mb-10 leading-[1.05] tracking-tight max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Organize seu evento com <span className="text-emerald-600 italic relative">estilo e facilidade.<span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-100 -z-10 -rotate-1"></span></span>
          </h2>
          <p className="text-xl md:text-2xl text-stone-500 mb-14 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Crie listas personalizadas para Casamentos, Chás e Aniversários. Seus convidados reservam os itens e você acompanha tudo em tempo real.
          </p>

          {/* Search Box / CTA */}
          <div className="max-w-2xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <div className="bg-white p-3 rounded-3xl shadow-2xl shadow-emerald-200/50 border border-stone-200/50 flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center px-5 gap-4 py-3 md:py-0">
                <Search className="text-stone-400 w-6 h-6" />
                <input 
                  type="text" 
                  placeholder="Já tem uma lista? Digite o nome aqui..." 
                  className="flex-1 outline-none font-bold text-lg placeholder:text-stone-300 placeholder:font-medium bg-white text-black"
                  style={{ color: '#000000' }}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <button 
                onClick={handleGoToEvent}
                className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-xl shadow-emerald-200"
              >
                Acessar Lista
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="mt-6 text-stone-400 font-medium">Não tem uma lista? <button onClick={() => navigate('/create')} className="text-emerald-600 font-bold hover:underline">Crie a sua agora!</button></p>
          </div>

          {/* Stats/Proof */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-12 border-y border-stone-200/50">
            <div className="text-center">
              <div className="text-3xl font-black text-stone-900 mb-1">15k+</div>
              <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">Eventos Criados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-stone-900 mb-1">R$ 2M+</div>
              <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">Em Presentes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-stone-900 mb-1">99%</div>
              <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-stone-900 mb-1">24/7</div>
              <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">Suporte</div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-stone-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-serif mb-6">Como funciona?</h3>
              <p className="text-stone-400 text-lg max-w-xl mx-auto">Três passos simples para transformar a experiência do seu evento.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-16 relative">
              <div className="absolute top-1/4 left-0 w-full h-0.5 bg-stone-800 hidden md:block -z-0"></div>
              
              {[
                { step: '01', title: 'Crie seu Evento', desc: 'Escolha um nome único (slug), defina suas cores e escreva uma mensagem de boas-vindas.', icon: <Zap className="w-8 h-8" /> },
                { step: '02', title: 'Adicione Presentes', desc: 'Liste os itens que você deseja ganhar, defina quantidades e categorias.', icon: <Gift className="w-8 h-8" /> },
                { step: '03', title: 'Compartilhe o Link', desc: 'Envie o link exclusivo para seus convidados. Eles reservam e você recebe!', icon: <ArrowRight className="w-8 h-8" /> }
              ].map((item, i) => (
                <div key={i} className="relative z-10 group">
                  <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl shadow-emerald-900/50">
                    {item.icon}
                  </div>
                  <div className="text-emerald-500 font-black text-xl mb-2">{item.step}</div>
                  <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                  <p className="text-stone-400 leading-relaxed text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8 leading-tight">Funcionalidades pensadas para você.</h3>
                <div className="space-y-8">
                  {[
                    { title: 'Personalização Total', desc: 'Cores, fontes e mensagens que refletem a alma do seu evento.', icon: <Palette className="text-pink-500" />, bg: 'bg-pink-50' },
                    { title: 'Reservas em Tempo Real', desc: 'Evite duplicidade. Quando alguém reserva, a lista atualiza para todos.', icon: <ShieldCheck className="text-emerald-500" />, bg: 'bg-emerald-50' },
                    { title: 'Sugestões Ativas', desc: 'Seus convidados podem sugerir itens novos, tornando a lista colaborativa.', icon: <Heart className="text-red-500" />, bg: 'bg-red-50' },
                    { title: 'Painel de Controle', desc: 'Gerencie tudo: adicione, remova ou edite itens em segundos.', icon: <UserCheck className="text-blue-500" />, bg: 'bg-blue-50' }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className={`shrink-0 w-14 h-14 ${feat.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-stone-900 mb-2">{feat.title}</h4>
                        <p className="text-stone-500 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-emerald-100 rounded-[4rem] rotate-3 relative overflow-hidden shadow-inner">
                  <div className="absolute inset-8 bg-white rounded-3xl shadow-2xl flex flex-col p-6 border border-stone-100">
                    <div className="w-1/2 h-4 bg-stone-100 rounded mb-4"></div>
                    <div className="w-full h-32 bg-emerald-50 rounded-2xl mb-6 flex items-center justify-center">
                       <Gift className="w-12 h-12 text-emerald-600 opacity-20" />
                    </div>
                    <div className="space-y-3">
                      <div className="w-full h-3 bg-stone-100 rounded"></div>
                      <div className="w-full h-3 bg-stone-100 rounded"></div>
                      <div className="w-2/3 h-3 bg-stone-100 rounded"></div>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                       <div className="w-20 h-8 bg-emerald-600 rounded-lg"></div>
                       <div className="w-8 h-8 bg-stone-100 rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-[#fafaf9] border-y border-stone-200/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-serif mb-6">Preço justo e transparente.</h3>
              <p className="text-stone-500 text-lg">Escolha o plano que melhor se adapta ao seu momento.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-2">Plano Standard</h4>
                  <p className="text-stone-400">Para eventos menores e rápidos.</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black">Grátis</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {['Até 30 itens na lista', 'Temas pré-definidos', 'Reserva em tempo real', 'Link personalizado (slug)'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium text-stone-600">
                      <Check className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => navigate('/create')}
                  className="w-full py-4 rounded-2xl border-2 border-stone-900 text-stone-900 font-black hover:bg-stone-900 hover:text-white transition-all"
                >
                  Começar Agora
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-emerald-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-200 relative overflow-hidden transform md:scale-105">
                <div className="absolute top-6 right-6 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Recomendado</div>
                <div className="mb-8 relative z-10">
                  <h4 className="text-2xl font-bold mb-2">Plano Premium</h4>
                  <p className="opacity-80">Para quem quer personalização total.</p>
                </div>
                <div className="mb-8 relative z-10">
                  <span className="text-5xl font-black">R$ 49</span>
                  <span className="text-xl opacity-70"> /único</span>
                </div>
                <ul className="space-y-4 mb-10 relative z-10">
                  {['Itens ilimitados', 'Cores e fontes customizadas', 'Suporte prioritário', 'Sem anúncios/marca d\'água', 'Sugestões de convidados'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <Check className="w-5 h-5 text-emerald-200" /> {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => navigate('/create')}
                  className="w-full py-4 rounded-2xl bg-white text-emerald-700 font-black hover:bg-emerald-50 transition-all shadow-xl relative z-10"
                >
                  Quero o Premium
                </button>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto py-24 px-6">
          <div className="bg-stone-900 rounded-[3.5rem] p-12 md:p-24 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight max-w-3xl mx-auto">Pronto para criar sua lista inesquecível?</h2>
              <p className="text-xl md:text-2xl text-stone-400 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
                Junte-se a milhares de pessoas que simplificaram a organização de seus presentes com elegância.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => navigate('/create')}
                  className="bg-emerald-600 text-white px-12 py-6 rounded-3xl text-xl font-black hover:bg-emerald-700 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Criar Minha Lista Grátis
                </button>
                <button className="bg-white/10 text-white px-12 py-6 rounded-3xl text-xl font-black hover:bg-white/20 transition-all backdrop-blur-md">
                  Falar com Consultor
                </button>
              </div>
            </div>
            {/* Background elements for CTA */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 -skew-x-12 translate-x-1/3"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px]"></div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-white border-t border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-600 p-1.5 rounded-xl">
                <Gift className="text-white w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">GiftList PRO</h1>
            </div>
            <p className="text-stone-500 text-lg leading-relaxed max-w-sm">
              A plataforma mais completa e elegante para gerenciar listas de presentes em casamentos, chás e aniversários.
            </p>
          </div>
          <div>
            <h5 className="font-black text-stone-900 uppercase tracking-widest text-sm mb-6">Plataforma</h5>
            <ul className="space-y-4 text-stone-500 font-bold">
              <li><a href="#features" className="hover:text-emerald-600 transition-colors">Funcionalidades</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-600 transition-colors">Como Funciona</a></li>
              <li><a href="#pricing" className="hover:text-emerald-600 transition-colors">Preços</a></li>
              <li><button onClick={() => navigate('/create')} className="hover:text-emerald-600 transition-colors">Criar Lista</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-stone-900 uppercase tracking-widest text-sm mb-6">Suporte</h5>
            <ul className="space-y-4 text-stone-500 font-bold">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Ajuda</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-400 font-medium">© 2026 GiftList PRO. Todos os direitos reservados.</p>
          <div className="flex gap-8 text-stone-400">
             <span className="hover:text-emerald-600 cursor-pointer transition-colors font-bold">Instagram</span>
             <span className="hover:text-emerald-600 cursor-pointer transition-colors font-bold">Twitter</span>
             <span className="hover:text-emerald-600 cursor-pointer transition-colors font-bold">Facebook</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

