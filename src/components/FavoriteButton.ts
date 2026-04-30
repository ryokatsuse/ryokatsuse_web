const fetchAPI = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const getFavoriteStatus = (slug: string): Promise<boolean> =>
  fetchAPI<{ isFavorite: boolean }>(
    `/api/favorites/check?slug=${encodeURIComponent(slug)}`,
  )
    .then((data) => data.isFavorite)
    .catch(() => false);

export const toggleFavorite = (slug: string): Promise<boolean> =>
  fetchAPI<{ isFavorite: boolean }>('/api/favorites/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  })
    .then((data) => data.isFavorite)
    .catch(() => false);

export const getFavoriteUIClasses = (isFavorite: boolean) => ({
  containerAdd: isFavorite ? ['bg-red-100', 'dark:bg-red-900'] : [],
  containerRemove: isFavorite ? [] : ['bg-red-100', 'dark:bg-red-900'],
  iconAdd: isFavorite
    ? ['text-red-500', 'fill-red-500']
    : ['text-gray-500', 'dark:text-gray-400'],
  iconRemove: isFavorite
    ? ['text-gray-500', 'dark:text-gray-400']
    : ['text-red-500', 'fill-red-500'],
});

export const updateFavoriteUI = (
  element: HTMLElement,
  isFavorite: boolean,
): void => {
  const button = element.querySelector('button');
  const icon = element.querySelector('.favorite-icon');
  if (!button || !icon) return;

  const classes = getFavoriteUIClasses(isFavorite);

  classes.containerAdd.forEach((cls) => {
    button.classList.add(cls);
  });
  classes.containerRemove.forEach((cls) => {
    button.classList.remove(cls);
  });

  classes.iconAdd.forEach((cls) => {
    (icon as Element).classList.add(cls);
  });
  classes.iconRemove.forEach((cls) => {
    (icon as Element).classList.remove(cls);
  });

  button.setAttribute('aria-pressed', String(isFavorite));
  button.setAttribute(
    'aria-label',
    isFavorite ? 'お気に入りに登録済み' : 'お気に入りに追加',
  );
};

export const initializeFavoriteButton = (
  element: HTMLElement,
): Promise<void> => {
  const slug = element.dataset.slug || '';
  const button = element.querySelector('button');
  if (!button) {
    return Promise.resolve();
  }

  const handleClick = () => {
    toggleFavorite(slug).then((isFavorite) =>
      updateFavoriteUI(element, isFavorite),
    );
  };

  return getFavoriteStatus(slug).then((isFavorite) => {
    updateFavoriteUI(element, isFavorite);
    button.addEventListener('click', handleClick);
  });
};

export const registerFavoriteButton = (): void => {
  customElements.define(
    'favorite-button',
    class extends HTMLElement {
      connectedCallback(): void {
        initializeFavoriteButton(this).catch((err) =>
          console.error('Failed to initialize favorite button:', err),
        );
      }
    },
  );
};
