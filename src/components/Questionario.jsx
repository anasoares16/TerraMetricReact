import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
  const [showGrafico, setShowGrafico] = useState(false);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MEDIA_BRASIL = 58;

  function responder(perguntaIndex, opcaoIndex) {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaIndex] = opcaoIndex;
    setRespostas(novasRespostas);
  }

  async function enviar() {
    if (respostas.includes(null)) {
      alert("Por favor, responda todas as 20 perguntas antes de gerar o gráfico!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pontuacaoBruta = respostas.reduce((total, r) => total + (r + 1), 0);
      const maxPontuacao = perguntas.length * 4;
      const pontuacaoFinal = Math.round((pontuacaoBruta / maxPontuacao) * 100);

      setDadosGrafico([
        { name: 'Sua Empresa', score: pontuacaoFinal, fill: '#22c55e' },
        { name: 'Média Brasil', score: MEDIA_BRASIL, fill: '#475569' }
      ]);

      setTimeout(() => {
        setShowGrafico(true);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Erro ao gerar o gráfico. Verifique o console.");
      setLoading(false);
    }
  }

  return (
    <section id="questionario" className="max-w-4xl mx-auto px-4 py-20 text-white scroll-mt-24">
      <h1 className="text-3xl font-bold mb-8 text-green-400 text-center">Diagnóstico Ambiental TerraMetric</h1>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {!showGrafico ? (
        <div className="space-y-6">
          {perguntas.map((pergunta, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-white/10 rounded-xl hover:border-green-500/50 transition">
              <p className="font-semibold mb-4 text-gray-200">{pergunta.texto}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pergunta.opcoes.map((opcao, j) => (
                  <label key={j} className={`flex items-center p-3 rounded-lg cursor-pointer border transition ${respostas[i] === j ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-white/5 border-transparent hover:bg-white/10'}`}>
                    <input
                      type="radio"
                      name={`pergunta-${i}`}
                      checked={respostas[i] === j}
                      onChange={() => responder(i, j)}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${respostas[i] === j ? 'border-green-500' : 'border-gray-500'}`}>
                      {respostas[i] === j && <div className="w-2 h-2 bg-green-500 rounded-full" />}
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
            className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-xl font-bold text-lg transition-all shadow-xl shadow-green-900/20"
          >
            {loading ? "Gerando..." : "Gerar Comparativo Ambiental"}
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 animate-fade-in">
          <h2 className="text-2xl font-bold mb-10 text-center">Performance Ambiental: Empresa vs Média Nacional</h2>
          
          {dadosGrafico.length > 0 ? (
            <div className="h-80 w-full mb-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                    formatter={(value) => [`${value}%`, 'Pontuação']}
                  />
                  <Bar dataKey="score" radius={[10, 10, 0, 0]} barSize={80}>
                    {dadosGrafico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 w-full mb-10 flex items-center justify-center">
              <p className="text-gray-400">Erro ao carregar gráfico. Tente refazer o diagnóstico.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
              <span className="text-gray-400 block text-sm uppercase tracking-wider">Sua Pontuação</span>
              <span className="text-4xl font-black text-green-500">{dadosGrafico[0]?.score || 0}%</span>
            </div>
            <div className="p-4 bg-slate-800 border border-white/5 rounded-xl text-center">
              <span className="text-gray-400 block text-sm uppercase tracking-wider">Média Brasil</span>
              <span className="text-4xl font-black text-gray-400">{MEDIA_BRASIL}%</span>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm italic mb-8">
            * Dados baseados no Índice de Sustentabilidade Empresarial (ISE) médio brasileiro de 2025.
          </p>

          <button onClick={() => { setShowGrafico(false); setRespostas(Array(perguntas.length).fill(null)); setDadosGrafico([]); setError(null); }} className="block mx-auto text-green-500 hover:text-green-400 font-semibold underline">
            Refazer Diagnóstico
          </button>
        </div>
      )}
    </section>
  );
}