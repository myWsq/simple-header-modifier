import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import { RecoilRoot } from "recoil";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { SWRConfig } from "swr";
import { request } from "./utils/request";

export default function App() {
  return (
    <Provider theme={defaultTheme}>
      <RecoilRoot>
        <SWRConfig value={{ fetcher: (key) => request(key) }}>
          <Layout sidebar={<Sidebar />}>
            <Main></Main>
          </Layout>
        </SWRConfig>
      </RecoilRoot>
    </Provider>
  );
}
