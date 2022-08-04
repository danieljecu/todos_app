import React from "react";
import { HeaderBar } from "components/Header/styles";
import { PageContainer } from "./page-container";

// NOT USED YET, the ideea is to have a generic page container that can be used for all pages
// not sure is this is the best way to do this
function Layout() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <PageContainer>
        here is the acctual content, maybe you want it inset by default
      </PageContainer>
    </div>
  );
}

export default Layout;
