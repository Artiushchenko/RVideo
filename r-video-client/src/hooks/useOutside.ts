import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'

type TypeOut<T extends HTMLElement> = {
	ref: React.RefObject<T | null>
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = <T extends HTMLElement>(initialIsVisible: boolean): TypeOut<T> => {
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<T | null>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { ref, isShow, setIsShow }
}
