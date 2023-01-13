import React from "react";

import "css/activityLoader.css";
const { innerWidth, innerHeight } = window;
function ActivityLoader(props) {
  const { pageLoading = true, isRefreshing = true } = props;
  return (
    <>
      {isRefreshing && (
        <div
          className={
            pageLoading
              ? "loader-container full-screen-loading "
              : "loader-container"
          }
          style={{
            width: pageLoading && "-webkit-fill-available",
            height: pageLoading && innerHeight,
          }}
        >
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivityLoader;
