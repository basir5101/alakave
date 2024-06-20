export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  export function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          {children}
          <button onClick={onClose}>Close</button>
        </div>
        <style jsx>{`
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    );
  }
  