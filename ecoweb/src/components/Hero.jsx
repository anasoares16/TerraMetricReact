import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("App.js");

  useEffect(() => {
    function handleMouseMove(event) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const codeExamples = {
    "App.js": `Desde os primórdios, a humanidade sempre produziu lixo, mas em pequenas quantidades e majoritariamente orgânico. Com o avanço das sociedades, surgiram novos materiais como cerâmica, metais e, mais tarde, plásticos. A Revolução Industrial marcou um grande aumento na produção de resíduos. O consumo em massa intensificou esse problema no século XX. Atualmente, a quantidade de lixo gerada é muito maior do que a capacidade natural de absorção do planeta. Isso torna a gestão de resíduos um dos maiores desafios ambientais da história.`,
    "Hero.js": `O lixo urbano é o mais visível, pois é gerado diariamente pelas cidades e residências. No entanto, o setor industrial produz uma quantidade muito maior de resíduos, incluindo materiais tóxicos e de difícil tratamento. Já o setor agropecuário gera grandes volumes de resíduos orgânicos e químicos, como embalagens de agrotóxicos. Apesar disso, esses tipos de lixo recebem menos atenção da população. A soma dos três setores mostra a complexidade do problema dos resíduos sólidos. Cada um exige formas diferentes de tratamento e controle.`,
    "Navbar.js": `A produção de lixo está diretamente ligada às condições sociais e econômicas da população. Regiões mais ricas costumam gerar mais resíduos, mas também contam com coleta regular e tratamento adequado. Em áreas mais pobres, a coleta muitas vezes é precária ou inexistente. Isso faz com que o lixo se acumule em ruas, rios e terrenos baldios. Essa realidade aumenta riscos à saúde e ao meio ambiente. Assim, a gestão do lixo revela e reforça desigualdades sociais já existentes.`,
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-16 overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(
              600px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(59, 130, 246, 0.15),
              transparent 40%
            )`,
          }}
        />

        {/* Container principal */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 w-full max-w-7xl">

          {/* TÍTULO */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              <span className="text-green-500">TerraMetric</span> <br />
              Calculando <br />
              Futuro
            </h1>
          </div>

          {/* CAIXA CINZA */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden h-[280px] sm:h-[350px] lg:h-[450px] w-full max-w-[350px] border border-white/5">

                {/* IDE header */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border-b border-white/10">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                  <span className="text-xs sm:text-sm text-gray-300">
                    TerraMetric
                  </span>
                </div>

                <div className="p-3 sm:p-4 relative h-full">

                  {/* Tabs */}
                  <div className="flex space-x-1 sm:space-x-2 mb-1 sm:mb-2 overflow-x-auto">
                    {["App.js", "Hero.js", "Navbar.js"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border transition-all duration-200 whitespace-nowrap ${
                          activeTab === tab
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Código */}
                  <div className="h-full overflow-y-auto">
                    <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {codeExamples[activeTab]}
                    </pre>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
