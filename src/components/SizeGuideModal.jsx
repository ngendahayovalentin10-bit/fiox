import { X } from 'lucide-react'

const sizeMatrix = [
  { label: 'XS', chest: '84 cm', waist: '68 cm' },
  { label: 'S', chest: '88 cm', waist: '72 cm' },
  { label: 'M', chest: '94 cm', waist: '76 cm' },
  { label: 'L', chest: '100 cm', waist: '82 cm' },
  { label: 'XL', chest: '106 cm', waist: '88 cm' },
]

export default function SizeGuideModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] border border-stone-800 bg-[#121212] p-6 text-white shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-stone-400">FIOX</p>
            <h3 className="mt-2 text-2xl font-medium tracking-[-0.06em]">Size Guide</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-stone-700 p-2 text-stone-200 hover:bg-stone-900">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-800">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-stone-900 text-stone-300">
              <tr>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Chest</th>
                <th className="px-4 py-3">Waist</th>
              </tr>
            </thead>
            <tbody>
              {sizeMatrix.map((size) => (
                <tr key={size.label} className="border-t border-stone-800 text-stone-200">
                  <td className="px-4 py-3 font-medium">{size.label}</td>
                  <td className="px-4 py-3">{size.chest}</td>
                  <td className="px-4 py-3">{size.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-sm text-stone-300">
          Fit notes: FIOX silhouettes are intentionally relaxed. If you prefer a closer fit, we recommend sizing down by one step.
        </p>
      </div>
    </div>
  )
}
