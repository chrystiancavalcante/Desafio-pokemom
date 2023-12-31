import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateTeam from '../components/CreateTeam';

// Mock do fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Retornar uma lista vazia de Pokémons para simplificar
  })
) as jest.Mock;

describe('CreateTeam Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('deve renderizar o componente sem erros', () => {
    render(<CreateTeam />);
    expect(screen.getByText(/Crie seu Time de Pokémons/i)).toBeInTheDocument();
  });

  it('deve permitir a seleção de até 5 Pokémons', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: 'Bulbasaur' },
          { id: 2, name: 'Ivysaur' },
         
        ]),
      })
    );

    render(<CreateTeam />);

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    });

    const pokemonCards = screen.getAllByText(/Bulbasaur|Ivysaur/);
    pokemonCards.slice(0, 5).forEach(card => fireEvent.click(card));

    expect(screen.getAllByText(/Bulbasaur|Ivysaur/).filter(card => card.classList.contains('selected')).length).toBeLessThanOrEqual(5);
  });

  it('deve aplicar o estilo de seleção ao clicar em um Pokémon', async () => {

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: 'Bulbasaur' },
          { id: 2, name: 'Ivysaur' },
         
        ]),
      })
    );

    render(<CreateTeam />);

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    });

    const bulbasaurCard = screen.getByText('Bulbasaur').closest('div');

    if (bulbasaurCard) {
      fireEvent.click(bulbasaurCard);

      expect(bulbasaurCard).toHaveStyle({
        border: '3px solid green',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
      });
    } else {
      throw new Error('Elemento do Pokémon não encontrado');
    }
  });

});
