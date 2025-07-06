export function groupBooksByTitle(books: any[]): any[] {
  const map = new Map<string, any>();

  books.forEach(book => {
    const title = book.title;
    const ejemplares = book.ejemplares ?? [book];

    const available = ejemplares.filter(
      (e: any) =>
        e.estado === 'local' ||
        e.estado === 'disponible' ||
        e.disponible === true
    ).length;
    const total = ejemplares.length;

    if (map.has(title)) {
      const existing = map.get(title);
      existing.ejemplares = existing.ejemplares.concat(ejemplares);
      existing.disponibles += available;
      existing.cantidad += total;
    } else {
      map.set(title, {
        ...book,
        ejemplares: ejemplares,
        disponibles: available,
        cantidad: total
      });
    }
  });

  return Array.from(map.values());
}
