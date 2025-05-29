import { MagnifyingGlass } from "react-loader-spinner"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/reducers/store"
import { Skeleton } from "@mui/material"

export enum LoaderType {
    DEFAULT, SKELETON, 
}

const SkeletonLoader = () => {
    return <div className="flex flex-col w-full gap-2 items-center">
        {/* For variant="text", adjust the height via font-size */}
        {/* <Skeleton variant="text" sx={{ fontSize: '10rem' }} /> */}

        {/* For other variants, adjust the size with `width` and `height` */}
        <div className="flex justify-center gap-3 w-[90%]">
            <Skeleton animation="wave" variant="rounded" width="30%" height={260} />
            <Skeleton animation="wave" variant="rounded" width="70%" height={260} />
        </div>
        <Skeleton animation="wave" variant="rounded" width="90%" height={200} />
    </div>
}

const Loader = ({ text = "", variant = LoaderType.DEFAULT} : { text?: string, variant?: LoaderType }) => {
    const { isLoading } = useSelector((state: RootState) => state.errorsState)

    if (!isLoading) return <></>

    switch (variant) {
        case LoaderType.SKELETON:
            return <SkeletonLoader />;
    
    }

    return (
    <div className="flex justify-center items-center w-full h-[450px]">
        <div className="flex flex-col items-center gap-1">
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
            <p className="text-slate-800 font-bold">{text || "Carregando..."}</p>
        </div>
    </div>
    )
}

export default Loader