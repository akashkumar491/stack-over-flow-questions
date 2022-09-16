import React, { useState } from "react";
import "./App.css";
import { DataTable, Filter, Header } from "./components";
import { url, baseUrl } from "./constants/url";

function App() {
  const [apiLink, setApiLink] = useState(url);

  const getUpdatedUrl = (url: string) => {
    setApiLink(baseUrl + url);
  };

  return (
    <>
      <Header />
      <Filter getUpdatedUrl={getUpdatedUrl} />
      <DataTable api={apiLink} />
    </>
  );
}

export default App;
