import React from "react";
import { Search, Users, GraduationCap, ArrowRight, CheckCircle2, MessageCircle, Target, ClipboardCheck, Presentation, Sparkles } from "lucide-react";

export default function AllfaWiseRecruitmentTraining() {
  const whatsappLink = "https://wa.me/14074540101?text=Olá,%20quero%20saber%20mais%20sobre%20recrutamento,%20seleção%20e%20treinamentos%20da%20ALLFA%20WISE.";

  const services = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Recrutamento Estratégico",
      text: "Atração de profissionais alinhados ao perfil da vaga, cultura da empresa e necessidades do negócio.",
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Seleção e Triagem",
      text: "Organização dos candidatos, análise inicial, entrevistas e encaminhamento dos perfis mais adequados.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Entrevistas e Parecer",
      text: "Entrevistas estruturadas com observações claras para apoiar a decisão de contratação.",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Treinamentos Corporativos",
      text: "Treinamentos práticos em liderança, comunicação, atendimento, inteligência emocional e performance.",
    },
  ];

  const steps = [
    "Diagnóstico da vaga e perfil ideal",
    "Divulgação e atração de candidatos",
    "Triagem, entrevistas e avaliação",
    "Apresentação dos finalistas",
  ];

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#111411]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f8f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#173f35] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold">ALLFA WISE</p>
              <p className="text-xs text-black/50">Recruitment & Training</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-black/60 md:flex">
            <a href="#recrutamento" className="hover:text-black">Recrutamento</a>
            <a href="#selecao" className="hover:text-black">Seleção</a>
            <a href="#treinamento" className="hover:text-black">Treinamentos</a>
            <a href="#contato" className="hover:text-black">Contato</a>
          </nav>

          <a href={whatsappLink} className="hidden rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f2e27] md:inline-flex">
            Falar agora
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#dce9df] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#efe4c9] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/70 shadow-sm">
              Recrutamento, seleção e treinamento para empresas
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Contrate melhor. Selecione com clareza. Treine com propósito.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65 md:text-xl">
              A ALLFA WISE ajuda empresas a encontrar profissionais mais alinhados e desenvolver equipes mais preparadas através de processos humanos, estratégicos e modernos.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#recrutamento" className="inline-flex h-14 items-center justify-center rounded-full bg-[#173f35] px-7 text-base font-semibold text-white hover:bg-[#0f2e27]">
                Quero contratar melhor
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#treinamento" className="inline-flex h-14 items-center justify-center rounded-full border border-black/15 bg-white px-7 text-base font-semibold hover:bg-white/70">
                Quero treinar minha equipe
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white/85 p-5 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#173f35] p-6 text-white">
              <p className="text-sm text-white/70">Processo ALLFA WISE</p>
              <h2 className="mt-2 text-3xl font-semibold">Pessoas certas para lugares certos.</h2>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { icon: <Target className="h-5 w-5" />, title: "Mapeamento da necessidade", text: "Entendemos vaga, equipe, cultura e objetivo." },
                { icon: <ClipboardCheck className="h-5 w-5" />, title: "Seleção com critério", text: "Triagem, entrevistas e recomendação de finalistas." },
                { icon: <Presentation className="h-5 w-5" />, title: "Treinamento aplicado", text: "Capacitações práticas para melhorar desempenho." },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 rounded-3xl bg-[#f7f8f5] p-5">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">{item.icon}</div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-black/55">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="recrutamento" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#173f35]">Soluções</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Recrutamento, seleção e treinamento com foco em pessoas e resultado.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-[1.75rem] border border-black/5 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3ef] text-[#173f35]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-black/60">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="selecao" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[#173f35] p-8 text-white md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Recrutamento e seleção</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Um processo claro para encontrar talentos mais alinhados.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Nossa abordagem ajuda empresas a reduzirem contratações por impulso, organizarem melhor a busca por candidatos e tomarem decisões com mais segurança.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-[#173f35]">Etapa 0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{step}</h3>
                <p className="mt-2 leading-7 text-black/60">
                  Estruturamos essa etapa com clareza para que sua empresa tenha mais segurança durante a contratação.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="treinamento" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-xl shadow-black/5">
            <div className="rounded-[1.5rem] bg-[#f0eadb] p-6">
              <p className="text-sm text-black/50">Treinamentos ALLFA WISE</p>
              <h3 className="mt-2 text-3xl font-semibold">Conteúdos práticos para equipes reais.</h3>
            </div>
            <div className="mt-5 space-y-4 p-2">
              {[
                "Liderança e gestão de pessoas",
                "Comunicação profissional",
                "Atendimento ao cliente",
                "Inteligência emocional no trabalho",
                "Produtividade e postura profissional",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f7f8f5] p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#173f35]" />
                  <span className="text-black/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#173f35]">Treinamento e desenvolvimento</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Desenvolva líderes, equipes e profissionais mais preparados.
            </h2>
            <p className="mt-5 text-lg leading-8 text-black/60">
              Criamos treinamentos objetivos para melhorar comunicação, postura profissional, liderança, relacionamento com clientes e inteligência emocional no ambiente de trabalho.
            </p>
          </div>
        </div>
      </section>

      <section id="contato" className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#101412] p-8 text-center text-white md:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Contato</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Sua empresa precisa contratar melhor ou treinar a equipe?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Fale com a ALLFA WISE e vamos entender o melhor caminho para seu processo de recrutamento, seleção ou treinamento.
          </p>
          <div className="mt-8 flex justify-center">
            <a href={whatsappLink} className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-[#101412] hover:bg-white/90">
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-black/50 md:flex-row">
          <p>© 2026 ALLFA WISE. Todos os direitos reservados.</p>
          <p>Recrutamento • Seleção • Treinamentos</p>
        </div>
      </footer>
    </main>
  );
}