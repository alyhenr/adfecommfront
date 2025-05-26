import { useState } from "react"
import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa"
import { formatPhoneNumber } from "../../utils/common"


const StyledLabel = ({ text, htmlFor } : { text: string, htmlFor: string }) => {
 return <label className="block text-sm font-medium text-gray-700"
 htmlFor={htmlFor}>{text}:</label>
}

const Contact = () => {
  const inputStyle: string = "mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

  const [formattedNumber, setFormattedNumber] = useState<string>()

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-12 bg-cover"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/237718/pexels-photo-237718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6">
          Contato
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Preencha o formulario abaixo ou entre em contato via telefone/celular
        </p>

        <form className="space-y-4">
          <div>
            <StyledLabel htmlFor="" text="Nome"/>
            <input className={inputStyle} type="text" required/>
          </div>

          <div>
            <StyledLabel htmlFor="" text="Menssagem"/>
            <textarea 
              rows={4} 
              required 
              name="" 
              id=""
              className={inputStyle}
            ></textarea>
          </div>

          <div>
            <StyledLabel htmlFor="" text="Seu Email"/>
            <input className={inputStyle} type="email" required/>
          </div>

          <div>
            <StyledLabel htmlFor="" text="Seu Celular (DD)XXXXX-XXXX"/>
            <input className={inputStyle} type="tel" required value={formattedNumber} onChange={(ev) => setFormattedNumber(formatPhoneNumber(ev.target.value))}/>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 hover:cursor-pointer">
            Enviar
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="tetx-lg font-semibold">
            Informação para contato
          </h2>
          <div className="flex flex-col items-center space-y-2 mt-4">
            <div className="flex items-center">
              <FaPhone className="text-blue-500 mr-2"/>
              <span className="text-gray-600">
                {formatPhoneNumber("41999999999")}
              </span>
            </div>

            <div className="flex items-center">
              <FaEnvelope className="text-blue-500 mr-2"/>
              <span className="text-gray-600">
                email@email.com
              </span>
            </div>

            <div className="flex items-center">
              <FaMapMarkedAlt className="text-blue-500 mr-2"/>
              <span className="text-gray-600">
                123 Street X, City, PR
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact