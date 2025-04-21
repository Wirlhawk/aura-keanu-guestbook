import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return <div className="p-10 font-geist">{children}</div>;
};

export default AdminLayout;
