import { MagnifyingGlass } from "react-loader-spinner"

const Loader = ({ text } : { text: string }) => {
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