/**
 * Gera as iniciais a partir de um nome:
 * - "Fernando Rodrigues" → "FR"
 * - "Maria"             → "M"
 * - null / undefined    → "?"
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  // Duas primeiras letras dos dois primeiros nomes
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
