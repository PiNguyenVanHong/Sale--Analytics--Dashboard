"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./column";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();

  const onCopy = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="group" onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 -4 group-hover:text-emerald-600 tranisiton duration-300" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group"
            onClick={() => navigate(`/dashboard/articles/${data.id}`)}
          >
            <Edit className="mr-2 h-4 -4 group-hover:text-yellow-600 tranisiton duration-300" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className="group" onClick={() => {}}>
            <Trash className="mr-2 h-4 -4 group-hover:text-destructive tranisiton duration-300" />
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
