import type { Address } from '../../types'

const AddressInfoCard = ({ address } : { address: Address }) => {
    return <div>
        <p className="text-sm">
            <span className="font-semibold">Cidade:</span>{" "}{address.city}
        </p>
        <p className="text-sm">
            <span className="font-semibold">Estado:</span>{" "}{address.state}
        </p>
        <p className="text-sm">
            <span className="font-semibold">CEP:</span>{" "}{address.zipCode}
        </p>
        <p className="text-sm">
            <span className="font-semibold">Número:</span>{" "} {address.number}
        </p>
        <p className="text-sm">
            <span className="font-semibold">Referência</span>{" "}{address.reference}
        </p>
        <p className="text-sm">
            <span className="font-semibold">Nome do prédio:</span>{" "}{address.buildingName}
        </p>
        <p className="text-sm">
            <span className="font-semibold">Nome da rua:</span>{" "}{address.streetName}
        </p>
    </div>
}

export default AddressInfoCard