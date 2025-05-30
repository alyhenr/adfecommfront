const SubmitBtn = ({ loading = false, text = "Entrar", classes = ""} ) => {
  return (
    <button
        disabled={loading}
        className={`
            w-full px-4 py-3 mt-6
            text-white font-medium
            bg-red-600 hover:bg-red-700
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            rounded-sm
            ${classes}
        `}
        type="submit"
    >
        {loading ? (
            <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Carregando...</span>
            </div>
        ) : (
            text
        )}
    </button>
  )
}

export default SubmitBtn