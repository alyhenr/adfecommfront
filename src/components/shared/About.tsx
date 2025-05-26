
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
            About
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-5">
            <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-lg mb-4">
                    Welcome to our e-commerce store! We are dedicated to provinding the best products and service to our costumers. Our mission is to offer a seamless shopping experience while ensuring the highest quality of our offerings.
                </p>
            </div>
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <img 
                    src="https://userway.org/pt/wp-content/uploads/2023/12/Alt-text-em-imagens-e-a-inclusão-digital-1-1-1024x576.jpg" 
                    alt="About us" 
                    className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-101"
                />
            </div>
        </div>
    </div>
  )
}

export default About