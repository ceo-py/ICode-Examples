export function formatTitle(title) {
  const withoutUnderscores = title.replace(/_/g, ' ');
  const titleName = withoutUnderscores.split('.')[0];
  return titleName.replace(/\b\w/g, char => char.toUpperCase());
}