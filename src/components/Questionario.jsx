import { useState } from "react";

const perguntas = [
  { texto: "1. A empresa possui uma política ambiental formalizada?", opcoes: ["Não possui", "Está em planejamento", "Possui, mas não é aplicada regularmente", "Possui e é aplicada ativamente"] },
  { texto: "2. Como a empresa controla o consumo de energia?", opcoes: ["Não há controle", "Controle básico (contas mensais)", "Monitoramento com metas de redução", "Monitoramento avançado com energia renovável"] },
  { texto: "3. Qual é a principal fonte de energia utilizada?", opcoes: ["Apenas fontes não renováveis", "Maior parte não renovável", "Mistura de fontes renováveis e não renováveis", "Predominantemente renovável"] },
  { texto: "4. A empresa mede sua emissão de gases de efeito estufa?", opcoes: ["Não mede", "Mede ocasionalmente", "Mede regularmente", "Mede e compensa as emissões"] },
  { texto: "5. Como é feita a gestão de resíduos sólidos?", opcoes: ["Não há separação", "Separação básica", "Separação com reciclagem", "Gestão completa com redução e reaproveitamento"] },
  { texto: "6. A empresa realiza ações para reduzir a geração de resíduos?", opcoes: ["Nenhuma ação", "Ações pontuais", "Ações contínuas", "Estratégia integrada de redução de resíduos"] },
  { texto: "7. Como a empresa gerencia o consumo de água?", opcoes: ["Não controla", "Controle básico", "Metas de redução", "Reuso e tecnologias de economia"] },
  { texto: "8. A empresa utiliza materiais reciclados ou sustentáveis?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre que possível"] },
  { texto: "9. Existe treinamento ambiental para os colaboradores?", opcoes: ["Não existe", "Ocasional", "Regular", "Contínuo e obrigatório"] },
  { texto: "10. A empresa avalia critérios ambientais em seus fornecedores?", opcoes: ["Não avalia", "Avalia informalmente", "Avalia com critérios definidos", "Exige certificações ambientais"] },
  { texto: "11. A empresa possui metas ambientais claras?", opcoes: ["Não possui", "Metas genéricas", "Metas mensuráveis", "Metas mensuráveis com acompanhamento público"] },
  { texto: "12. Como a empresa lida com produtos ou processos poluentes?", opcoes: ["Não há controle", "Controle mínimo", "Busca reduzir impactos", "Substitui por alternativas sustentáveis"] },
  { texto: "13. A empresa cumpre a legislação ambiental vigente?", opcoes: ["Frequentemente descumpre", "Cumpre parcialmente", "Cumpre totalmente", "Vai além do exigido por lei"] },
  { texto: "14. Existe investimento em inovação sustentável?", opcoes: ["Não há investimento", "Investimentos pontuais", "Investimentos regulares", "Sustentabilidade é prioridade estratégica"] },
  { texto: "15. A empresa monitora impactos ambientais de suas operações?", opcoes: ["Não monitora", "Monitora informalmente", "Monitora com indicadores", "Monitora e publica relatórios"] },
  { texto: "16. Como a empresa trata resíduos perigosos?", opcoes: ["Não possui controle", "Controle básico", "Segue normas legais", "Gestão especializada e certificada"] },
  { texto: "17. A empresa promove conscientização ambiental externa?", opcoes: ["Não promove", "Ações pontuais", "Campanhas regulares", "Programas contínuos"] },
  { texto: "18. A sustentabilidade influencia decisões estratégicas da empresa?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "19. A empresa possui certificações ambientais?", opcoes: ["Nenhuma", "Em processo de obtenção", "Possui ao menos uma", "Possui várias certificações"] },
  { texto: "20. Como a empresa avalia sua própria responsabilidade ambiental?", opcoes: ["Não considera importante", "Importante, mas secundária", "Muito importante", "Essencial para o negócio"] },
];

export default function Questionario() {
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function responder(perguntaIndex, opcaoIndex) {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaIndex] = opcaoIndex;
    setRespostas(novasRespostas);
  }

  function enviar() {
    if (respostas.includes(null)) {
      alert("Please answer all 20 questions before generating the result.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pontuacaoBruta = respostas.reduce((total, r) => total + (r + 1), 0);
      const maxPontuacao = perguntas.length * 4;
      const pontuacaoFinal = Math.round((pontuacaoBruta / maxPontuacao) * 100);

      let classificacao = "";

      if (pontuacaoFinal >= 70) {
        classificacao = "High Environmental Responsibility 🌱";
      } else if (pontuacaoFinal >= 40) {
        classificacao = "Medium Environmental Responsibility 🌍";
      } else {
        classificacao = "Low Environmental Responsibility ⚠️";
      }

      setResultado({
        score: pontuacaoFinal,
        label: classificacao,
      });

      setLoading(false);
    } catch (err) {
      setError("Error generating environmental result.");
      setLoading(false);
    }
  }

  return (
    <section id="questionario" className="max-w-4xl mx-auto px-4 py-20 text-white scroll-mt-24">
      <h1 className="text-3xl font-bold mb-8 text-green-400 text-center">
        Diagnóstico Ambiental TerraMetric
      </h1>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {resultado === null ? (
        <div className="space-y-6">
          {perguntas.map((pergunta, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-white/10 rounded-xl">
              <p className="font-semibold mb-4 text-gray-200">{pergunta.texto}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pergunta.opcoes.map((opcao, j) => (
                  <label
                    key={j}
                    className={`flex items-center p-3 rounded-lg cursor-pointer border transition ${
                      respostas[i] === j
                        ? "bg-green-600/20 border-green-500 text-green-400"
                        : "bg-white/5 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`pergunta-${i}`}
                      checked={respostas[i] === j}
                      onChange={() => responder(i, j)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                        respostas[i] === j ? "border-green-500" : "border-gray-500"
                      }`}
                    >
                      {respostas[i] === j && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                    <span className="text-sm">{opcao}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={enviar}
            disabled={loading}
            className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-xl font-bold text-lg transition"
          >
            {loading ? "Generating..." : "Generate Result"}
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Environmental Result
          </h2>

          <p className="text-5xl font-black mb-4">{resultado.score}%</p>

          <p className="text-lg text-gray-300 mb-8">{resultado.label}</p>

          <button
            onClick={() => {
              setResultado(null);
              setRespostas(Array(perguntas.length).fill(null));
              setError(null);
            }}
            className="text-green-500 hover:text-green-400 font-semibold underline"
          >
            Reiniciar diagnóstico
          </button>
        </div>
      )}
    </section>
  );
}
