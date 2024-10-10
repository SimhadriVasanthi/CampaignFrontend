import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/authentication";
import Counsellor from "./pages/counsellor";
import Header from "./components/layout/header";
import { checkUser, getComponent } from "./assets/library";
import CustomModal from "./components/layout/customModal";
import { useAppSelector } from "./assets/hooks";
import "./App.css";
import "./assets/fonts/fonts.css";
import NotFound from "./components/layout/notFound";
import ProtectedRoute from "./protectedRoute";
import { FilterSelected } from "./types/types";
import Context from "./assets/constants/context";

function App() {
  const [appliedFilter, setAppliedFilter] = useState<FilterSelected[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<FilterSelected[]>([]);


  const isRequested = useRef(false);
  useEffect(() => {
    if (!isRequested.current) {
      checkUser();
      isRequested.current = true;
    }
  }, []);
  const popup = useAppSelector((state:any) => state.popup);
  const Popupcomponent: React.FC<{ data: any }> | null =
  popup.data.show && popup.data.data?.container?.name
    ? getComponent(popup?.data?.data?.container?.name)
    : null;


  return (
    <div>
       <Context.Provider
        value={{
          selectedUniversities,
          setSelectedUniversities,
        }}
      >
      <BrowserRouter>
        <Header appliedFilter={appliedFilter} setAppliedFilter={setAppliedFilter}/>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute link={"/"} />}>
          <Route path="/" element={<Counsellor />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route path="*" element={<NotFound/>} />
            </Route>
          

        </Routes>
        <CustomModal
            open={popup.data.show}
            additionalData={{
              width: popup.data.data?.container?.dimensions?.width,
            }}
          >
            {Popupcomponent ? (
              <Popupcomponent data={popup.data.data?.container?.data} />
            ) : null}
          </CustomModal>
      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
