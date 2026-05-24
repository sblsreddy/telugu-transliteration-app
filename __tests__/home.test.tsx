import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

describe('HomePage', () => {
  it('renders the transliteration form and result section', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /English → Telugu/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Transliterate/i })).toBeInTheDocument();
    expect(screen.getByText(/Your Telugu output appears here after transliteration/i)).toBeInTheDocument();
  });
});
