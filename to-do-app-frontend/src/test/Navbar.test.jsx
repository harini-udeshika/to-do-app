import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar/Navbar'

describe('Navbar Component', () => {
    it('renders the navbar title correctly', () => {
        render(<Navbar />)

        expect(screen.getByText('To-Do App')).toBeInTheDocument()
    })

    it('renders the home link', () => {
        render(<Navbar />)

        const homeLink = screen.getByRole('link', { name: /home/i })
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute('href', '/')
    })

    it('renders the home icon and text', () => {
        render(<Navbar />)

        // Check for the combined text content including the icon
        expect(screen.getByText(/FaHome.*Dashboard/)).toBeInTheDocument()
    })

    it('has the correct navbar structure', () => {
        render(<Navbar />)

        const navbar = screen.getByRole('navigation')
        expect(navbar).toBeInTheDocument()
        expect(navbar).toHaveClass('navbar')
    })

    it('contains the links container', () => {
        render(<Navbar />)

        const linksContainer = document.querySelector('.links')
        expect(linksContainer).toBeInTheDocument()
    })

    it('renders exactly one navigation link', () => {
        render(<Navbar />)

        const links = screen.getAllByRole('link')
        expect(links).toHaveLength(1)
    })

    it('has the correct heading hierarchy', () => {
        render(<Navbar />)

        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('To-Do App')
    })
}) 