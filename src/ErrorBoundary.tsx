import { ReactNode } from "react"

interface ErrorBoundaryState {
    hasError: boolean;
}

interface ErrorBoundaryProps {
    children: ReactNode
}

