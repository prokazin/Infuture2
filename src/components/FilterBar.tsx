'use client'

interface FilterBarProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

const filters = ['Все', 'iPhone', 'Samsung', 'Macbook']

export default function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  return (
    <div className="max-w-xl mx-auto px-5 pb-4 flex gap-2 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`tab whitespace-nowrap ${activeFilter === filter ? 'tab-active' : ''}`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
