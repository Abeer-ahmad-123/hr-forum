// import { render, screen, fireEvent } from '@testing-library/react'
// import Modal from '@/components/Generic/Modal'
// import '@testing-library/jest-dom'

// // Mock ResizeObserver
// global.ResizeObserver = class {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// }

// describe('Modal', () => {
//   const isOpen = true
//   const onClose = jest.fn()
//   const header = 'Modal Header'
//   const modalContent = 'Modal Content'

//   beforeEach(() => {
//     render(
//       <Modal isOpen={isOpen} onClose={onClose} header={header}>
//         {modalContent}
//       </Modal>,
//     )
//   })

//   it('should render the Modal component with header and content', () => {
//     const modal = screen.getByRole('dialog')
//     expect(modal).toBeInTheDocument()

//     const modalHeader = screen.getByText(header)
//     expect(modalHeader).toBeInTheDocument()

//     const content = screen.getByText(modalContent)
//     expect(content).toBeInTheDocument()
//   })

//   it('should call onClose when the close button is clicked', () => {
//     const closeButtonIcon = screen.getByTestId('close-button-icon')
//     fireEvent.click(closeButtonIcon)

//     expect(onClose).toHaveBeenCalledTimes(1)
//   })
// })
