import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Calendario2025 from "./Calendario2025";
import "@testing-library/jest-dom";

describe("Calendario2025", () => {
  it("Renderiza corretamente o mês de janeiro de 2025", () => {
    render(<Calendario2025 />);
    expect(screen.getByTestId("titulo-mes")).toHaveTextContent("janeiro 2025");
  });

  it("Mostra todos os dias de janeiro (31 dias)", () => {
    render(<Calendario2025 />);
    for (let dia = 1; dia <= 31; dia++) {
      expect(screen.getByText(String(dia))).toBeInTheDocument();
    }
  });

  it("Abre e fecha o modal de anotação ao clicar em um dia", async () => {
    render(<Calendario2025 />);
    fireEvent.click(screen.getByText("15"));
    expect(await screen.findByText("Anotação para o dia 15")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancelar"));
    await waitFor(() => {
      expect(screen.queryByText("Anotação para o dia 15")).not.toBeInTheDocument();
    });
  });

  it("Salva e reabre uma anotação corretamente", async () => {
    render(<Calendario2025 />);

    fireEvent.click(screen.getByText("20"));
    const textarea = await screen.findByPlaceholderText("Digite sua anotação aqui...");
    fireEvent.change(textarea, { target: { value: "Reunião com professor" } });
    fireEvent.click(screen.getByText("Salvar"));

    await waitFor(() =>
      expect(screen.queryByText("Anotação para o dia 20")).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("20"));
    expect(await screen.findByDisplayValue("Reunião com professor")).toBeInTheDocument();
  });

  it("Troca de mês corretamente para fevereiro e volta para janeiro", async () => {
    render(<Calendario2025 />);
    const botaoProximo = screen.getByLabelText("Próximo mês");
    fireEvent.click(botaoProximo);

    await waitFor(() =>
      expect(screen.getByTestId("titulo-mes")).toHaveTextContent("fevereiro 2025")
    );

    const botaoAnterior = screen.getByLabelText("Mês anterior");
    fireEvent.click(botaoAnterior);

    await waitFor(() =>
      expect(screen.getByTestId("titulo-mes")).toHaveTextContent("janeiro 2025")
    );
  });
});
