import { useEffect, useState } from "react";
import type { Category } from "../types";
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
  const categories: Category[] = [
    { categoryId: 1, categoryName: "Food" },
    { categoryId: 2, categoryName: "Cars" },
  ];

  const categoryMap: Record<number, string> = { [-1]: "" };
  categories.forEach((category) => {
    categoryMap[category.categoryId] = category.categoryName;
  });

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const path: string = useLocation().pathname;

  const [category, setCategory] = useState<Category>({
    categoryId: -1,
    categoryName: "",
  });
  const [asc, setAsc] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const currCategory: string = searchParams.get("category") || "";
    const currSortOrder = searchParams.get("sortBy") || "asc";
    const currKeyword = searchParams.get("keyword") || "";

    setCategory(() => {
      return {
        categoryId:
          categories.find((c) => c.categoryName == currCategory)?.categoryId ||
          -1,
        categoryName: currCategory,
      };
    });
    setAsc(currSortOrder == "asc");
    setKeyword(currKeyword);
  }, [searchParams]);

  useEffect(() => {
    const hander = setTimeout(() => {
      if (keyword) {
        console.log(keyword);
        params.set("keyword", keyword);
      } else {
        params.delete("keyword");
      }
      navigate(`${path}?${params}`);
    }, 1000);
    return () => {
      clearTimeout(hander);
    };
  }, [searchParams, keyword, navigate, path]);

  const handleCategory = (categoryId: number) => {
    if (categoryId == -1) params.delete("category");
    else
      params.set("category", categoryMap[categoryId] || category.categoryName);

    setCategory((prev) => {
      if (categoryMap[categoryId]) {
        return {
          categoryId,
          categoryName: categoryMap[categoryId],
        };
      } else return prev;
    });
  };

  const handleSorting = (isAsc: boolean) => {
    setAsc(isAsc);
    params.set("sortBy", isAsc ? "asc" : "desc");
    navigate(`${path}?${params}`);
  };

  const clearFilters = () => {
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex lg:flex-row flex-col lg:justify-center justify-between items-center gap-4">
      {/* Keyword filter */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          placeholder="Buscar produto"
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-[#1976d2]"
          value={keyword}
          onChange={(ev) => setKeyword(ev.target.value)}
        />
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>
      {/* Category Filter */}
      <div className="flex gap-2 w-full justify-center items-center">
        <div className="flex gap-4 items-center justify-center lg:w-fit w-full">
            <FormControl
            className="text-slate-800 border-slate-700 w-full max-w-[300px]"
            variant="outlined"
            size="small"
            >
            <InputLabel id="category-select-label">Categorias</InputLabel>
            <Select
                labelId="category-select-label"
                value={category.categoryId}
                onChange={(ev) => handleCategory(ev.target.value)}
                label="Category"
                className="min-w-[120px] text-slate-800 border-slate-700 hover:cursor-pointer"
            >
                <MenuItem value={-1}>Todas</MenuItem>
                {categories.map((c) => (
                <MenuItem value={c.categoryId} key={c.categoryId}>
                    {c.categoryName}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
        </div>
        {/* Sort order */}
        <Tooltip title="Ordernar por" onClick={() => handleSorting(!asc)}>
            <Button
            variant="contained"
            color="primary"
            className="flex items-center gap-2 h-10 md:w-70 lg:w-fit"
            >
            {asc ? <FiArrowUp size={20} /> : <FiArrowDown size={20} />}
            <span className="hidden md:flex">
                {asc ? "Crescente" : "Decrescente"}{" "}
            </span>
            </Button>
        </Tooltip>
        <button className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none hover:cursor-pointer min-w-fit">
            <FiRefreshCcw className="font-semibold" size={25} />
            <span className="font-semibold hidden md:flex" onClick={() => clearFilters()}>
            Limpar filtro
            </span>
        </button>

      </div>
    </div>
  );
};

export default Filter;
