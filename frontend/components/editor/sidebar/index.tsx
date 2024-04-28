"use client"

import { FilePlus, FolderPlus, Loader2, Search } from "lucide-react"
import SidebarFile from "./file"
import SidebarFolder from "./folder"
import { TFile, TFolder, TTab } from "./types"
import { useState } from "react"
import New from "./new"

export default function Sidebar({
  files,
  selectFile,
  handleRename,
}: {
  files: (TFile | TFolder)[]
  selectFile: (tab: TTab) => void
  handleRename: (
    id: string,
    newName: string,
    oldName: string,
    type: "file" | "folder"
  ) => boolean
}) {
  const [creatingNew, setCreatingNew] = useState<"file" | "folder" | null>(null)

  return (
    <div className="h-full w-56 select-none flex flex-col text-sm items-start p-2">
      <div className="flex w-full items-center justify-between h-8 mb-1 ">
        <div className="text-muted-foreground">Explorer</div>
        <div className="flex space-x-1">
          <button
            onClick={() => setCreatingNew("file")}
            className="h-6 w-6 text-muted-foreground ml-0.5 flex items-center justify-center translate-x-1 bg-transparent hover:bg-muted-foreground/25 cursor-pointer rounded-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <FilePlus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCreatingNew("folder")}
            className="h-6 w-6 text-muted-foreground ml-0.5 flex items-center justify-center translate-x-1 bg-transparent hover:bg-muted-foreground/25 cursor-pointer rounded-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
          {/* Todo: Implement file searching */}
          {/* <button className="h-6 w-6 text-muted-foreground ml-0.5 flex items-center justify-center translate-x-1 bg-transparent hover:bg-muted-foreground/25 cursor-pointer rounded-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <Search className="w-4 h-4" />
          </button> */}
        </div>
      </div>
      <div className="w-full mt-1 flex flex-col">
        {files.length === 0 ? (
          <div className="w-full flex justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <>
            {files.map((child) =>
              child.type === "file" ? (
                <SidebarFile
                  key={child.id}
                  data={child}
                  selectFile={selectFile}
                  handleRename={handleRename}
                />
              ) : (
                <SidebarFolder
                  key={child.id}
                  data={child}
                  selectFile={selectFile}
                  handleRename={handleRename}
                />
              )
            )}
            {creatingNew !== null ? (
              <New
                type={creatingNew}
                stopEditing={() => setCreatingNew(null)}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
