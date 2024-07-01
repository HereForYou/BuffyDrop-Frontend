import { ReactNode } from 'react'
import { Toaster } from "react-hot-toast";

export default function ToastrProvider({ children, position }: { children: ReactNode, position: 'top-center' | 'bottom-center' }) {
    return (
        <>
            {children}
            <Toaster position={position} />
        </>
    )
}