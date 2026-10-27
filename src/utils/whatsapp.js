import { siteConfig } from '../data/siteConfig'

export function formatRwf(value) {
  return `RWF ${Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

export function buildWhatsAppMessage(items, total) {
  const orderSummary = items
    .map(
      (item) =>
        `${item.product.name} • ${item.color} • ${item.size} • Qty ${item.quantity} • ${formatRwf(item.product.price * item.quantity)}`,
    )
    .join('\n')

  return [
    'Hello FIOX, I would like to place an order.\n',
    'Brand: FIOX',
    'Items:\n' + orderSummary,
    `Total: ${formatRwf(total)}`,
    'Please confirm availability and next steps.',
  ].join('\n')
}

export function getWhatsAppLink(items, total) {
  const number = siteConfig.businessNumber?.replace(/\D/g, '')

  if (!number) {
    return null
  }

  const message = buildWhatsAppMessage(items, total)
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
