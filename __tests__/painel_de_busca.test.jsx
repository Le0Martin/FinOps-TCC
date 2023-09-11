import { render, screen, fireEvent } from '@testing-library/react';
import PainelDeBusca from '../src/pages/painel_de_busca';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

//mock return from function useBreakpointValue from @chakra-ui/react
jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useBreakpointValue: jest.fn(),
}));

//mock return from function useRouter from next/router
jest.mock('next/router', () => require('next-router-mock'));

//Mock return from import ResponsivePagination from "react-responsive-pagination";
jest.mock("react-responsive-pagination", () => {
    return {
        __esModule: true,
        default: () => {
            return <div ></div>;
        },
    };
});

describe('Testes da página de Painel de Busca', () => {
  it('Renderizou a página de Painel de Busca', () => {
    render(<PainelDeBusca />);
 
    const heading = screen.getByText('Voltar');
    expect(heading).toBeInTheDocument();
  });

  it("Ao clicar no botão de voltar deve voltar para a página inicial", () => {
    render(<PainelDeBusca />);
    const buttonBack = screen.getByTestId('back-button');
    expect(buttonBack).toBeInTheDocument();
    fireEvent.click(buttonBack);
    expect(mockRouter.pathname).toBe('/');
  })
})

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))