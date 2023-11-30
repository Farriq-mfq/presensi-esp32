import { type ClassNameValue, twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

const cn = (...inputs: ClassNameValue[]) => {
    return twMerge(clsx(inputs))
}

export default cn