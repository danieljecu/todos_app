// import styled from "@emotion/styled";
import styled from 'styled-components';
import ProjectsView from "./ProjectsView";
import Header from "./Header";

const AppWrapper = styled.div`
  /* text-align: center; */
`;

const MainWrapper = styled.main`
  border: 2px solid #aaa3a3;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const SideBar = styled.header`
  float: left;
  border: 2px solid #333;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const Menu = styled.header`
  text-align: center;
  padding-right: 10px;
  header & div{
    background-color: #e5e5e5;
    padding: 8px;
    margin-top: 7px;
    
    display: block;
    width: 100%;
    color: black;
  }
  
`;
const ALink = styled.div`
  /* background-color: #e5e5e5;
  padding: 8px;
  margin-top: 7px;
  display: block;
  width: 100%;
  color: black; */
`;

const MainContent = styled.main`
  border: 2px solid #aaa3a3;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const Home = () => {
  return (
    <AppWrapper className="App">
      <Header />
      <MainWrapper>
        <SideBar>
          Sidebar
          <Menu>
            <ALink>Link 1</ALink>
            <ALink>Link 2</ALink>
            <ALink>Link 3</ALink>
            <ALink>Link 4</ALink>
          </Menu>
        </SideBar>
        <MainContent>
          <ProjectsView />
        </MainContent>
      </MainWrapper>
      <footer>This is the footer</footer>
    </AppWrapper>
  );
};

export default Home;
