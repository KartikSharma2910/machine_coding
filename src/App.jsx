import React, { useState } from "react";
import {
  Accordian,
  Carousal,
  Comments,
  FileExplorer,
  NestedComments,
  Pagination,
  ReverseLights,
  SelfComments,
  Sidebar,
  Stepper,
  TicTac,
  ToDoList,
  ToastComponent,
  YoutubeSearch,
} from "./components";
import sidebarData from "./data/sidebar";
import comments from "./data/comments";
import useNotification from "./hooks/useNotification";

const App = () => {
  const [data, setData] = useState(sidebarData);
  const [commentsData, setComments] = useState(comments);

  const { triggerNotification, NotificationComponent } =
    useNotification("top-right");

  return (
    <div>
      {/* <Stepper /> */}
      {/* <TicTac /> */}
      {/* <ReverseLights /> */}
      {/* <Sidebar data={data} /> */}
      {/* <NestedComments data={comments} /> */}
      {/* <YoutubeSearch /> */}
      {/* <Pagination /> */}
      {/* <Accordian /> */}
      {/* <ToDoList /> */}
      {/* <Carousal /> */}
      {/* <ToastComponent /> */}
      {/* {NotificationComponent}
      <button
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "This is a success notification",
            duration: 3000,
          })
        }
      >
        Trigger Notification
      </button> */}
      {/* <Comments /> */}
      {/* <SelfComments /> */}
      <FileExplorer />
    </div>
  );
};

export default App;
