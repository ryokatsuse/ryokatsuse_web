const fetchAPI = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const getFavoriteStatus = (slug: string): Promise<boolean> =>
  fetchAPI<{ isFavorite: boolean }>(`/api/favorites/check?slug=${encodeURIComponent(slug)}`)
    .then(data => data.isFavorite)
    .catch(() => false);

export const toggleFavorite = (slug: string): Promise<boolean> =>
  fetchAPI<{ isFavorite: boolean }>('/api/favorites/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  })
    .then(data => data.isFavorite)
    .catch(() => false);

export const getFavoriteUIClasses = (isFavorite: boolean) => ({
  containerAdd: isFavorite ? ['bg-red-100', 'dark:bg-red-900'] : [],
  containerRemove: isFavorite ? [] : ['bg-red-100', 'dark:bg-red-900'],
  iconAdd: isFavorite ? ['text-red-500', 'fill-red-500'] : ['text-gray-500', 'dark:text-gray-400'],
  iconRemove: isFavorite ? ['text-gray-500', 'dark:text-gray-400'] : ['text-red-500', 'fill-red-500'],
});

export const updateFavoriteUI = (element: HTMLElement, isFavorite: boolean): void => {
  const icon = element.querySelector('.favorite-icon');
  if (!icon) return;

  const classes = getFavoriteUIClasses(isFavorite);

  classes.containerAdd.forEach(cls => element.classList.add(cls));
  classes.containerRemove.forEach(cls => element.classList.remove(cls));

  classes.iconAdd.forEach(cls => (icon as Element).classList.add(cls));
  classes.iconRemove.forEach(cls => (icon as Element).classList.remove(cls));
};

export const initializeFavoriteButton = (element: HTMLElement): Promise<void> => {
  const slug = element.dataset.slug || '';

  const handleClick = () => {
    toggleFavorite(slug).then(isFavorite => updateFavoriteUI(element, isFavorite));
  };

  return getFavoriteStatus(slug).then(isFavorite => {
    updateFavoriteUI(element, isFavorite);
    element.addEventListener('click', handleClick);
  });
};

export const registerFavoriteButton = (): void => {
  customElements.define(
    'favorite-button',
    class extends HTMLElement {
      connectedCallback(): void {
        initializeFavoriteButton(this).catch(err => console.error('Failed to initialize favorite button:', err));
      }
    },
  );
};
