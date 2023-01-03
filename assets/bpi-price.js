const bestPriceNodes = document.querySelectorAll('[data-bpi-prices]');
const bestPrices = [...bestPriceNodes].map(node => JSON.parse(node.textContent));
window.bipPreviousId = null;

document.addEventListener('change', () => {
  const currentPageUrl = new URL(document.URL);
  const variantId = parseInt(currentPageUrl.searchParams.get('variant'));

  // get the best price for the new variant
  const currentBestPrices = bestPrices.filter(price => price.variantPrices.variantId !== null)[0];
  window.bipPreviousId = window.bipPreviousId || parseInt(currentBestPrices.initialId);

  // skip if variant is not changed
  if (window.bipPreviousId === variantId) return;

  // get the price value and set it to the price node
  window.bipPreviousId = variantId;
  const newBestPrice = currentBestPrices.variantPrices[variantId];
  const priceContainers = document.querySelectorAll(`.bpi-price[data-bpi-product="${currentBestPrices.product}"]`);

  priceContainers.forEach(container => {
    if (newBestPrice.compareAtPrice <= newBestPrice.price || newBestPrice.price === parseInt(newBestPrice.bpiPrice)) {
      container.style.opacity = 0;
      return;
    }

    const label = newBestPrice?.priceLabel;
    container.innerHTML = currentBestPrices.label.replace('{{ price }}', label);
    container.style.opacity = 1;
  });
});
