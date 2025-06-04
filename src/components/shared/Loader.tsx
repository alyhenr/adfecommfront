import { useSelector } from "react-redux"
import type { RootState } from "../../store/reducers/store"
import { useTranslation } from 'react-i18next'

export enum LoaderType {
    DEFAULT, SKELETON, 
}

const SkeletonLoader = () => {
    return (
        <div className="w-full space-y-4 animate-pulse">
            <div className="flex gap-6">
                <div className="w-1/3">
                    <div className="aspect-square bg-gray-100"></div>
                    <div className="h-4 bg-gray-100 mt-4 w-3/4"></div>
                    <div className="h-4 bg-gray-100 mt-2 w-1/2"></div>
                </div>
                <div className="w-1/3">
                    <div className="aspect-square bg-gray-100"></div>
                    <div className="h-4 bg-gray-100 mt-4 w-3/4"></div>
                    <div className="h-4 bg-gray-100 mt-2 w-1/2"></div>
                </div>
                <div className="w-1/3">
                    <div className="aspect-square bg-gray-100"></div>
                    <div className="h-4 bg-gray-100 mt-4 w-3/4"></div>
                    <div className="h-4 bg-gray-100 mt-2 w-1/2"></div>
                </div>
            </div>
        </div>
    )
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
        <div className="relative">
            <div className="h-12 w-12">
                <div className="absolute h-12 w-12 rounded-full border-4 border-solid border-gray-200"></div>
                <div className="absolute h-12 w-12 rounded-full border-4 border-solid border-red-500 border-t-transparent animate-spin"></div>
            </div>
        </div>
    </div>
)

const Loader = ({ text = "", variant = LoaderType.DEFAULT} : { text?: string, variant?: LoaderType }) => {
    const { isLoading } = useSelector((state: RootState) => state.errorsState)
    const { t } = useTranslation()

    if (!isLoading) return null;

    switch (variant) {
        case LoaderType.SKELETON:
            return <SkeletonLoader />;
        default:
            return (
                <div className="flex flex-col items-center justify-center space-y-4 p-8">
                    <LoadingSpinner />
                    {text && (
                        <p className="text-sm text-gray-500 animate-pulse">
                            {text || t('common.loading')}
                        </p>
                    )}
                </div>
            )
    }
}

export default Loader