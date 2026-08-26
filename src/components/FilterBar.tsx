'use client'

interface FilterBarProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

const filters = [
  { name: 'Все', width: '89.1px', active: true },
  { name: 'iPhone', width: '90.75px', active: false },
  { name: 'Samsung', width: '118.8px', active: false },
  { name: 'Macbook', width: '118.8px', active: false }
]

export default function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  return (
    <div className="flex gap-3 px-4 py-4 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.name}
          onClick={() => setActiveFilter(filter.name)}
          className={activeFilter === filter.name ? 'filter-active' : 'filter-inactive'}
          style={{ minWidth: filter.width }}
        >
          {filter.name}
        </button>
      ))}
    </div>
  )
}
