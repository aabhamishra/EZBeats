import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import SamplerLayout from "./SamplerLayout";
import SamplerEditor from "../sampler/SamplerEditor";
import SamplerHome from "../guiding/SamplerHome";
import SamplerLogin from "../auth/SamplerLogin";
import SamplerRegister from "../auth/SamplerRegister";
import SamplerLogout from "../auth/SamplerLogout";

function SamplerApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SamplerLayout />}>
                    <Route index element={<SamplerHome />} />
                    <Route path="/login" element={<SamplerLogin />} />
                    <Route path="/register" element={<SamplerRegister />} />
                    <Route path="/logout" element={<SamplerLogout />} />
                    <Route path="/editor" element={<SamplerEditor />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default SamplerApp;