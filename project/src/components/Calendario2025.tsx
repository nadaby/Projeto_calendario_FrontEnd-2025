import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ptBR } from "date-fns/locale";
import { format, getDaysInMonth } from "date-fns";

interface Anotacoes {
  [data: string]: string;
}

const Calendario2025 = () => {
  const [mesAtual, setMesAtual] = useState(0);
  const [anoAtual] = useState(2025);
  const [anotacoes, setAnotacoes] = useState<Anotacoes>({});
  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);
  const [textoAnotacao, setTextoAnotacao] = useState("");

  const diasNoMes = getDaysInMonth(new Date(anoAtual, mesAtual));

  useEffect(() => {
    if (diaSelecionado !== null) {
      const data = format(new Date(anoAtual, mesAtual, diaSelecionado), "yyyy-MM-dd");
      setTextoAnotacao(anotacoes[data] || "");
    }
  }, [diaSelecionado, mesAtual, anoAtual, anotacoes]);

  const lidarComSalvar = () => {
    if (diaSelecionado === null) return;
    const data = format(new Date(anoAtual, mesAtual, diaSelecionado), "yyyy-MM-dd");
    setAnotacoes({ ...anotacoes, [data]: textoAnotacao });
    setDiaSelecionado(null);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setMesAtual((prev) => (prev === 0 ? 11 : prev - 1))}
          aria-label="Mês anterior"
        >
          ←
        </button>
        <h2 className="text-xl font-bold" data-testid="titulo-mes">
          {format(new Date(anoAtual, mesAtual), "MMMM yyyy", { locale: ptBR })}
        </h2>
        <button
          onClick={() => setMesAtual((prev) => (prev === 11 ? 0 : prev + 1))}
          aria-label="Próximo mês"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {Array.from({ length: diasNoMes }, (_, i) => i + 1).map((dia) => (
          <button
            key={dia}
            className="p-2 border rounded hover:bg-gray-100"
            onClick={() => setDiaSelecionado(dia)}
          >
            {dia}
          </button>
        ))}
      </div>

      <Dialog open={diaSelecionado !== null} onClose={() => setDiaSelecionado(null)}>
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-4 rounded max-w-sm w-full">
            <Dialog.Title className="font-bold mb-2">
              Anotação para o dia {diaSelecionado}
            </Dialog.Title>
            <textarea
              className="w-full border p-2 mb-2"
              placeholder="Digite sua anotação aqui..."
              value={textoAnotacao}
              onChange={(e) => setTextoAnotacao(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-1 border" onClick={() => setDiaSelecionado(null)}>
                Cancelar
              </button>
              <button className="px-4 py-1 bg-blue-500 text-white rounded" onClick={lidarComSalvar}>
                Salvar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Calendario2025;
