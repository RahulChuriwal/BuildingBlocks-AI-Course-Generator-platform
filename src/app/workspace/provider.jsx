import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import React from 'react'
import AppHeader from "./_components/AppHeader"

function WorkspaceProvider({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger/>
            <div className="w-full">
                <AppHeader />
                <div className="p-10">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}

export default WorkspaceProvider
