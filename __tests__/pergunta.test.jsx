import { render, screen, fireEvent } from '@testing-library/react';
import Pergunta from '../src/pages/pergunta/[id]';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

//mock return from function useBreakpointValue from @chakra-ui/react
jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useBreakpointValue: jest.fn(),
}));

//mock return from function useRouter from next/router
jest.mock('next/router', () => require('next-router-mock'));

jest.mock('@/contexts/questionsContext', () => ({
    useQuestions: jest.fn(() => ({
        addQuestionAnswer: jest.fn(),
        setQuestions: jest.fn(),
    }))
}))
 
describe('Testes da página de Pergunta', () => {
  it('Renderizou a página inicial', () => {

    mockRouter.query = {
        id: '1'
    }

    render(<Pergunta />);
 
    const heading = screen.getByText('Qual o serviço deseja buscar?');
    expect(heading).toBeInTheDocument();
  });

    it("Ao clicar no botão de voltar deve voltar para a página inicial", () => {
        mockRouter.query = {
            id: '1'
        }

        render(<Pergunta />);
        const buttonBack = screen.getByTestId('back-button');
        expect(buttonBack).toBeInTheDocument();
        fireEvent.click(buttonBack);
        expect(mockRouter.pathname).toBe('/');
    })

    

});