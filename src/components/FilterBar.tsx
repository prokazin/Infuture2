'use client'

interface FilterBarProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

const filters = ['Все', 'iPhone', 'Samsung', 'Macbook']

export default function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  return (
    <div className="flex gap-3 px-4 py-4 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`filter-tab ${
            activeFilter === filter ? 'filter-tab-active' : 'filter-tab-inactive'
          }`}
          style={{
            minWidth: filter === 'Все' ? '89px' : filter === 'iPhone' ? '91px' : '119px'
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
