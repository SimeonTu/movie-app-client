import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./index.scss";
import MainView from "./components/main-view/main-view";

// Main component (will eventually use all the others)
const IMFdApp = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  )
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<IMFdApp />);