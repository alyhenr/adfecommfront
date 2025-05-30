import { useState } from "react"
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaWeixin, FaWhatsapp } from "react-icons/fa"
import { formatPhoneNumber } from "../../utils/common"

const StyledLabel = ({ text, htmlFor } : { text: string, htmlFor: string }) => {
  return <label className="block text-sm font-medium text-gray-700" htmlFor={htmlFor}>{text}:</label>
}

const ContactInfoCard = ({ icon: Icon, title, content }: {
  icon: React.ElementType;
  title: string;
  content: string;
}) => (
  <div className="flex items-center p-4 bg-white border border-gray-100 rounded-sm hover:border-red-100 transition-all">
    <div className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-sm mr-4">
      <Icon className="w-5 h-5 text-red-600" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  </div>
)

const Contact = () => {
  const inputStyle: string = "mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

  const [formattedNumber, setFormattedNumber] = useState<string>()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-red-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">Entre em Contato</h1>
            <p className="text-lg text-red-50">
              Estamos aqui para ajudar. Entre em contato conosco por qualquer um dos canais abaixo.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:mt-5">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            <ContactInfoCard
              icon={FaPhone}
              title="Telefone"
              content={formatPhoneNumber("41999999999")}
            />
            <ContactInfoCard
              icon={FaEnvelope}
              title="Email"
              content="contato@youde.com"
            />
            <ContactInfoCard
              icon={FaMapMarkedAlt}
              title="Endereço"
              content="123 Street X, City, PR"
            />
            <ContactInfoCard
              icon={FaWhatsapp}
              title="WhatsApp"
              content={formatPhoneNumber("41999999999")}
            />
            <ContactInfoCard
              icon={FaWeixin}
              title="WeChat"
              content="youde_oficial"
            />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm border border-gray-100 rounded-sm p-8">
              <form className="space-y-6">
                <div>
                  <StyledLabel text="Nome" htmlFor="name" />
                  <input
                    type="text"
                    id="name"
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <StyledLabel text="Email" htmlFor="email" />
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <StyledLabel text="Celular (DD)XXXXX-XXXX" htmlFor="phone" />
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formattedNumber}
                    onChange={(ev) => setFormattedNumber(formatPhoneNumber(ev.target.value))}
                    className="mt-1 block w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <StyledLabel text="Mensagem" htmlFor="message" />
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.2714537676024!2d-49.2720844!3d-25.4289541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce4fd6cf38791%3A0x315338e345d5f115!2sCuritiba%2C%20PR!5e0!3m2!1sen!2sbr!4v1629308000000!5m2!1sen!2sbr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-sm"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact