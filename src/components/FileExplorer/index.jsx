import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FcFolder } from "react-icons/fc";
import { RiFolderAddFill } from "react-icons/ri";
import { RxFileText } from "react-icons/rx";
import explorer from "./data";
import "./styles.css";

const Explorer = ({ data, addItem }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ visible: true, isFolder });
  };

  const addNew = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      addItem(data.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (data.isFolder) {
    return (
      <div className="renderer-container">
        <div className="explorer-folder" onClick={() => setExpand(!expand)}>
          <div className="specific-folder">
            <FcFolder />
            {data.name}
          </div>
          <div className="specific-folder">
            <button
              className="new-button"
              onClick={(e) => handleNewFolder(e, true)}
            >
              <RiFolderAddFill />
            </button>
            <button
              className="new-button"
              onClick={(e) => handleNewFolder(e, false)}
            >
              <AiOutlineFileAdd />
            </button>
          </div>
        </div>

        {expand && (
          <div className="nested-container">
            {showInput.visible && (
              <div className="new-input-renderer">
                <span>
                  {showInput.isFolder ? <FcFolder /> : <RxFileText />}
                </span>
                <input
                  type="text"
                  onKeyDown={addNew}
                  className="new-adder"
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  autoFocus
                />
              </div>
            )}
            {data.items.map((item) => (
              <Explorer data={item} addItem={addItem} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="explorer-file">
        <RxFileText />
        {data.name}
      </div>
    );
  }
};

const FileExplorer = () => {
  const [fileData, setFileData] = useState(explorer);

  const addItem = (folderId, folderName, isFolder) => {
    const newItem = {
      id: new Date().getTime(),
      name: folderName,
      isFolder,
      items: isFolder ? [] : undefined,
    };

    const updateTree = (data) => {
      if (data.id === folderId && data.isFolder) {
        return { ...data, items: [...data.items, newItem] };
      }

      if (data.items) {
        return { ...data, items: data.items.map(updateTree) };
      }

      return data;
    };

    setFileData((prev) => updateTree(prev));
  };

  return (
    <div className="explorer-container">
      <div className="explorer-heading">File Explorer</div>
      <Explorer data={fileData} addItem={addItem} />
    </div>
  );
};

export default FileExplorer;
