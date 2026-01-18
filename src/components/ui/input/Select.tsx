import { useEffect, useRef } from "react"

export type SelectItem = {
  label: string
  value: string
}

export type SelectProps = {
  items: SelectItem[]
  value?: string
  placeholder?: string
  label?: string
  className?: string
  disabled?: boolean
  onSelect: (value: string) => void
}

const ITEM_HEIGHT = 50

const Select = ({
  items,
  value,
  className,
  disabled = false,
  onSelect
}: SelectProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current || !value) return

    const index = items.findIndex(item => item.value === value)
    if (index === -1) return

    const container = listRef.current
    const containerHeight = container.clientHeight

    const scrollTop =
      index * ITEM_HEIGHT - containerHeight / 2 + ITEM_HEIGHT / 2

    container.scrollTo({
      top: Math.max(0, scrollTop),
      behavior: "smooth" as ScrollBehavior
    })
  }, [value, items])

  return (
    <div
      ref={listRef}
      className={`
        h-full min-h-0
        overflow-y-auto overflow-x-hidden
        rounded-md bg-transparent
        ${disabled ? "opacity-50 pointer-events-none" : ""}
        ${className}
      `}
    >
      {items.map(item => {
        const selected = item.value === value

        return (
          <div
            key={item.value}
            onClick={() => onSelect(item.value)}
            className={`
              flex items-center px-3 w-full
              text-lg cursor-pointer transition
              ${selected
                ? "bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium"
                : "text-black hover:bg-gray-100/50"}
            `}
            style={{ height: ITEM_HEIGHT }}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

export default Select
