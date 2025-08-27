import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * A lightweight accessible custom select that replaces the native <select>.
 * - Supports flat options or grouped options
 * - Keyboard navigation (ArrowUp/Down, Enter, Escape, Home/End)
 * - Click outside to close
 */
export default function CustomSelect({
  id,
  placeholder = 'Select...',
  value,
  onChange,
  options,
  className = '',
  required = false,
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const [menuRect, setMenuRect] = useState({ left: 0, top: 0, width: 0 })

  // Normalize options to a flat list with group headers
  const flatOptions = useMemo(() => {
    const out = []
    if (!Array.isArray(options)) return out
    options.forEach((item) => {
      if (item && Array.isArray(item.options)) {
        out.push({ type: 'group', label: item.label || '' })
        item.options.forEach((opt) => {
          const label = typeof opt === 'string' ? opt : opt.label
          const val = typeof opt === 'string' ? opt : opt.value
          out.push({ type: 'option', label, value: val })
        })
      } else {
        const label = typeof item === 'string' ? item : item.label
        const val = typeof item === 'string' ? item : item.value
        out.push({ type: 'option', label, value: val })
      }
    })
    return out
  }, [options])

  const currentLabel = useMemo(() => {
    const match = flatOptions.find((o) => o.type === 'option' && o.value === value)
    return match ? match.label : ''
  }, [flatOptions, value])

  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('touchstart', onDocClick)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('touchstart', onDocClick)
    }
  }, [])

  // Position portal menu relative to the control
  useEffect(() => {
    const update = () => {
      if (!open || !rootRef.current) return
      const rect = rootRef.current.getBoundingClientRect()
      setMenuRect({ left: rect.left, top: rect.bottom + 6, width: rect.width })
    }
    update()
    if (!open) return
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [open])

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
        // focus first selectable option
        const first = flatOptions.findIndex((o) => o.type === 'option')
        setActiveIndex(first)
      }
      return
    }

    const selectable = flatOptions
      .map((o, idx) => ({ o, idx }))
      .filter((x) => x.o.type === 'option')

    const currentSelectableIndex = Math.max(
      0,
      selectable.findIndex((x) => x.idx === activeIndex)
    )

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = selectable[Math.min(selectable.length - 1, currentSelectableIndex + 1)]
      if (next) setActiveIndex(next.idx)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = selectable[Math.max(0, currentSelectableIndex - 1)]
      if (prev) setActiveIndex(prev.idx)
    } else if (e.key === 'Home') {
      e.preventDefault()
      const first = selectable[0]
      if (first) setActiveIndex(first.idx)
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = selectable[selectable.length - 1]
      if (last) setActiveIndex(last.idx)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const item = flatOptions[activeIndex]
      if (item && item.type === 'option') {
        onChange && onChange(item.value)
        setOpen(false)
      }
    }
  }

  return (
    <div
      ref={rootRef}
      id={id}
      className={`custom-select ${open ? 'open' : ''} ${className}`}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={() => setOpen((v) => !v)}
    >
      <div className={`cs-control ${value ? 'has-value' : ''}`}>
        <span className="cs-value">{value ? currentLabel : placeholder}</span>
        <span className="cs-arrow" aria-hidden="true">▾</span>
      </div>
      {open && typeof document !== 'undefined' && createPortal(
        <div
          className="cs-portal cs-menu"
          role="listbox"
          style={{ position: 'fixed', left: menuRect.left, top: menuRect.top, width: menuRect.width, zIndex: 10000 }}
        >
          {flatOptions.map((item, idx) => {
            if (item.type === 'group') {
              return (
                <div className="cs-group" key={`g-${idx}`}>{item.label}</div>
              )
            }
            const selected = item.value === value
            const active = idx === activeIndex
            return (
              <div
                key={`o-${idx}-${String(item.value)}`}
                role="option"
                aria-selected={selected}
                className={`cs-option ${selected ? 'selected' : ''} ${active ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={(e) => {
                  e.stopPropagation()
                  onChange && onChange(item.value)
                  setOpen(false)
                }}
              >
                {item.label}
              </div>
            )
          })}
        </div>,
        document.body
      )}
      {required && !value && (
        <input tabIndex={-1} aria-hidden="true" required style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      )}
    </div>
  )
}


