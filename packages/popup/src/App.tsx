import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import { RecoilRoot } from "recoil";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

export default function App() {
  return (
    <Provider theme={defaultTheme}>
      <RecoilRoot>
        <Layout sidebar={<Sidebar />}>
          <Main></Main>
        </Layout>
      </RecoilRoot>
    </Provider>
  );
}
