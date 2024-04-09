import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { Edit, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register,CompanyList } from "./pages";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import EditPage from "./pages/company/edit";
import List from "./pages/tasks/list";
import TasksCreatePage from "./pages/tasks/create";
import TasksEditPage from "./pages/tasks/edit";

// const API_URL = "https://api.nestjs-query.refine.dev/graphql";
// const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

// const gqlClient = new GraphQLClient(API_URL);
// const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "IbGGPv-BMD5JD-x9qHwR",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/forgot-password" element={<ForgotPassword />}/>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/login" />} 
                      >
                        <Layout>
                        <Outlet />
                        </Layout>
                      </Authenticated>
                    }>
                    <Route index element={<Home />}/>
                    <Route path="/companies">
                      <Route index element={<CompanyList />}/>
                      <Route path="new" element={<Create />}/>
                      <Route path="edit/:id" element={<EditPage />}/>
                    </Route>
                    <Route path="/tasks" element={
                      <List>
                        <Outlet  />
                      </List>} >
                        <Route path="new" element={<TasksCreatePage />} />
                        <Route path="edit/:id" element={<TasksEditPage />} />
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;