import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

//mock return from function useBreakpointValue from @chakra-ui/react
jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useBreakpointValue: jest.fn(),
}));

//mock return from function useRouter from next/router
jest.mock('next/router', () => require('next-router-mock'));

jest.mock("@/contexts/questionsContext", () => ({
    useQuestions: () => ({
        questions: [],
        setQuestions: jest.fn(),
    }),
}))
 
describe('Testes da página Home', () => {
  it('Renderizou a página inicial', () => {
    render(<Home />);
 
    const heading = screen.getByText('Bem-vindo ao');
    expect(heading).toBeInTheDocument();
  });

    it('Renderizou os botões de Começar Agora e Painel de busca', () => {
        render(<Home />);

        const buttonStart = screen.getByText('Começar Agora');
        const buttonSearch = screen.getByText('Painel de busca');
        expect(buttonStart).toBeInTheDocument();
        expect(buttonSearch).toBeInTheDocument();
    })

    it("Ao renderizar a página inicial, o modal de ajuda não deve estar visível", () => {
        render(<Home />);

        const modal = screen.queryByTestId('help-modal')
        expect(modal).not.toBeInTheDocument();
    });

    it("Ao clicar no botão de help deve abrir o modal de ajuda", () => {
        render(<Home />);

        const buttonHelp = screen.getByTestId('help-button');
        expect(buttonHelp).toBeInTheDocument();
        fireEvent.click(buttonHelp);
        const modal = screen.getByTestId('help-modal')
        expect(modal).toBeInTheDocument(); 
    })

    it("Ao fechar o modal de ajuda deve fechar o modal", () => {
        render(<Home />); 

        const buttonHelp = screen.getByTestId('help-button');
        expect(buttonHelp).toBeInTheDocument();
        fireEvent.click(buttonHelp);
        const modal = screen.getByTestId('help-modal')
        expect(modal).toBeInTheDocument(); 
        const buttonClose = screen.getByTestId('help-modal-close')
        fireEvent.click(buttonClose);
        expect(modal).not.toHaveAttribute('aria-hidden', 'true');
    });

    it("Ao clicar no botão de Começar Agora deve redirecionar para a página /pergunta/1", () => {
        render(<Home />);

        const buttonStart = screen.getByTestId('start-button');
        expect(buttonStart).toBeInTheDocument();
        fireEvent.click(buttonStart);
        expect(mockRouter.pathname).toBe('/pergunta/1');
    })

    it("Ao clicar no botão de Painel de busca deve redirecionar para a página /painel_de_busca", () => {
        render(<Home />);

        const buttonSearch = screen.getByTestId('search-button');
        expect(buttonSearch).toBeInTheDocument();
        fireEvent.click(buttonSearch);
        expect(mockRouter.pathname).toBe('/painel_de_busca');
    })
});