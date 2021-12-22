import styled from '@emotion/styled';

// import styled from 'styled-components';

const Wrapper = styled.div`
  width: 32%;
  border: 2px solid #333;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const AppWrapper=styled.div`
  background-color: #282c34;
  text-align: center;
  `;



const Home=()=>{
    return(
            <AppWrapper className="App">
            <h1>Home</h1>
            <header className="App-header">
                Learn React
            </header>
           </AppWrapper>
    )
}

export default Home;