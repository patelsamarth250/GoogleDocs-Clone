import { FocusEvent, MouseEvent, useContext, useRef, useState } from "react";
import useAuth from "../../../hooks/use-auth";
import { ToastContext } from "../../../contexts/toast-context";
import DocumentService from "../../../services/document-service";
import DocumentInterface from "../../../types/interfaces/document";
import { CSSTransition } from "react-transition-group";
import './DocumentMenuButton.css';  // Ensure you import your CSS

interface DocumentMenuButtonProps {
  documentId: number;
  setDocuments: Function;
}

const DocumentMenuButton = ({
  documentId,
  setDocuments,
}: DocumentMenuButtonProps) => {
  const { accessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { error } = useContext(ToastContext);

  const handleDeleteBtnClick = async (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (accessToken === null) return;

    setLoading(true);

    try {
      await DocumentService.delete(accessToken, documentId);
      setDocuments((allDocuments: Array<DocumentInterface>) =>
        allDocuments.filter((document) => document.id !== documentId)
      );
    } catch (err) {
      error("Unable to delete document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMenuBtnBlur = (event: FocusEvent<HTMLButtonElement>) => {
    const classList = (event.target as HTMLButtonElement).classList;

    if (!classList.contains("document-menu")) {
      setShowDropdown(false);
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className={`relative flex justify-center document-menu-btn-${documentId}`}
    >
      <button
        onClick={handleButtonClick}
        onBlur={handleMenuBtnBlur}
        className={`hover:bg-gray-100 relative left-2 w-8 h-8 rounded-full flex items-center justify-center document-menu-btn-${documentId}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-5 h-5 document-menu-btn-${documentId}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`document-menu-btn-${documentId}`}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          ></path>
        </svg>
      </button>
      <CSSTransition
        nodeRef={dropdownRef}
        in={showDropdown}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
      >
        <div
          ref={dropdownRef}
          className="absolute top-full document-menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={(event) => (!loading ? handleDeleteBtnClick(event) : undefined)}
            className="w-full document-menu"
          >
            <button
              className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DocumentMenuButton;
