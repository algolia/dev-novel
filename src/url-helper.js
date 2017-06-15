/* @flow */
import qs from 'qs';

export function updateURL(selectedStory: ?string): void {
  if (selectedStory) {
    const baseQuery = qs.parse(window.location.search.replace('?', ''));
    const nextQuery = qs.stringify({ ...baseQuery, selectedStory });
    window.history.pushState({}, null, `?${nextQuery}`);
  }
}

export function loadFromURL(): ?string {
  const query = qs.parse(window.location.search.replace('?', ''));
  return (query && query.selectedStory) || null;
}
