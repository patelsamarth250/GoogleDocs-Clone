import DocumentSearchBar from "../../atoms/document-searchbar/document-searchbar";
import Logo from "../../atoms/logo/logo";
import UserDropDown from "../../atoms/user-dropdown/user-dropdown";

interface DocumentCreateHeaderProps {
  onSearch: (value: string) => void;
}

const DocumentCreateHeader: React.FC<DocumentCreateHeaderProps> = ({ onSearch }) => {
  return (
    <div className="w-full px-3 py-1 flex justify-between items-center">
      <Logo />
      <DocumentSearchBar onSearch={onSearch} />
      <UserDropDown />
    </div>
  );
};

export default DocumentCreateHeader;
