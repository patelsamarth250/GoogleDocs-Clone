
import CreateDocumentButton from "../../components/atoms/create-document-button/create-document-btn";
import Spinner from "../../components/atoms/spinner/spinner";
import DocumentsList from "../../components/molecules/documents-list/documents-list";
import DocumentCreateHeader from "../../components/organisms/document-create-header/document-create-header";
import useAuth from "../../hooks/use-auth";
import useDocuments from "../../hooks/use-documents";
import useWindowSize from "../../hooks/use-window-size";
import DocumentInterface from "../../types/interfaces/document";

import { useEffect, useState } from "react";

const Create = () => {
  const { heightStr } = useWindowSize();
  const { userId } = useAuth();
  const { documents, loading, setDocuments } = useDocuments();

  const [filteredDocs, setFilteredDocs] = useState<Array<DocumentInterface>>(documents);

  useEffect(() => {
    setFilteredDocs(documents);
  }, [documents]);

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim().toLowerCase();
    if (trimmedValue === "") {
      setFilteredDocs(documents);
    } else {
      const newDocs = documents.filter((document) =>
        document.title?.toLowerCase().includes(trimmedValue)
      );
      setFilteredDocs(newDocs);
    }
  };

  const recentDocuments = filteredDocs.filter((document) => document.userId === userId);
  const sharedDocuments = filteredDocs.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader onSearch={handleSearch} />
      <CreateDocumentButton />
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <DocumentsList
            title="Recent Documents"
            documents={recentDocuments}
            setDocuments={setDocuments}
          />
          <DocumentsList
            title="Shared Documents"
            documents={sharedDocuments}
            setDocuments={setDocuments}
          />
        </>
      )}
    </div>
  );
};

export default Create;
